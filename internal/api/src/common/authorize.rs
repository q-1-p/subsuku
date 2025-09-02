use axum::http::HeaderMap;

pub fn extract_authorization(headers: &HeaderMap) -> Option<String> {
    headers
        .get("Authorization")
        .and_then(|header_value| header_value.to_str().ok())
        .map(|s| s.to_string())
}
