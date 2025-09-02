use domain::user::{user_clerk_id::UserClerkId, user_id::UserId};
use sqlx::types::Uuid;

use crate::common::sqlx::get_pool;

pub async fn get_user_id(user_clerk_id: &UserClerkId) -> Result<UserId, String> {
    let pool = match get_pool().await {
        Ok(result) => result,
        Err(e) => return Err(e.to_string()),
    };

    match sqlx::query_scalar::<_, Uuid>("SELECT id FROM users WHERE clerk_id = $1")
        .bind(&user_clerk_id.value)
        .fetch_one(pool)
        .await
    {
        Ok(id) => match UserId::new(id.to_string().as_str()) {
            Ok(user_id) => Ok(user_id),
            Err(e) => return Err(e.to_string()),
        },
        Err(e) => return Err(e.to_string()),
    }
}
