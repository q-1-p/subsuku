use axum::{
    Router,
    routing::{get, patch, post},
    serve,
};
use tokio::net::TcpListener;

mod cancellation_method;
mod common;
mod notification;
mod subscription;
mod user;

use crate::{
    cancellation_method::{cancellation_method_reader::{get_cancellation_method, get_cancellation_methods}, cancellation_method_writer::{add_bookmark, add_good, delete_bookmark, delete_cancellation_method, delete_good, register_cancellation_method, update_cancellation_method}}, notification::notification_reader::get_notification, subscription::{
        subscription_reader::{
            count_registered_subscriptions, get_monthly_fee, get_subscription, get_subscriptions,
            get_yearly_fee,
        },
        subscription_writer::{
            delete_subscription, link_subscription_to_cancellation_method, register_subscription,
        },
    }, user::user_writer::{delete_user, register_user, update_user}
};

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route(
            "/cancellation-method/{id}",
            get(get_cancellation_method)
                .post(register_cancellation_method)
                .put(update_cancellation_method)
                .delete(delete_cancellation_method),
        )
        .route(
            "/cancellation-method/bookmark",
            post(add_bookmark).delete(delete_bookmark),
        )
        .route(
            "/cancellation-method/good",
            post(add_good).delete(delete_good),
        )
        .route("/cancellation-methods", get(get_cancellation_methods))
        .route("/notifications", get(get_notification))
        .route(
            "/subscription/{id}",
            get(get_subscription)
                .post(register_subscription)
                .put(register_subscription)
                .delete(delete_subscription),
        )
        .route(
            "/subscription/link",
            patch(link_subscription_to_cancellation_method),
        )
        .route("/subscriptions", get(get_subscriptions))
        .route("/subscriptions/count", get(count_registered_subscriptions))
        .route("/subscriptions/fee/monthly", get(get_monthly_fee))
        .route("/subscriptions/fee/yearly", get(get_yearly_fee))
        .route(
            "/user",
            post(register_user).patch(update_user).delete(delete_user),
        );

    let listener = TcpListener::bind("0.0.0.0:8000").await.unwrap();
    serve(listener, app).await.unwrap();
}
