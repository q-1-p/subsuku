export type CurrencyId = (typeof currencyId)[keyof typeof currencyId];

export const currencyId = {
  jpy: 392,
  cny: 156,
  gbp: 826,
  usd: 840,
  eur: 978,
  btc: 1000,
} as const;
export const currencyNames = {
  [currencyId.jpy]: "日本円 (JPY)",
  [currencyId.cny]: "人民元 (CNY)",
  [currencyId.gbp]: "英ポンド (GBP)",
  [currencyId.usd]: "米ドル (USD)",
  [currencyId.eur]: "ユーロ (EUR)",
  [currencyId.btc]: "ビットコイン (BTC)",
} as const;
