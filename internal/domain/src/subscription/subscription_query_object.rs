use chrono::NaiveDate;

pub struct SubscriptionQueryObject {
    pub id: String,
    pub name: String,
    pub fee: f64,
    pub amount: f64,
    pub currency_id: u16,
    pub next_update: NaiveDate,
    pub update_cycle_number: u8,
    pub update_cycle_unit_id: u8,
    pub linked_cancellation_method_id: Option<String>,
}
