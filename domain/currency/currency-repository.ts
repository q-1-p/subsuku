import type { Result } from "@/lib/result";
import type { CurrencyId } from "../type";

export interface ICurrencyRepository {
  find: (currency: CurrencyId) => Promise<Result<number, undefined>>;
  findAll: () => Promise<Result<Map<CurrencyId, number>, undefined>>;
}
