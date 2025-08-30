use regex::Regex;

#[derive(Clone, Debug, PartialEq, Eq)]
pub struct MailAddress {
    pub value: String,
}

impl MailAddress {
    pub fn new(email: &str) -> Result<Self, String> {
        let email_regex = Regex::new(r"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$").unwrap();

        if !email_regex.is_match(email) {
            return Err("Invalid email address format".to_string());
        }

        Ok(Self {
            value: email.to_string(),
        })
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_valid_email_creation() {
        let email = "test@example.com";
        let mail_address = MailAddress::new(email).unwrap();
        assert_eq!(mail_address.value, email);
    }

    #[test]
    fn test_email_equality() {
        let email1 = "test@example.com";
        let email2 = "different@example.com";

        let addr1 = MailAddress::new(email1).unwrap();
        let addr2 = MailAddress::new(email1).unwrap();
        let addr3 = MailAddress::new(email2).unwrap();

        assert_eq!(addr1, addr2);
        assert_ne!(addr1, addr3);
    }

    #[test]
    fn test_invalid_email_formats() {
        let invalid_emails = vec![
            "invalid-email",
            "@example.com",
            "test@",
            "test@@example.com",
            "test.example.com",
            "",
            "test@.com",
            "test@com.",
        ];

        for email in invalid_emails {
            let result = MailAddress::new(email);
            assert!(result.is_err(), "Expected error for email: {}", email);
        }
    }

    #[test]
    fn test_email_too_long() {
        let long_local = "a".repeat(65);
        let email = format!("{}@example.com", long_local);
        let result = MailAddress::new(&email);
        assert!(result.is_err());
        assert!(result.unwrap_err().contains("Local part"));
    }

    #[test]
    fn test_email_total_length_too_long() {
        let long_domain = "a".repeat(200);
        let email = format!("test@{}.com", long_domain);
        let result = MailAddress::new(&email);
        assert!(result.is_err());
        assert!(result.unwrap_err().contains("too long"));
    }

    #[test]
    fn test_valid_email_variations() {
        let valid_emails = vec![
            "simple@example.com",
            "test.email@example.com",
            "test+tag@example.com",
            "test_underscore@example.com",
            "123@example.com",
            "test@sub.example.com",
            "test@example-domain.com",
        ];

        for email in valid_emails {
            let result = MailAddress::new(email);
            assert!(result.is_ok(), "Expected valid email: {}", email);
        }
    }
}
