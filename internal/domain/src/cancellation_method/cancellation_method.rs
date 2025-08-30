use crate::{
    cancellation_method::{
        cancellation_method_dto::CancellationMethodDto,
        cancellation_method_id::CancellationMethodId,
    },
    subscription::{subscription_id::SubscriptionId, subscription_name::SubscriptionName},
    url::Url,
};
use uuid::Uuid;

pub struct CancellationMethod {
    pub id: CancellationMethodId,
    pub name: SubscriptionName,
    pub private: bool,
    pub url_to_cancel: Url,
    pub steps: Vec<String>,
    pub precautions: String,
    pub free_text: String,
    pub link_subscription_id: Option<SubscriptionId>,
}

impl CancellationMethod {
    pub fn new(cancellation_method_form_data: CancellationMethodDto) -> Result<Self, String> {
        let id = if cancellation_method_form_data.id.is_empty() {
            CancellationMethodId::new(Uuid::new_v4().to_string().as_str())?
        } else {
            match CancellationMethodId::new(cancellation_method_form_data.id.as_str()) {
                Ok(id) => id,
                Err(e) => return Err(e),
            }
        };
        let name = match SubscriptionName::new(cancellation_method_form_data.name.as_str()) {
            Ok(name) => name,
            Err(e) => return Err(e),
        };
        let url_to_cancel = Url::new(&cancellation_method_form_data.url_to_cancel)?;
        let link_subscription_id = if cancellation_method_form_data
            .link_subscription_id
            .is_empty()
        {
            None
        } else {
            match SubscriptionId::new(cancellation_method_form_data.link_subscription_id.as_str()) {
                Ok(id) => Some(id),
                Err(e) => return Err(e),
            }
        };

        Ok(Self {
            id,
            name,
            private: cancellation_method_form_data.private,
            url_to_cancel,
            steps: cancellation_method_form_data.steps,
            precautions: cancellation_method_form_data.precautions,
            free_text: cancellation_method_form_data.free_text,
            link_subscription_id,
        })
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::cancellation_method::cancellation_method_dto::CancellationMethodDto;

    #[test]
    fn test_cancellation_method_new_with_empty_id() {
        let form = CancellationMethodDto {
            id: String::new(),
            name: "Netflix Cancellation".to_string(),
            private: false,
            url_to_cancel: "https://www.netflix.com/cancel".to_string(),
            steps: vec!["Login to account".to_string(), "Go to settings".to_string()],
            precautions: "Make sure to download any content first".to_string(),
            free_text: "Additional notes".to_string(),
            link_subscription_id: String::new(),
        };

        let result = CancellationMethod::new(form);
        assert!(result.is_ok());

        let cancellation_method = result.unwrap();
        assert_eq!(
            cancellation_method.name,
            SubscriptionName::new("Netflix Cancellation").unwrap()
        );
        assert!(!cancellation_method.private);
        assert_eq!(
            cancellation_method.url_to_cancel,
            Url::new("https://www.netflix.com/cancel").unwrap()
        );
        assert_eq!(cancellation_method.steps.len(), 2);
        assert!(cancellation_method.link_subscription_id.is_none());
    }

    #[test]
    fn test_cancellation_method_new_with_existing_id() {
        let existing_id = Uuid::new_v4().to_string();
        let subscription_id = Uuid::new_v4().to_string();
        let form = CancellationMethodDto {
            id: existing_id.clone(),
            name: "Spotify Cancellation".to_string(),
            private: true,
            url_to_cancel: "https://www.spotify.com/cancel".to_string(),
            steps: vec!["Contact support".to_string()],
            precautions: "Cancel before billing date".to_string(),
            free_text: "Call during business hours".to_string(),
            link_subscription_id: subscription_id.clone(),
        };

        let result = CancellationMethod::new(form);
        assert!(result.is_ok());

        let cancellation_method = result.unwrap();
        assert_eq!(
            cancellation_method.name,
            SubscriptionName::new("Spotify Cancellation").unwrap()
        );
        assert!(cancellation_method.private);
        assert!(cancellation_method.link_subscription_id.is_some());
        assert_eq!(
            cancellation_method.link_subscription_id.unwrap(),
            SubscriptionId::new(&subscription_id).unwrap()
        );
    }

    #[test]
    fn test_cancellation_method_new_with_invalid_name() {
        let form = CancellationMethodDto {
            id: String::new(),
            name: String::new(), // Invalid empty name
            private: false,
            url_to_cancel: "https://example.com".to_string(),
            steps: vec![],
            precautions: String::new(),
            free_text: String::new(),
            link_subscription_id: String::new(),
        };

        let result = CancellationMethod::new(form);
        assert!(result.is_err());
    }

    #[test]
    fn test_cancellation_method_new_with_invalid_url() {
        let form = CancellationMethodDto {
            id: String::new(),
            name: "Test Service".to_string(),
            private: false,
            url_to_cancel: "invalid-url".to_string(), // Invalid URL
            steps: vec![],
            precautions: String::new(),
            free_text: String::new(),
            link_subscription_id: String::new(),
        };

        let result = CancellationMethod::new(form);
        assert!(result.is_err());
    }

    #[test]
    fn test_cancellation_method_new_with_invalid_id() {
        let form = CancellationMethodDto {
            id: "invalid-uuid".to_string(), // Invalid UUID
            name: "Test Service".to_string(),
            private: false,
            url_to_cancel: "https://example.com".to_string(),
            steps: vec![],
            precautions: String::new(),
            free_text: String::new(),
            link_subscription_id: String::new(),
        };

        let result = CancellationMethod::new(form);
        assert!(result.is_err());
    }

    #[test]
    fn test_cancellation_method_new_with_invalid_subscription_id() {
        let form = CancellationMethodDto {
            id: String::new(),
            name: "Test Service".to_string(),
            private: false,
            url_to_cancel: "https://example.com".to_string(),
            steps: vec![],
            precautions: String::new(),
            free_text: String::new(),
            link_subscription_id: "invalid-uuid".to_string(), // Invalid subscription UUID
        };

        let result = CancellationMethod::new(form);
        assert!(result.is_err());
    }
}
