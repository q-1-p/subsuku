use crate::{
    cancellation_method::cancellation_method_id::CancellationMethodId,
    subscription::{subscription::Subscription, subscription_id::SubscriptionId},
    user::user_clerk_id::UserClerkId,
};

#[allow(async_fn_in_trait)]
pub trait SubscriptionCommandRepository {
    async fn add_subscription(
        user_clerk_id: &UserClerkId,
        subscription: &Subscription,
    ) -> Result<(), ()>;
    async fn update_subscription(
        user_clerk_id: &UserClerkId,
        subscription: &Subscription,
    ) -> Result<(), ()>;
}
