use domain::subscription::subscription_query_object::SubscriptionQueryObject;
use serde::Serialize;

#[derive(Serialize)]
pub struct SubscriptionDTO {
    pub id: String,
    pub name: String,
    pub fee: f64,
    pub amount: f64,
    pub currency_id: u16,
    pub next_update: String,
    pub update_cycle_number: u8,
    pub update_cycle_unit_id: u8,
    pub linked_cancellation_method_id: Option<String>,
}

impl SubscriptionDTO {
    pub fn new(query_object: SubscriptionQueryObject) -> Self {
        Self {
            id: query_object.id,
            name: query_object.name,
            fee: query_object.fee,
            amount: query_object.amount,
            currency_id: query_object.currency_id,
            next_update: query_object.next_update.to_string(),
            update_cycle_number: query_object.update_cycle_number,
            update_cycle_unit_id: query_object.update_cycle_unit_id,
            linked_cancellation_method_id: query_object.linked_cancellation_method_id,
        }
    }
}
