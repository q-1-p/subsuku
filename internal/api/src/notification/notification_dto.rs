use chrono::NaiveDateTime;
use domain::notification::notification_query_object::NotificationQueryObject;
use serde::Serialize;

#[derive(Serialize)]
pub struct NotificationDto {
    pub title: String,
    pub page_url: Option<String>,
    pub updated_at: NaiveDateTime,
}

impl NotificationDto {
    pub fn new(query_object: NotificationQueryObject) -> Self {
        Self {
            title: query_object.title,
            page_url: query_object.page_url,
            updated_at: query_object.updated_at,
        }
    }
}
