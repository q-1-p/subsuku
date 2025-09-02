use uuid::Uuid;

#[derive(Clone, Debug, PartialEq, Eq)]
pub struct UserId {
    pub value: Uuid,
}

impl UserId {
    pub fn new(id: &str) -> Result<Self, ()> {
        match Uuid::parse_str(id) {
            Ok(uuid) => Ok(Self { value: uuid }),
            Err(_) => {
                println!("User ID must be a valid UUID");
                Err(())
            }
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_valid_uuid() {
        let valid_uuid = "550e8400-e29b-41d4-a716-446655440000";
        let result = UserId::new(valid_uuid);
        assert!(result.is_ok());
        assert_eq!(result.unwrap().value.to_string(), valid_uuid);
    }

    #[test]
    fn test_invalid_uuid() {
        let invalid_uuid = "invalid-uuid";
        let result = UserId::new(invalid_uuid);
        assert!(result.is_err());
    }

    #[test]
    fn test_empty_string() {
        let result = UserId::new("");
        assert!(result.is_err());
    }

    #[test]
    fn test_clone_and_equality() {
        let valid_uuid = "550e8400-e29b-41d4-a716-446655440000";
        let user_id1 = UserId::new(valid_uuid).unwrap();
        let user_id2 = user_id1.clone();
        assert_eq!(user_id1, user_id2);
    }
}
