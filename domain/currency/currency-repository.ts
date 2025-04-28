import type { Result } from "@/lib/result";
import type { CurrencyId } from "./currency-id";

export interface ICurrencyRepository {
  find: (currency: CurrencyId) => Promise<Result<number, undefined>>;
  findAll: () => Promise<Result<Map<CurrencyId, number>, undefined>>;
}
