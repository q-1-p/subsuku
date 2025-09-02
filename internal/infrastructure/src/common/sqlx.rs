use dotenv::dotenv;
use sqlx::{PgPool, postgres::PgPoolOptions};
use std::sync::OnceLock;

static POOL: OnceLock<PgPool> = OnceLock::new();

pub async fn get_pool() -> Result<&'static PgPool, sqlx::Error> {
    dotenv().ok();

    if let Some(pool) = POOL.get() {
        return Ok(pool);
    }

    let connection_string = dotenv::var("DATABASE_URL").unwrap();
    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(connection_string.as_str())
        .await;

    match pool {
        Ok(result) => Ok(POOL.get_or_init(|| result)),
        Err(e) => Err(e),
    }
}
