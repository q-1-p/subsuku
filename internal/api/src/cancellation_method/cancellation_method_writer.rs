use axum::{http::StatusCode, response::IntoResponse};

pub async fn register_cancellation_method() -> impl IntoResponse {
    StatusCode::NOT_FOUND
}

pub async fn update_cancellation_method() -> impl IntoResponse {
    StatusCode::NOT_FOUND
}

pub async fn add_bookmark() -> impl IntoResponse {
    StatusCode::NOT_FOUND
}

pub async fn add_good() -> impl IntoResponse {
    StatusCode::NOT_FOUND
}

pub async fn delete_cancellation_method() -> impl IntoResponse {
    StatusCode::NOT_FOUND
}

pub async fn delete_bookmark() -> impl IntoResponse {
    StatusCode::NOT_FOUND
}

pub async fn delete_good() -> impl IntoResponse {
    StatusCode::NOT_FOUND
}
