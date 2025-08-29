use axum::{Json, extract::Path, http::StatusCode, response::IntoResponse};

pub async fn get_notification(id: Path<String>) -> impl IntoResponse {
    (StatusCode::OK, Json(""))
}
