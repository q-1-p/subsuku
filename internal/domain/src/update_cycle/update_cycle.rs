use crate::update_cycle::update_cycle_id::UpdateCycleId;

#[derive(Debug)]
pub enum UpdateCycle {
    Daily = 2,
    Monthly = 0,
    Yearly = 1,
}

impl UpdateCycle {
    pub fn new(id: u8) -> Result<Self, String> {
        match id {
            UpdateCycleId::DAILY => Ok(UpdateCycle::Daily),
            UpdateCycleId::MONTHLY => Ok(UpdateCycle::Monthly),
            UpdateCycleId::YEARLY => Ok(UpdateCycle::Yearly),
            _ => Err(format!("Unsupported update cycle ID: {}", id)),
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_new_daily() {
        let result = UpdateCycle::new(UpdateCycleId::DAILY);
        assert!(result.is_ok());
        match result.unwrap() {
            UpdateCycle::Daily => (),
            _ => panic!("Expected Daily variant"),
        }
    }

    #[test]
    fn test_new_monthly() {
        let result = UpdateCycle::new(UpdateCycleId::MONTHLY);
        assert!(result.is_ok());
        match result.unwrap() {
            UpdateCycle::Monthly => (),
            _ => panic!("Expected Monthly variant"),
        }
    }

    #[test]
    fn test_new_yearly() {
        let result = UpdateCycle::new(UpdateCycleId::YEARLY);
        assert!(result.is_ok());
        match result.unwrap() {
            UpdateCycle::Yearly => (),
            _ => panic!("Expected Yearly variant"),
        }
    }

    #[test]
    fn test_new_invalid_id() {
        let result = UpdateCycle::new(99);
        assert!(result.is_err());
        assert_eq!(result.unwrap_err(), "Unsupported update cycle ID: 99");
    }
}
