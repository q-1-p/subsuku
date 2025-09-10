use crate::notification::notification_query_object::NotificationQueryObject;

#[allow(async_fn_in_trait)]
pub trait NotificationQueryRepository {
    async fn get_notifications() -> Result<Vec<NotificationQueryObject>, ()>;
}
