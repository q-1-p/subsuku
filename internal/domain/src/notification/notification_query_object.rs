use chrono::NaiveDateTime;

pub struct NotificationQueryObject {
    pub title: String,
    pub page_url: Option<String>,
    pub updated_at: NaiveDateTime,
}
