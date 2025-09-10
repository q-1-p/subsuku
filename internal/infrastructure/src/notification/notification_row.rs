use chrono::NaiveDateTime;
use domain::notification::notification_query_object::NotificationQueryObject;
use sqlx::FromRow;

#[derive(FromRow)]
pub struct NotificationRow {
    pub title: String,
    pub page_url: Option<String>,
    pub updated_at: NaiveDateTime,
}

impl NotificationRow {
    pub fn to_query_object(&self) -> NotificationQueryObject {
        NotificationQueryObject {
            title: self.title.clone(),
            page_url: self.page_url.clone(),
            updated_at: self.updated_at.clone(),
        }
    }
}
