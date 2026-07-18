use std::env;

pub struct PgConfig {
    pub pgdatabase: String,
    pub pgport: u16,
    pub pgusername: String,
    pub pgpassword: String,
    pub pghost: String,
}

pub fn load_env() -> Result<PgConfig, std::env::VarError> {
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
