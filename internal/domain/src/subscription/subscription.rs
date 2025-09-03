use crate::{
    currency::currency::Currency,
    subscription::{subscription_id::SubscriptionId, subscription_name::SubscriptionName},
    update_cycle::update_cycle::UpdateCycle,
};
use chrono::NaiveDate;

pub struct Subscription {
    pub id: SubscriptionId,
    pub name: SubscriptionName,
    pub amount: f64,
    pub currency: Currency,
    pub next_update: NaiveDate,
    pub update_cycle: UpdateCycle,
}

impl Subscription {
    pub fn new(
        id: &str,
        name: &str,
        amount: f64,
        currency_id: u16,
        next_update: NaiveDate,
        update_cycle_number: u8,
        update_cycle_unit_id: u8,
    ) -> Result<Self, ()> {
        let id = match SubscriptionId::new(id) {
            Ok(id) => id,
            Err(_) => return Err(()),
        };
        let name = match SubscriptionName::new(name) {
            Ok(name) => name,
            Err(_) => return Err(()),
        };
        let currency = match Currency::new(currency_id) {
            Ok(currency) => currency,
            Err(_) => return Err(()),
        };
        let update_cycle = match UpdateCycle::new(update_cycle_number, update_cycle_unit_id) {
            Ok(update_cycle) => update_cycle,
            Err(_) => return Err(()),
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
