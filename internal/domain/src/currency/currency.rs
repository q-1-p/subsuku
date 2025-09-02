use crate::currency::currency_id::CurrencyId;

#[derive(Debug)]
pub enum Currency {
    CNY,
    JPY,
    GBP,
    USD,
    EUR,
    BTC,
}

impl Currency {
    pub fn new(id: u16) -> Result<Self, String> {
        match id {
            CurrencyId::CNY => Ok(Currency::CNY),
            CurrencyId::JPY => Ok(Currency::JPY),
            CurrencyId::GBP => Ok(Currency::GBP),
            CurrencyId::USD => Ok(Currency::USD),
            CurrencyId::EUR => Ok(Currency::EUR),
            CurrencyId::BTC => Ok(Currency::BTC),
            _ => Err(format!("Unsupported currency ID: {}", id)),
        }
    }

    pub fn get_id(&self) -> u16 {
        match self {
            Currency::CNY => CurrencyId::CNY,
            Currency::JPY => CurrencyId::JPY,
            Currency::GBP => CurrencyId::GBP,
            Currency::USD => CurrencyId::USD,
            Currency::EUR => CurrencyId::EUR,
            Currency::BTC => CurrencyId::BTC,
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_currency_new_valid_ids() {
        assert!(matches!(Currency::new(CurrencyId::CNY), Ok(Currency::CNY)));
        assert!(matches!(Currency::new(CurrencyId::JPY), Ok(Currency::JPY)));
        assert!(matches!(Currency::new(CurrencyId::GBP), Ok(Currency::GBP)));
        assert!(matches!(Currency::new(CurrencyId::USD), Ok(Currency::USD)));
        assert!(matches!(Currency::new(CurrencyId::EUR), Ok(Currency::EUR)));
        assert!(matches!(Currency::new(CurrencyId::BTC), Ok(Currency::BTC)));
    }

    #[test]
    fn test_currency_new_invalid_id() {
        let result = Currency::new(9999);
        assert!(result.is_err());
        assert_eq!(result.unwrap_err(), "Unsupported currency ID: 9999");
    }
}
