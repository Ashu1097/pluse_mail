use crate::databases::config::PgConfig;
use sqlx::postgres::{PgPool, PgPoolOptions};

pub async fn get_postgres_session(config: &PgConfig) -> Result<PgPool, sqlx::Error> {
    let url = format!(
        "postgres://{}:{}@{}:{}/{}",
        config.pgusername,
        config.pgpassword,
        config.pghost,
        config.pgport,
        config.pgdatabase
    );

    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(&url)
        .await?;

    Ok(pool)
}
