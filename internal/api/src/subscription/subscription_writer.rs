use axum::{http::StatusCode, response::IntoResponse};

pub async fn register_subscription() -> impl IntoResponse {
    StatusCode::NOT_FOUND
}

pub async fn link_subscription_to_cancellation_method() -> impl IntoResponse {
    StatusCode::NOT_FOUND
}

pub async fn delete_subscription() -> impl IntoResponse {
    StatusCode::NOT_FOUND
}
