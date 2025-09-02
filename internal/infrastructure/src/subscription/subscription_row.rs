use chrono::NaiveDate;
use domain::subscription::subscription_query_object::SubscriptionQueryObject;
use sqlx::{FromRow, types::Uuid};

#[derive(FromRow)]
pub struct SubscriptionRow {
    pub id: Uuid,
    pub name: String,
    pub fee: f64,
    pub amount: f64,
    pub currency_id: i16,
    pub next_update: NaiveDate,
    pub update_cycle_number: i16,
    pub update_cycle_unit_id: i16,
    pub linked_cancellation_method_id: Option<Uuid>,
}

impl SubscriptionRow {
    pub fn to_dto(&self) -> SubscriptionQueryObject {
        SubscriptionQueryObject {
            id: self.id.to_string(),
            name: self.name.clone(),
            fee: self.fee,
            amount: self.amount,
            currency_id: self.currency_id as u16,
            next_update: self.next_update,
            update_cycle_number: self.update_cycle_number as u8,
            update_cycle_unit_id: self.update_cycle_unit_id as u8,
            linked_cancellation_method_id: match self.linked_cancellation_method_id {
                Some(id) => Some(id.to_string()),
                None => None,
            },
        }
    }
}
