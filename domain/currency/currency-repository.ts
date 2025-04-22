import type { Result } from "@/lib/result";
import type { Currency } from "./currency";

export interface ICurrencyRepository {
  fetchExchangeRate: (currency: Currency) => Promise<Result<number, undefined>>;
  fetchCurrencies: () => Promise<Result<Map<Currency, number>, undefined>>;
}
