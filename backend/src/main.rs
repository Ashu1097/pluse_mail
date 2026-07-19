mod databases;
use tokio;

#[tokio::main]
async fn main() -> Result<(), sqlx::Error> {
    dotenvy::dotenv().ok();

    let config = databases::config::load_env().expect("failed to load env");
    let connection = databases::postgress::get_postgres_session(&config).await?;
    println!("{:?}", connection);
    Ok(())
}
