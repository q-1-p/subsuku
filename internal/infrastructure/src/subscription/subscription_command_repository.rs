use domain::{
    cancellation_method::cancellation_method_id::CancellationMethodId,
    subscription::{
        subscription::Subscription,
        subscription_command_repository::SubscriptionCommandRepository as i,
        subscription_id::SubscriptionId,
    },
    user::user_clerk_id::UserClerkId,
};

use crate::common::{sqlx::get_pool, user::get_user_id};

pub struct SubscriptionCommandRepository {}

impl i for SubscriptionCommandRepository {
    async fn add_subscription(
        user_clerk_id: &UserClerkId,
        subscription: &Subscription,
    ) -> Result<(), ()> {
        let pool = match get_pool().await {
            Ok(result) => result,
            Err(_) => return Err(()),
        };
        let user_id = match get_user_id(user_clerk_id).await {
            Ok(r) => r,
            Err(_) => return Err(()),
        };

        match sqlx::query("
            INSERT INTO
                subscriptions (id, name, user_id, amount, currency_id, next_update, update_cycle_number, update_cycle_unit)
            VALUES
                ($1, $2, $3, $4, $5::smallint, $6, $7::smallint, $8::smallint)
            "
            )
            .bind(&subscription.id.value)
            .bind(&subscription.name.value)
            .bind(&user_id.value)
            .bind(&subscription.amount)
            .bind(&subscription.currency.get_id().to_string())
            .bind(&subscription.next_update)
            .bind(&subscription.update_cycle.number.to_string())
            .bind(&subscription.update_cycle.unit.get_id().to_string())
            .execute(pool)
            .await {
                Ok(_) => Ok(()),
                Err(e) => {
                    println!("Error: {}", e);
                    Err(())
                },
            }
    }

    async fn update_subscription(
        user_clerk_id: &UserClerkId,
        subscription: &domain::subscription::subscription::Subscription,
    ) -> Result<(), ()> {
        let pool = match get_pool().await {
            Ok(result) => result,
            Err(_) => return Err(()),
        };
        let user_id = match get_user_id(user_clerk_id).await {
            Ok(r) => r,
            Err(_) => return Err(()),
        };

        match sqlx::query(
            "
            UPDATE
                subscriptions
            SET
                name = $1,
                amount = $2,
                currency_id = $3::smallint,
                next_update = $4,
                update_cycle_number = $5::smallint,
                update_cycle_unit = $6::smallint
            WHERE
                user_id = $7
                AND id = $8
            ",
        )
        .bind(&subscription.name.value)
        .bind(&subscription.amount)
        .bind(&subscription.currency.get_id().to_string())
        .bind(&subscription.next_update)
        .bind(&subscription.update_cycle.number.to_string())
        .bind(&subscription.update_cycle.unit.get_id().to_string())
        .bind(&user_id.value)
        .bind(&subscription.id.value)
        .execute(pool)
        .await
        {
            Ok(_) => Ok(()),
            Err(e) => {
                println!("Error: {}", e);
                Err(())
            }
        }
    }

    async fn delete_subscription(
        user_clerk_id: &UserClerkId,
        subscription_id: &SubscriptionId,
    ) -> Result<(), ()> {
        let pool = match get_pool().await {
            Ok(result) => result,
            Err(_) => return Err(()),
        };
        let user_id = match get_user_id(user_clerk_id).await {
            Ok(r) => r,
            Err(_) => return Err(()),
        };

        match sqlx::query("DELETE FROM subscriptions WHERE user_id = $1 AND id = $2")
            .bind(&user_id.value)
            .bind(&subscription_id.value)
            .execute(pool)
            .await
        {
            Ok(_) => Ok(()),
            Err(e) => {
                println!("Error: {}", e);
                Err(())
            }
        }
    }

    async fn link_cancellation_method(
        user_clerk_id: &UserClerkId,
        subscription_id: &SubscriptionId,
        cancellation_method_id: &CancellationMethodId,
    ) -> Result<(), ()> {
        let pool = match get_pool().await {
            Ok(result) => result,
            Err(()) => return Err(()),
        };
        let user_id = match get_user_id(user_clerk_id).await {
            Ok(r) => r,
            Err(_) => return Err(()),
        };

        match sqlx::query("UPDATE subscriptions SET linked_cancellation_method_id = $1 WHERE user_id = $2 AND id = $3")
            .bind(&cancellation_method_id.value)
            .bind(&user_id.value)
            .bind(&subscription_id.value)
            .execute(pool)
            .await {
                Ok(_) => Ok(()),
                Err(e) => {
                    println!("Error: {}", e);
                    Err(())
            }
        }
    }
}
