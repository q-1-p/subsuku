use crate::{mail_address::MailAddress, user::user_clerk_id::UserClerkId};

pub trait UserCommandRepository {
    fn delete_user(user_clerk_id: &UserClerkId) -> Result<(), String>;

    fn update_email(user_clerk_id: &UserClerkId, email: &MailAddress) -> Result<(), String>;
}
