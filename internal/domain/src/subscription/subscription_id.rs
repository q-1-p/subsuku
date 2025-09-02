use std::fmt;
use uuid::Uuid;

#[derive(Clone, Debug, PartialEq, Eq)]
pub struct SubscriptionId {
    pub value: String,
}

impl fmt::Display for SubscriptionId {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}", self.value)
    }
}

impl SubscriptionId {
    pub fn new(id: &str) -> Result<Self, String> {
        if Uuid::parse_str(id).is_err() {
            return Err("Subscription ID must be a valid UUID".to_string());
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
    fn test_subscription_id_creation() {
        let uuid_str = "550e8400-e29b-41d4-a716-446655440000";
        let id = SubscriptionId::new(uuid_str).unwrap();
        assert_eq!(id.value, uuid_str);
    }

    #[test]
    fn test_subscription_id_equality() {
        let uuid1 = "550e8400-e29b-41d4-a716-446655440000";
        let uuid2 = "550e8400-e29b-41d4-a716-446655440001";

        let id1 = SubscriptionId::new(uuid1).unwrap();
        let id2 = SubscriptionId::new(uuid1).unwrap();
        let id3 = SubscriptionId::new(uuid2).unwrap();

        assert_eq!(id1, id2);
        assert_ne!(id1, id3);
    }

    #[test]
    fn test_subscription_id_invalid_uuid() {
        let result = SubscriptionId::new("invalid-uuid");
        assert!(result.is_err());
        assert_eq!(result.unwrap_err(), "Subscription ID must be a valid UUID");
    }
}
