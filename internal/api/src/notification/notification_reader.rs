use axum::{Json, http::StatusCode, response::IntoResponse};
use domain::notification::notification_query_repository::NotificationQueryRepository as NotificationQueryRepositoryTrait;
use infrastructure::notification::notification_query_repository::NotificationQueryRepository;

use crate::notification::notification_dto::NotificationDto;

pub async fn get_notification() -> impl IntoResponse {
    let notifications: Vec<NotificationDto> =
        match NotificationQueryRepository::get_notifications().await {
            Ok(data) => data.into_iter().map(NotificationDto::new).collect(),
            Err(_) => return Err(StatusCode::BAD_REQUEST),
        };

    Ok((StatusCode::OK, Json(notifications)))
}
