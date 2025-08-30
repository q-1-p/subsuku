use uuid::Uuid;

#[derive(Clone, Debug, PartialEq, Eq)]
pub struct CancellationMethodId {
    pub value: String,
}

impl CancellationMethodId {
    pub fn new(id: &str) -> Result<Self, String> {
        if Uuid::parse_str(id).is_err() {
            return Err("CancellationMethod ID must be a valid UUID".to_string());
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
    fn test_new_with_valid_uuid() {
        let valid_uuid = "550e8400-e29b-41d4-a716-446655440000";
        let result = CancellationMethodId::new(valid_uuid);

        assert!(result.is_ok());
        assert_eq!(result.unwrap().value, valid_uuid);
    }

    #[test]
    fn test_new_with_invalid_uuid() {
        let invalid_uuid = "invalid-uuid";
        let result = CancellationMethodId::new(invalid_uuid);

        assert!(result.is_err());
        assert_eq!(
            result.unwrap_err(),
            "CancellationMethod ID must be a valid UUID"
        );
    }

    #[test]
    fn test_new_with_empty_string() {
        let empty_string = "";
        let result = CancellationMethodId::new(empty_string);

        assert!(result.is_err());
        assert_eq!(
            result.unwrap_err(),
            "CancellationMethod ID must be a valid UUID"
        );
    }

    #[test]
    fn test_clone() {
        let valid_uuid = "550e8400-e29b-41d4-a716-446655440000";
        let id = CancellationMethodId::new(valid_uuid).unwrap();
        let cloned_id = id.clone();

        assert_eq!(id, cloned_id);
    }

    #[test]
    fn test_debug() {
        let valid_uuid = "550e8400-e29b-41d4-a716-446655440000";
        let id = CancellationMethodId::new(valid_uuid).unwrap();
        let debug_string = format!("{:?}", id);

        assert!(debug_string.contains("CancellationMethodId"));
        assert!(debug_string.contains(valid_uuid));
    }

    #[test]
    fn test_partial_eq() {
        let valid_uuid = "550e8400-e29b-41d4-a716-446655440000";
        let id1 = CancellationMethodId::new(valid_uuid).unwrap();
        let id2 = CancellationMethodId::new(valid_uuid).unwrap();

        assert_eq!(id1, id2);
    }
}
