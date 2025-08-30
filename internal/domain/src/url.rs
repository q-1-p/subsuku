use regex::Regex;

#[derive(Clone, Debug, PartialEq, Eq)]
pub struct Url {
    pub value: String,
}

impl Url {
    pub fn new(url: &str) -> Result<Self, String> {
        let url_regex = Regex::new(r"^https?://(?:[-\w.])+(?:[:\d]+)?(?:/(?:[\w/_.])*(?:\?(?:[\w&=%.])*)?(?:#(?:[\w.])*)?)?$").unwrap();

        if !url_regex.is_match(url) {
            return Err("Invalid url address format".to_string());
        }

        Ok(Self {
            value: url.to_string(),
        })
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_valid_http_url() {
        let url = Url::new("http://example.com");
        assert!(url.is_ok());
        assert_eq!(url.unwrap().value, "http://example.com");
    }

    #[test]
    fn test_valid_https_url() {
        let url = Url::new("https://example.com");
        assert!(url.is_ok());
        assert_eq!(url.unwrap().value, "https://example.com");
    }

    #[test]
    fn test_valid_url_with_port() {
        let url = Url::new("https://example.com:8080");
        assert!(url.is_ok());
    }

    #[test]
    fn test_valid_url_with_path() {
        let url = Url::new("https://example.com/path/to/resource");
        assert!(url.is_ok());
    }

    #[test]
    fn test_valid_url_with_query() {
        let url = Url::new("https://example.com/path?param=value&other=test");
        assert!(url.is_ok());
    }

    #[test]
    fn test_valid_url_with_fragment() {
        let url = Url::new("https://example.com/path#section");
        assert!(url.is_ok());
    }

    #[test]
    fn test_invalid_url_no_protocol() {
        let url = Url::new("example.com");
        assert!(url.is_err());
        assert_eq!(url.unwrap_err(), "Invalid url address format");
    }

    #[test]
    fn test_invalid_url_wrong_protocol() {
        let url = Url::new("ftp://example.com");
        assert!(url.is_err());
    }

    #[test]
    fn test_invalid_url_empty() {
        let url = Url::new("");
        assert!(url.is_err());
    }

    #[test]
    fn test_invalid_url_malformed() {
        let url = Url::new("https://");
        assert!(url.is_err());
    }
}
