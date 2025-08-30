use crate::{
    cancellation_method::cancellation_method_id::CancellationMethodId,
    subscription::{subscription::Subscription, subscription_id::SubscriptionId},
    user::user_clerk_id::UserClerkId,
};

pub trait SubscriptionCommandRepository {
    fn add_subscription(
        user_clerk_id: &UserClerkId,
        subscription: &Subscription,
    ) -> Result<(), String>;
    fn update_subscription(
        user_clerk_id: &UserClerkId,
        subscription: &Subscription,
    ) -> Result<(), String>;
    fn delete_subscription(
        user_clerk_id: &UserClerkId,
        subscription_id: &SubscriptionId,
    ) -> Result<(), String>;

    fn link_cancellation_method(
        user_clerk_id: &UserClerkId,
        subscription_id: &SubscriptionId,
        cancellation_method_id: &CancellationMethodId,
    ) -> Result<(), String>;
}
