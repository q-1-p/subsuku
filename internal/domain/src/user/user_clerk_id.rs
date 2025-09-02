#[derive(Clone, Debug, PartialEq, Eq)]
pub struct UserClerkId {
    pub value: String,
}

impl UserClerkId {
    pub fn new(id: &str) -> Result<Self, String> {
        if !regex::Regex::new(r"^user_.{27}$").unwrap().is_match(id) {
            return Err("ID must start with 'user_' and be exactly 32 characters long".to_string());
        }

        Ok(Self {
            value: id.to_string(),
        })
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_valid_user_clerk_id() {
        let valid_id = "user_abcdefghijklmnopqrstuvwxyz1";
        let result = UserClerkId::new(valid_id);
        assert!(result.is_ok());
        assert_eq!(result.unwrap().value, valid_id);
    }

    #[test]
    fn test_invalid_prefix() {
        let invalid_id = "admin_abcdefghijklmnopqrstuvwxy1";
        let result = UserClerkId::new(invalid_id);
        assert!(result.is_err());
        assert_eq!(
            result.unwrap_err(),
            "ID must start with 'user_' and be exactly 32 characters long"
        );
    }

    #[test]
    fn test_too_short() {
        let short_id = "user_abc";
        let result = UserClerkId::new(short_id);
        assert!(result.is_err());
    }

    #[test]
    fn test_too_long() {
        let long_id = "user_abcdefghijklmnopqrstuvwxyz12345";
        let result = UserClerkId::new(long_id);
        assert!(result.is_err());
    }

    #[test]
    fn test_missing_prefix() {
        let no_prefix = "abcdefghijklmnopqrstuvwxyz12345";
        let result = UserClerkId::new(no_prefix);
        assert!(result.is_err());
    }

    #[test]
    fn test_clone_and_debug() {
        let id = UserClerkId::new("user_abcdefghijklmnopqrstuvwxyz1").unwrap();
        let cloned = id.clone();
        assert_eq!(id, cloned);
        println!("{:?}", id);
    }
}
