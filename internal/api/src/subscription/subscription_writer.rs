use std::str::FromStr;

use axum::{Json, http::StatusCode, response::IntoResponse};
use chrono::NaiveDate;
use domain::subscription::subscription_command_repository::SubscriptionCommandRepository as SubscriptionCommandRepositoryTrait;
use domain::subscription::subscription_id::SubscriptionId;
use domain::{subscription::subscription::Subscription, user::user_clerk_id::UserClerkId};
use infrastructure::subscription::subscription_command_repository::SubscriptionCommandRepository;

use crate::{
    common::authorize::extract_authorization,
    subscription::subscription_registration_form_dto::SubscriptionRegistrationFormDTO,
};

pub async fn add_subscription(
    headers: axum::http::HeaderMap,
    Json(subscription_form_data): Json<SubscriptionRegistrationFormDTO>,
) -> impl IntoResponse {
    let authorization = match extract_authorization(&headers) {
        Some(authorization) => authorization,
        None => return StatusCode::UNAUTHORIZED,
    };
    let clerk_id = match UserClerkId::new(&authorization) {
        Ok(clerk_id) => clerk_id,
        Err(_) => return StatusCode::UNAUTHORIZED,
    };

    let subscription = match Subscription::new(
        uuid::Uuid::new_v4().to_string().as_str(),
        subscription_form_data.name.as_str(),
        subscription_form_data.amount,
        subscription_form_data.currency_id,
        match NaiveDate::from_str(subscription_form_data.next_update.as_str()) {
            Ok(date) => date,
            Err(e) => {
                println!("ParseError: {} | {}", e, subscription_form_data.next_update);
                return StatusCode::BAD_REQUEST;
            }
        },
        subscription_form_data.update_cycle_number,
        subscription_form_data.update_cycle_unit_id,
    ) {
        Ok(subscription) => subscription,
        Err(_) => return StatusCode::BAD_REQUEST,
    };

    match <SubscriptionCommandRepository as SubscriptionCommandRepositoryTrait>::add_subscription(
        &clerk_id,
        &subscription,
    )
    .await
    {
        Ok(_) => StatusCode::OK,
        Err(_) => StatusCode::BAD_REQUEST,
    }
}

pub async fn update_subscription(
    headers: axum::http::HeaderMap,
    Json(subscription_form_data): Json<SubscriptionRegistrationFormDTO>,
) -> impl IntoResponse {
    let authorization = match extract_authorization(&headers) {
        Some(authorization) => authorization,
        None => return StatusCode::UNAUTHORIZED,
    };
    let clerk_id = match UserClerkId::new(&authorization) {
        Ok(clerk_id) => clerk_id,
        Err(_) => return StatusCode::UNAUTHORIZED,
    };

    let subscription = match Subscription::new(
        match subscription_form_data.id.as_deref() {
            Some(id) => id,
            None => {
                println!("Subscription ID is required");
                return StatusCode::BAD_REQUEST;
            }
        },
        subscription_form_data.name.as_str(),
        subscription_form_data.amount,
        subscription_form_data.currency_id,
        match NaiveDate::from_str(subscription_form_data.next_update.as_str()) {
            Ok(date) => date,
            Err(e) => {
                println!("ParseError: {} | {}", e, subscription_form_data.next_update);
                return StatusCode::BAD_REQUEST;
            }
        },
        subscription_form_data.update_cycle_number,
        subscription_form_data.update_cycle_unit_id,
    ) {
        Ok(subscription) => subscription,
        Err(_) => return StatusCode::BAD_REQUEST,
    };

    match <SubscriptionCommandRepository as SubscriptionCommandRepositoryTrait>::update_subscription(
        &clerk_id,
        &subscription,
    )
    .await
    {
        Ok(_) => StatusCode::OK,
        Err(_) => StatusCode::BAD_REQUEST,
    }
}

pub async fn link_subscription_to_cancellation_method() -> impl IntoResponse {
    StatusCode::NOT_FOUND
}

pub async fn delete_subscription(headers: axum::http::HeaderMap, id: String) -> impl IntoResponse {
    let authorization = match extract_authorization(&headers) {
        Some(authorization) => authorization,
        None => return StatusCode::UNAUTHORIZED,
    };
    let clerk_id = match UserClerkId::new(&authorization) {
        Ok(clerk_id) => clerk_id,
        Err(_) => return StatusCode::UNAUTHORIZED,
    };

    let subscription_id = match SubscriptionId::new(&id) {
        Ok(subscription_id) => subscription_id,
        Err(_) => return StatusCode::BAD_REQUEST,
    };

    match <SubscriptionCommandRepository as SubscriptionCommandRepositoryTrait>::delete_subscription(
        &clerk_id,
        &subscription_id,
    )
    .await
    {
        Ok(_) => StatusCode::OK,
        Err(_) => StatusCode::BAD_REQUEST,
    }
}
