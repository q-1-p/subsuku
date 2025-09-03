use crate::update_cycle::update_cycle_unit::UpdateCycleUnit;

#[derive(Debug)]
pub struct UpdateCycle {
    pub number: u8,
    pub unit: UpdateCycleUnit,
}

impl UpdateCycle {
    pub fn new(update_cycle_number: u8, update_cycle_unit: u8) -> Result<Self, ()> {
        let number = match update_cycle_number {
            1..=255 => update_cycle_number,
            _ => {
                println!("Invalid update cycle number");
                return Err(());
            }
        };
        let unit = match UpdateCycleUnit::new(update_cycle_unit) {
            Ok(result) => result,
            Err(_) => return Err(()),
        };

        Ok(Self { number, unit })
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_new_valid_input() {
        let result = UpdateCycle::new(1, 1);
        assert!(result.is_ok());
    }

    #[test]
    fn test_new_invalid_number_zero() {
        let result = UpdateCycle::new(0, 1);
        assert!(result.is_err());
    }

    #[test]
    fn test_new_valid_number_boundary() {
        let result = UpdateCycle::new(255, 1);
        assert!(result.is_ok());
    }

    #[test]
    fn test_new_invalid_unit() {
        let result = UpdateCycle::new(1, 255);
        assert!(result.is_err());
    }
}
