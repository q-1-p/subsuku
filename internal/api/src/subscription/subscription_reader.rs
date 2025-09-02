use axum::{
    Json,
    extract::Path,
    http::{HeaderMap, StatusCode},
    response::IntoResponse,
};
use domain::{
    subscription::{
        subscription_id::SubscriptionId,
        subscription_query_repository::SubscriptionQueryRepository as SubscriptionQueryRepositoryTrait,
    },
    user::user_clerk_id::UserClerkId,
};
use infrastructure::subscription::subscription_query_repository::SubscriptionQueryRepository;

use crate::{
    common::authorize::extract_authorization, subscription::subscription_dto::SubscriptionDTO,
};

pub async fn get_subscription(
    Path(id): Path<String>,
    headers: HeaderMap,
) -> Result<(StatusCode, Json<SubscriptionDTO>), StatusCode> {
    let authorization = match extract_authorization(&headers) {
        Some(authorization) => authorization,
        None => return Err(StatusCode::UNAUTHORIZED),
    };
    let clerk_id = match UserClerkId::new(&authorization) {
        Ok(clerk_id) => clerk_id,
        Err(_) => return Err(StatusCode::UNAUTHORIZED),
    };
    let subscription_id = match SubscriptionId::new(&id) {
        Ok(subscription_id) => subscription_id,
        Err(_) => return Err(StatusCode::BAD_REQUEST),
    };

    let subscription =
        match SubscriptionQueryRepository::get_subscription(&clerk_id, &subscription_id).await {
            Ok(subscription) => subscription,
            Err(_) => return Err(StatusCode::BAD_REQUEST),
        };

    Ok((StatusCode::OK, Json(SubscriptionDTO::new(subscription))))
}

pub async fn get_subscriptions(headers: HeaderMap) -> impl IntoResponse {
    let authorization = match extract_authorization(&headers) {
        Some(authorization) => authorization,
        None => return Err(StatusCode::UNAUTHORIZED),
    };
    let clerk_id = match UserClerkId::new(&authorization) {
        Ok(clerk_id) => clerk_id,
        Err(_) => return Err(StatusCode::UNAUTHORIZED),
    };

    let subscriptions: Vec<SubscriptionDTO> =
        match SubscriptionQueryRepository::get_subscriptions(&clerk_id).await {
            Ok(data) => data.into_iter().map(SubscriptionDTO::new).collect(),
            Err(_) => return Err(StatusCode::BAD_REQUEST),
        };

    Ok((StatusCode::OK, Json(subscriptions)))
}

pub async fn count_registered_subscriptions(headers: HeaderMap) -> impl IntoResponse {
    let authorization = match extract_authorization(&headers) {
        Some(authorization) => authorization,
        None => return Err(StatusCode::UNAUTHORIZED),
    };
    let clerk_id = match UserClerkId::new(&authorization) {
        Ok(clerk_id) => clerk_id,
        Err(_) => return Err(StatusCode::UNAUTHORIZED),
    };

    let count = match SubscriptionQueryRepository::count_subscriptions(&clerk_id).await {
        Ok(r) => r,
        Err(_) => return Err(StatusCode::BAD_REQUEST),
    };

    Ok((StatusCode::OK, Json(count)))
}

pub async fn get_monthly_fee() -> impl IntoResponse {
    StatusCode::NOT_FOUND
}

pub async fn get_yearly_fee() -> impl IntoResponse {
    StatusCode::NOT_FOUND
}
