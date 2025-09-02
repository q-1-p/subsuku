use std::fmt;

#[derive(Clone, Debug)]
pub struct SubscriptionName {
    pub value: String,
}

impl fmt::Display for SubscriptionName {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}", self.value)
    }
}

impl SubscriptionName {
    pub fn new(name: &str) -> Result<Self, String> {
        if name.len() < 1 || name.len() > 32 {
            return Err("Name must be between 1 and 32 characters".to_string());
        }

        Ok(Self {
            value: name.to_string(),
        })
    }
}

// PartialEqを実装することで、値の等価性を比較可能にする
impl PartialEq for SubscriptionName {
    fn eq(&self, other: &Self) -> bool {
        self.value == other.value
    }
}

impl Eq for SubscriptionName {}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_equality_of_vo() {
        let name1 = SubscriptionName::new("Premium Plan");
        let name2 = SubscriptionName::new("Premium Plan");
        let name3 = SubscriptionName::new("Basic Plan");

        assert_eq!(name1, name2); // 同じ値なので等しい
        assert_ne!(name1, name3); // 異なる値なので等しくない
    }
}
