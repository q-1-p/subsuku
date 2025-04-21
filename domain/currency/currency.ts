export type Currency = (typeof currency)[keyof typeof currency];

export const currency = {
  jpy: 392,
  cny: 156,
  gbp: 826,
  usd: 840,
  eur: 978,
  btc: 1000,
} as const;
export const currencyNames = {
  [currency.jpy]: "日本円 (JPY)",
  [currency.cny]: "人民元 (CNY)",
  [currency.gbp]: "英ポンド (GBP)",
  [currency.usd]: "米ドル (USD)",
  [currency.eur]: "ユーロ (EUR)",
  [currency.btc]: "ビットコイン (BTC)",
} as const;
