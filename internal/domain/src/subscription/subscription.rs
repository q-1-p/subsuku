use crate::{
    currency::currency::Currency,
    subscription::{
        subscription_query_object::SubscriptionQueryObject, subscription_id::SubscriptionId,
        subscription_name::SubscriptionName,
    },
    update_cycle::update_cycle::UpdateCycle,
};
use chrono::NaiveDate as Date;
use uuid::Uuid;

pub struct Subscription {
    pub id: SubscriptionId,
    pub name: SubscriptionName,
    pub amount: f64,
    pub currency: Currency,
    pub next_update: Date,
    pub update_cycle: UpdateCycle,
}

impl Subscription {
    pub fn new(subscription_dto: SubscriptionQueryObject) -> Result<Self, String> {
        let id = if subscription_dto.id.is_empty() {
            SubscriptionId::new(Uuid::new_v4().to_string().as_str()).unwrap()
        } else {
            match SubscriptionId::new(subscription_dto.id.as_str()) {
                Ok(id) => id,
                Err(e) => return Err(e),
            }
        };
        let name = match SubscriptionName::new(subscription_dto.name.as_str()) {
            Ok(name) => name,
            Err(e) => return Err(e),
        };
        let amount = subscription_dto.amount;
        let currency = match Currency::new(subscription_dto.currency_id) {
            Ok(currency) => currency,
            Err(e) => return Err(e),
        };
        let next_update = subscription_dto.next_update;
        let update_cycle = match UpdateCycle::new(
            subscription_dto.update_cycle_number,
            subscription_dto.update_cycle_unit_id,
        ) {
            Ok(update_cycle) => update_cycle,
            Err(e) => return Err(e),
        };

        Ok(Self {
            id,
            name,
            amount,
            currency,
            next_update,
            update_cycle,
        })
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::subscription::subscription_query_object::SubscriptionQueryObject;

    #[test]
    fn test_subscription_new_with_empty_id() {
        let dto = SubscriptionQueryObject {
            id: String::new(),
            name: "Netflix".to_string(),
            fee: 15.99,
            amount: 15.99,
            currency_id: 1,
            next_update: Date::from_ymd_opt(2024, 1, 15).unwrap(),
            update_cycle_number: 1,
            update_cycle_unit_id: 1,
            linked_cancellation_method_id: None,
        };

        let result = Subscription::new(dto);
        assert!(result.is_ok());

        let subscription = result.unwrap();
        assert!(!subscription.id.to_string().is_empty());
        assert_eq!(subscription.name.to_string(), "Netflix");
        assert_eq!(subscription.amount, 15.99);
    }

    #[test]
    fn test_subscription_new_with_existing_id() {
        let test_id = Uuid::new_v4().to_string();
        let dto = SubscriptionQueryObject {
            id: test_id.clone(),
            name: "Spotify".to_string(),
            fee: 9.99,
            amount: 9.99,
            currency_id: 1,
            next_update: Date::from_ymd_opt(2024, 2, 1).unwrap(),
            update_cycle_number: 1,
            update_cycle_unit_id: 1,
            linked_cancellation_method_id: None,
        };

        let result = Subscription::new(dto);
        assert!(result.is_ok());

        let subscription = result.unwrap();
        assert_eq!(subscription.id.to_string(), test_id);
        assert_eq!(subscription.name.to_string(), "Spotify");
        assert_eq!(subscription.amount, 9.99);
    }

    #[test]
    fn test_subscription_new_with_invalid_name() {
        let dto = SubscriptionQueryObject {
            id: String::new(),
            name: String::new(), // Invalid empty name
            fee: 10.0,
            amount: 10.0,
            currency_id: 1,
            next_update: Date::from_ymd_opt(2024, 1, 1).unwrap(),
            update_cycle_number: 1,
            update_cycle_unit_id: 1,
            linked_cancellation_method_id: None,
        };

        let result = Subscription::new(dto);
        assert!(result.is_err());
    }

    #[test]
    fn test_subscription_new_with_invalid_currency() {
        let dto = SubscriptionQueryObject {
            id: String::new(),
            name: "Test Service".to_string(),
            fee: 5.0,
            amount: 5.0,
            currency_id: 999, // Invalid currency ID
            next_update: Date::from_ymd_opt(2024, 1, 1).unwrap(),
            update_cycle_number: 1,
            update_cycle_unit_id: 1,
            linked_cancellation_method_id: None,
        };

        let result = Subscription::new(dto);
        assert!(result.is_err());
    }

    #[test]
    fn test_subscription_new_with_invalid_update_cycle() {
        let dto = SubscriptionQueryObject {
            id: String::new(),
            name: "Test Service".to_string(),
            fee: 5.0,
            amount: 5.0,
            currency_id: 1,
            next_update: Date::from_ymd_opt(2024, 1, 1).unwrap(),
            update_cycle_number: 0, // Invalid cycle number
            update_cycle_unit_id: 1,
            linked_cancellation_method_id: None,
        };

        let result = Subscription::new(dto);
        assert!(result.is_err());
    }
}
