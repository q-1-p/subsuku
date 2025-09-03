use crate::update_cycle::update_cycle_id::UpdateCycleId;

#[derive(Debug)]
pub enum UpdateCycleUnit {
    Daily,
    Monthly,
    Yearly,
}

impl UpdateCycleUnit {
    pub fn new(id: u8) -> Result<Self, ()> {
        match id {
            UpdateCycleId::DAILY => Ok(UpdateCycleUnit::Daily),
            UpdateCycleId::MONTHLY => Ok(UpdateCycleUnit::Monthly),
            UpdateCycleId::YEARLY => Ok(UpdateCycleUnit::Yearly),
            _ => {
                println!("Unsupported update cycle ID: {}", id);
                Err(())
            }
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
    }

    #[test]
    fn test_new_monthly() {
        let result = UpdateCycleUnit::new(UpdateCycleId::MONTHLY);
        assert!(result.is_ok());
    }

    #[test]
    fn test_new_yearly() {
        let result = UpdateCycleUnit::new(UpdateCycleId::YEARLY);
        assert!(result.is_ok());
    }

    #[test]
    fn test_new_invalid_id() {
        let result = UpdateCycleUnit::new(99);
        assert!(result.is_err());
    }
}
