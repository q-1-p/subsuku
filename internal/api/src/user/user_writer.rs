use axum::{http::StatusCode, response::IntoResponse};

pub async fn register_user() -> impl IntoResponse {
    StatusCode::NOT_FOUND
}

pub async fn update_user() -> impl IntoResponse {
    StatusCode::NOT_FOUND
}

pub async fn delete_user() -> impl IntoResponse {
    StatusCode::NOT_FOUND
}
