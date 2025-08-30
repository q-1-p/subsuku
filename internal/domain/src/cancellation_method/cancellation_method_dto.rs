pub struct CancellationMethodDto {
    pub id: String,
    pub name: String,
    pub private: bool,
    pub url_to_cancel: String,
    pub steps: Vec<String>,
    pub precautions: String,
    pub free_text: String,
    pub link_subscription_id: String,
}
