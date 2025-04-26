import { currencyId } from "./currency-id";

export const currencyCodes = {
  [currencyId.jpy]: "JPY",
  [currencyId.cny]: "CNY",
  [currencyId.gbp]: "GBP",
  [currencyId.usd]: "USD",
  [currencyId.eur]: "EUR",
  [currencyId.btc]: "BTC",
} as const;
