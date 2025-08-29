use axum::{http::StatusCode, response::IntoResponse};

pub async fn register_subscription() -> impl IntoResponse {
    StatusCode::OK
}

pub async fn link_subscription_to_cancellation_method() -> impl IntoResponse {
    StatusCode::OK
}

pub async fn delete_subscription() -> impl IntoResponse {
    StatusCode::OK
}
