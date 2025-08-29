use axum::{Json, extract::Path, http::StatusCode, response::IntoResponse};

pub async fn get_subscription(id: Path<String>) -> impl IntoResponse {
    (StatusCode::OK, Json(""))
}

pub async fn get_subscriptions() -> impl IntoResponse {
    (StatusCode::OK, Json(""))
}

pub async fn count_registered_subscriptions() -> impl IntoResponse {
    (StatusCode::OK, Json(""))
}

pub async fn get_monthly_fee() -> impl IntoResponse {
    (StatusCode::OK, Json(""))
}

pub async fn get_yearly_fee() -> impl IntoResponse {
    (StatusCode::OK, Json(""))
}
