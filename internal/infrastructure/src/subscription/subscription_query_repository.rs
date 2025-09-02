use chrono::{Datelike, Local, Months, NaiveDate};
use domain::{
    subscription::{
        subscription_id::SubscriptionId, subscription_query_object::SubscriptionQueryObject,
        subscription_query_repository::SubscriptionQueryRepository as i,
    },
    update_cycle::update_cycle_id::UpdateCycleId,
    user::user_clerk_id::UserClerkId,
};

use crate::{
    common::{sqlx::get_pool, user::get_user_id},
    subscription::subscription_row::SubscriptionRow,
};

pub struct SubscriptionQueryRepository {}

impl i for SubscriptionQueryRepository {
    async fn get_subscription(
        user_clerk_id: &UserClerkId,
        subscription_id: &SubscriptionId,
    ) -> Result<SubscriptionQueryObject, ()> {
        let pool = match get_pool().await {
            Ok(result) => result,
            Err(e) => {
                println!("Error: {}", e);
                return Err(());
            }
        };
        let user_id = match get_user_id(user_clerk_id).await {
            Ok(r) => r,
            Err(e) => {
                println!("Error: {}", e);
                return Err(());
            }
        };

        match sqlx::query_as::<_, SubscriptionRow>(
            "
            SELECT
                l.id,
                l.name,
                (l.amount * r.exchange_rate)::float8 as fee,
                l.amount::float8 as amount,
                l.currency_id,
                l.next_update,
                l.update_cycle_number,
                l.update_cycle_unit as update_cycle_unit_id,
                l.linked_cancellation_method_id
            FROM
                subscriptions as l
            LEFT JOIN
                currencies as r
                ON l.currency_id = r.id
            WHERE
                l.user_id = $1
                AND l.id = $2
            ",
        )
        .bind(&user_id.value)
        .bind(&subscription_id.value)
        .fetch_one(pool)
        .await
        {
            Ok(row) => Ok(row.to_dto()),
            Err(e) => {
                println!("Error: {}", e);
                Err(())
            }
        }
    }
    async fn get_subscriptions(
        user_clerk_id: &UserClerkId,
    ) -> Result<Vec<SubscriptionQueryObject>, ()> {
        let pool = match get_pool().await {
            Ok(result) => result,
            Err(e) => {
                println!("Error: {}", e);
                return Err(());
            }
        };
        let user_id = match get_user_id(user_clerk_id).await {
            Ok(r) => r,
            Err(_) => {
                println!("User id is not found");
                return Err(());
            }
        };

        match sqlx::query_as::<_, SubscriptionRow>(
            "
            SELECT
                l.id,
                l.name,
                (l.amount * r.exchange_rate)::float8 as fee,
                l.amount::float8 as amount,
                l.currency_id,
                l.next_update,
                l.update_cycle_number,
                l.update_cycle_unit as update_cycle_unit_id,
                l.linked_cancellation_method_id
            FROM
                subscriptions as l
            LEFT JOIN
                currencies as r
                ON l.currency_id = r.id
            WHERE
                l.user_id = $1
            ORDER BY
                l.next_update ASC
            ",
        )
        .bind(&user_id.value)
        .fetch_all(pool)
        .await
        {
            Ok(rows) => Ok(rows.into_iter().map(|row| row.to_dto()).collect()),
            Err(e) => {
                println!("Error: {}", e);
                Err(())
            }
        }
    }

    async fn count_subscriptions(user_clerk_id: &UserClerkId) -> Result<u8, ()> {
        let pool = match get_pool().await {
            Ok(result) => result,
            Err(e) => {
                println!("Error: {}", e);
                return Err(());
            }
        };
        let user_id = match get_user_id(user_clerk_id).await {
            Ok(r) => r,
            Err(e) => {
                println!("Error: {}", e);
                return Err(());
            }
        };

        match sqlx::query_scalar::<_, i64>("SELECT COUNT(*) FROM subscriptions WHERE user_id = $1")
            .bind(&user_id.value)
            .fetch_one(pool)
            .await
        {
            Ok(count) => Ok(count as u8),
            Err(e) => {
                println!("Error: {}", e);
                Err(())
            }
        }
    }

    async fn get_monthly_fee(user_clerk_id: &UserClerkId) -> Result<f64, ()> {
        let pool = match get_pool().await {
            Ok(result) => result,
            Err(e) => {
                println!("Error: {}", e);
                return Err(());
            }
        };
        let user_id = match get_user_id(user_clerk_id).await {
            Ok(r) => r,
            Err(_) => {
                println!("User id is not found");
                return Err(());
            }
        };

        let today = Local::now().date_naive();
        let next_month = today.checked_add_months(Months::new(1)).unwrap();

        #[derive(sqlx::FromRow)]
        pub struct Row {
            next_update: NaiveDate,
            update_cycle_number: i16,
            update_cycle_unit: i16,
            fee: f64,
        }
        match sqlx::query_as::<_, Row>(
            "
            SELECT
                subscriptions.next_update,
                subscriptions.update_cycle_number,
                subscriptions.update_cycle_unit,
                SUM((subscriptions.amount::float8) * (currencies.exchange_rate::float8))::float8 as fee
            FROM
                subscriptions
            LEFT JOIN
                currencies
                ON subscriptions.currency_id = currencies.id
            WHERE
                user_id = $1
                AND subscriptions.next_update >= $2
                AND subscriptions.next_update < $3
            GROUP BY
                subscriptions.next_update,
                subscriptions.update_cycle_number,
                subscriptions.update_cycle_unit
            ",
        )
        .bind(&user_id.value)
        .bind(today)
        .bind(next_month_date)
        .fetch_all(pool)
        .await
        {
            Ok(rows) => {
                let monthly_fee = rows.iter().fold(0.0, |acc, x| {
                    let update_count: u8 = match x.update_cycle_unit as u8 {
                        UpdateCycleId::DAILY => (next_month_date.signed_duration_since(x.next_update).num_days() as f32 / x.update_cycle_number as f32).ceil() as u8,
                        UpdateCycleId::MONTHLY => 1,
                        UpdateCycleId::YEARLY => 1,
                        _ => 0,
                    };
                    acc + x.fee * update_count as f64
                });
                Ok(monthly_fee)
            }
            Err(e) => {
                println!("Error: {}", e);
                Err(())
            }
        }
    }
    async fn get_yearly_fee(user_clerk_id: &UserClerkId) -> Result<f64, String> {
        let pool = match get_pool().await {
            Ok(result) => result,
            Err(e) => return Err(e.to_string()),
        };
        let user_id = match get_user_id(user_clerk_id).await {
            Ok(r) => r,
            Err(_) => return Err("User id is not found".to_string()),
        };

        let today = Local::now().date_naive();
        let next_year = today.checked_add_months(Months::new(12)).unwrap();
        let duration_date = next_year.signed_duration_since(today).num_days();
        let duration_month = (next_year.month() + 12 - today.month()) % 12;

        #[derive(sqlx::FromRow)]
        pub struct Row {
            update_cycle_number: i16,
            update_cycle_unit: i16,
            fee: f64,
        }
        match sqlx::query_as::<_, Row>(
            "
            SELECT
                subscriptions.update_cycle_number,
                subscriptions.update_cycle_unit,
                SUM((subscriptions.amount::float8) * (currencies.exchange_rate::float8))::float8 as fee
            FROM
                subscriptions 
            LEFT JOIN
                currencies
                ON subscriptions.currency_id = currencies.id
            WHERE
                user_id = $1
                AND subscriptions.next_update >= $2
                AND subscriptions.next_update < $3
            GROUP BY
                subscriptions.update_cycle_number,
                subscriptions.update_cycle_unit
            ",
        )
        .bind(&user_id.value)
        .bind(today)
        .bind(next_year)
        .fetch_all(pool)
        .await
        {
            Ok(rows) => {
                let yearly_fee = rows.iter().fold(0.0, |acc, x| {
                    acc + x.fee
                        * match x.update_cycle_unit as u8 {
                            UpdateCycleId::DAILY => {
                                (duration_date / x.update_cycle_number as i64) as f64
                            }
                            UpdateCycleId::MONTHLY => {
                                (duration_month / x.update_cycle_number as u32) as f64
                            }
                            UpdateCycleId::YEARLY => 1.0,
                            _ => 0.0,
                        }
                });
                Ok(yearly_fee)
            }
            Err(e) => Err(e.to_string()),
        }
    }
}
