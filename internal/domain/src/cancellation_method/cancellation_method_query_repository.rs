use crate::{
    cancellation_method::{
        cancellation_method_dto::CancellationMethodDto,
        cancellation_method_id::CancellationMethodId,
    },
    user::user_clerk_id::UserClerkId,
};

pub trait CancellationMethodQueryRepository {
    fn get_cancellation_method(
        user_clerk_id: &UserClerkId,
        cancellation_method_id: &CancellationMethodId,
    ) -> Result<CancellationMethodDto, String>;
    fn search_cancellation_methods_by_name(
        search_query: &str,
    ) -> Result<Vec<CancellationMethodDto>, String>;
    fn search_cancellation_methods(
        user_clerk_id: &UserClerkId,
        search_query: &str,
        only_mine: bool,
        only_bookmarked: bool,
    ) -> Result<Vec<CancellationMethodDto>, String>;
}
