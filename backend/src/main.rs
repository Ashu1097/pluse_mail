mod databases;
use tokio;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    dotenvy::dotenv().ok();
    let config = databases::config::load_pg_env().expect("failed to load env");
    let connection = databases::postgress::get_postgres_session(&config).await?;
    println!("{:?}", connection);
    let chromaconfig = databases::config::load_chroma_env().expect("failed to load chroma env");
    let chromaconnection = databases::chroma::get_chroma_client(&chromaconfig).await?;
    print!("{:?}", chromaconnection);
    Ok(())
}
