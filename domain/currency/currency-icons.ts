import { currencyId } from "./currency-id";

export const currencyIcons = {
  [currencyId.jpy]: "¥",
  [currencyId.cny]: "¥",
  [currencyId.gbp]: "£",
  [currencyId.usd]: "$",
  [currencyId.eur]: "€",
  [currencyId.btc]: "₿",
} as const;
