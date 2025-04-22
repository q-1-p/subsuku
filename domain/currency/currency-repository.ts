import type { Result } from "@/lib/result";
import type { CurrencyId } from "./currency-id";

export interface ICurrencyRepository {
  fetchExchangeRate: (
    currency: CurrencyId,
  ) => Promise<Result<number, undefined>>;
  fetchCurrencies: () => Promise<Result<Map<CurrencyId, number>, undefined>>;
}
