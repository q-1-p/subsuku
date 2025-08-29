use axum::{http::StatusCode, response::IntoResponse};

pub async fn register_user() -> impl IntoResponse {
    StatusCode::OK
}

pub async fn update_user() -> impl IntoResponse {
    StatusCode::OK
}

pub async fn delete_user() -> impl IntoResponse {
    StatusCode::OK
}
