use crate::{
    subscription::{subscription_dto::SubscriptionDTO, subscription_id::SubscriptionId},
    user::user_clerk_id::UserClerkId,
};

pub trait SubscriptionQueryRepository {
    fn get_subscription(id: &SubscriptionId) -> Result<SubscriptionDTO, String>;
    fn get_subscriptions(user_clerk_id: &UserClerkId) -> Result<Vec<SubscriptionDTO>, String>;

    fn count_subscriptions(user_clerk_id: &UserClerkId) -> Result<u8, String>;

    fn get_monthly_fee(user_clerk_id: &UserClerkId) -> Result<f64, String>;
    fn get_yearly_fee(user_clerk_id: &UserClerkId) -> Result<f64, String>;
}
