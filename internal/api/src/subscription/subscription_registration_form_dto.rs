use serde::Deserialize;

#[derive(Deserialize)]
pub struct SubscriptionRegistrationFormDTO {
    pub id: Option<String>,
    pub name: String,
    pub amount: f64,
    pub currency_id: u16,
    pub next_update: String,
    pub update_cycle_number: u8,
    pub update_cycle_unit_id: u8,
}
