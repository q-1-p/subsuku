use crate::update_cycle::update_cycle_id::UpdateCycleId;

#[derive(Debug)]
pub enum UpdateCycleUnit {
    Daily,
    Monthly,
    Yearly,
}

impl UpdateCycleUnit {
    pub fn new(id: u8) -> Result<Self, String> {
        match id {
            UpdateCycleId::DAILY => Ok(UpdateCycleUnit::Daily),
            UpdateCycleId::MONTHLY => Ok(UpdateCycleUnit::Monthly),
            UpdateCycleId::YEARLY => Ok(UpdateCycleUnit::Yearly),
            _ => Err(format!("Unsupported update cycle ID: {}", id)),
        }
    }

    pub fn get_id(&self) -> u8 {
        match self {
            UpdateCycleUnit::Daily => UpdateCycleId::DAILY,
            UpdateCycleUnit::Monthly => UpdateCycleId::MONTHLY,
            UpdateCycleUnit::Yearly => UpdateCycleId::YEARLY,
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_new_daily() {
        let result = UpdateCycleUnit::new(UpdateCycleId::DAILY);
        assert!(result.is_ok());
        match result.unwrap() {
            UpdateCycleUnit::Daily => (),
            _ => panic!("Expected Daily variant"),
        }
    }

    #[test]
    fn test_new_monthly() {
        let result = UpdateCycleUnit::new(UpdateCycleId::MONTHLY);
        assert!(result.is_ok());
        match result.unwrap() {
            UpdateCycleUnit::Monthly => (),
            _ => panic!("Expected Monthly variant"),
        }
    }

    #[test]
    fn test_new_yearly() {
        let result = UpdateCycleUnit::new(UpdateCycleId::YEARLY);
        assert!(result.is_ok());
        match result.unwrap() {
            UpdateCycleUnit::Yearly => (),
            _ => panic!("Expected Yearly variant"),
        }
    }

    #[test]
    fn test_new_invalid_id() {
        let result = UpdateCycleUnit::new(99);
        assert!(result.is_err());
        assert_eq!(result.unwrap_err(), "Unsupported update cycle ID: 99");
    }
}
