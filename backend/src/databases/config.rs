use std::env;

pub struct PgConfig {
    pub pgdatabase: String,
    pub pgport: u16,
    pub pgusername: String,
    pub pgpassword: String,
    pub pghost: String,
}

pub struct ChromaConfig {
    pub chromahost: String,
    pub chromaport: u16,
}

pub fn load_pg_env() -> Result<PgConfig, std::env::VarError> {
    let pgdatabase = env::var("POSTGRES_DB")?;
    let pgusername = env::var("POSTGRES_USER")?;
    let pgpassword = env::var("POSTGRES_PASSWORD")?;
    let pghost = env::var("POSTGRES_HOST")?;
    let pgport_str = env::var("POSTGRES_PORT")?;
    let pgport: u16 = pgport_str.parse().expect("POSTGRES_PORT must be a valid number");

    Ok(PgConfig {
        pgdatabase,
        pgport,
        pgusername,
        pgpassword,
        pghost,
    })
}

pub fn load_chroma_env() -> Result<ChromaConfig, std::env::VarError> {
    let chromahost = env::var("CHROMA_HOST")?;
    let chromaport_str = env::var("CHROMA_PORT")?;
    let chromaport: u16 = chromaport_str.parse().expect("CHROMA_PORT must be a valid number");

    Ok(ChromaConfig {
        chromahost,
        chromaport,
    })
}
