use dotenv::dotenv;
use sqlx::{PgPool, postgres::PgPoolOptions};
use std::sync::OnceLock;

static POOL: OnceLock<PgPool> = OnceLock::new();

pub async fn get_pool() -> Result<&'static PgPool, ()> {
    dotenv().ok();

    if let Some(pool) = POOL.get() {
        return Ok(pool);
    }

    let connection_string = match dotenv::var("DATABASE_URL") {
        Ok(result) => result,
        Err(e) => {
            println!("DATABASE_URL is not found: {}", e);
            return Err(());
        }
    };
    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(connection_string.as_str())
        .await;

    match pool {
        Ok(result) => Ok(POOL.get_or_init(|| result)),
        Err(e) => {
            println!("Pool is not found: {}", e);
            Err(())
        }
    }
}
