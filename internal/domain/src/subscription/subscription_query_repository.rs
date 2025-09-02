use crate::{
    subscription::{
        subscription_id::SubscriptionId, subscription_query_object::SubscriptionQueryObject,
    },
    user::user_clerk_id::UserClerkId,
};

#[allow(async_fn_in_trait)]
pub trait SubscriptionQueryRepository {
    async fn get_subscription(
        user_clerk_id: &UserClerkId,
        subscription_id: &SubscriptionId,
    ) -> Result<SubscriptionQueryObject, ()>;
    async fn get_subscriptions(
        user_clerk_id: &UserClerkId,
    ) -> Result<Vec<SubscriptionQueryObject>, ()>;

    async fn count_subscriptions(user_clerk_id: &UserClerkId) -> Result<u8, ()>;

    async fn get_monthly_fee(user_clerk_id: &UserClerkId) -> Result<f64, String>;
    async fn get_yearly_fee(user_clerk_id: &UserClerkId) -> Result<f64, String>;
}
