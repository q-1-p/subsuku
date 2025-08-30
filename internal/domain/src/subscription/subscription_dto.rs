use chrono::NaiveDate;

pub struct SubscriptionDTO {
    pub id: String,
    pub name: String,
    pub amount: f64,
    pub currency_id: u16,
    pub next_update: NaiveDate,
    pub update_cycle_id: u8,
}
