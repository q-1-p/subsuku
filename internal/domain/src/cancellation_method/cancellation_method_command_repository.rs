use crate::{
    cancellation_method::{
        cancellation_method::CancellationMethod, cancellation_method_id::CancellationMethodId,
    },
    user::user_clerk_id::UserClerkId,
};

pub trait CancellationMethodCommandRepository {
    fn add_cancellation_method(
        user_clerk_id: &UserClerkId,
        cancellation_method: &CancellationMethod,
    ) -> Result<(), String>;
    fn update_cancellation_method(
        user_clerk_id: &UserClerkId,
        cancellation_method: &CancellationMethod,
    ) -> Result<(), String>;
    fn delete_cancellation_method(
        user_clerk_id: &UserClerkId,
        cancellation_method_id: &str,
    ) -> Result<(), String>;

    fn add_bookmark(
        user_clerk_id: &UserClerkId,
        cancellation_method_id: &CancellationMethodId,
    ) -> Result<(), String>;
    fn delete_bookmark(
        user_clerk_id: &UserClerkId,
        cancellation_method_id: &CancellationMethodId,
    ) -> Result<(), String>;
    fn add_good(
        user_clerk_id: &UserClerkId,
        cancellation_method_id: &CancellationMethodId,
    ) -> Result<(), String>;
    fn delete_good(
        user_clerk_id: &UserClerkId,
        cancellation_method_id: &CancellationMethodId,
    ) -> Result<(), String>;
}
