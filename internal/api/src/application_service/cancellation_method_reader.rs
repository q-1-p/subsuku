use axum::{Json, extract::Path, http::StatusCode, response::IntoResponse};

pub async fn get_cancellation_method(id: Path<String>) -> impl IntoResponse {
    (StatusCode::OK, Json(""))
}

pub async fn get_cancellation_methods() -> impl IntoResponse {
    (StatusCode::OK, Json(""))
}
