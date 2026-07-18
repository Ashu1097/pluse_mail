mod databases;

fn main() {
    dotenvy::dotenv().ok();

    let config = databases::config::load_env().expect("failed to load env");

    println!("{}", config.pghost);
    println!("{}", config.pgport);
    println!("{}", config.pgusername);
    println!("{}", config.pgpassword);
    println!("{}", config.pgdatabase);
}
