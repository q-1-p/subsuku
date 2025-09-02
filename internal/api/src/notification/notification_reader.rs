use axum::{extract::Path, http::StatusCode, response::IntoResponse};

pub async fn get_notification(_id: Path<String>) -> impl IntoResponse {
    StatusCode::NOT_FOUND
}
