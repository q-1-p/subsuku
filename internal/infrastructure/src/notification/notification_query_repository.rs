use crate::{common::sqlx::get_pool, notification::notification_row::NotificationRow};

use domain::notification::{
    notification_query_object::NotificationQueryObject,
    notification_query_repository::NotificationQueryRepository as i,
};

pub struct NotificationQueryRepository {}

impl i for NotificationQueryRepository {
    async fn get_notifications() -> Result<Vec<NotificationQueryObject>, ()> {
        let pool = match get_pool().await {
            Ok(result) => result,
            Err(_) => return Err(()),
        };

        match sqlx::query_as::<_, NotificationRow>(
            "
            SELECT
                title,
                page_url,
                updated_at
            FROM
                notifications as l
            ORDER BY
                l.updated_at DESC
            ",
        )
        .fetch_all(pool)
        .await
        {
            Ok(rows) => Ok(rows.into_iter().map(|row| row.to_query_object()).collect()),
            Err(e) => {
                println!("Error: {}", e);
                Err(())
            }
        }
    }
}
