use crate::databases::config::ChromaConfig;
use chroma::{ChromaHttpClient, ChromaHttpClientOptions};
use anyhow;
use url;
pub async fn get_chroma_client(config: &ChromaConfig) -> Result<ChromaHttpClient, anyhow::Error> {
    let url = format!(
        "http://{}:{}",
        config.chromahost,
        config.chromaport
    );
    let endpoint: url::Url = url.parse()?;
    let options = ChromaHttpClientOptions {
        endpoint,
        ..Default::default()
    };
    let client = ChromaHttpClient::new(options);
    Ok(client)
}
