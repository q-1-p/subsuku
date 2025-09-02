use axum::{extract::Path, http::StatusCode, response::IntoResponse};

pub async fn get_cancellation_method(_id: Path<String>) -> impl IntoResponse {
    StatusCode::NOT_FOUND
}

pub async fn get_cancellation_methods() -> impl IntoResponse {
    StatusCode::NOT_FOUND
}
