import { db } from "@/db";
import { currencies } from "@/db/schema";
import { type CurrencyId, currencyId } from "@/domain/currency/currency-id";
import type { ICurrencyRepository } from "@/domain/currency/currency-repository";
import { type Result, err, ok } from "@/lib/result";
import { eq } from "drizzle-orm";

export class CurrencyRepository implements ICurrencyRepository {
  public fetchExchangeRate = (
    currency: CurrencyId,
  ): Promise<Result<number, undefined>> =>
    db
      .select({ exchangeRate: currencies.exchangeRate })
      .from(currencies)
      .where(eq(currencies.id, currency))
      .limit(1)
      .then((x) => {
        return { type: ok as typeof ok, value: x[0].exchangeRate };
      })
      .catch(() => {
        return { type: err as typeof err, error: undefined };
      });

  public fetchCurrencies = (): Promise<
    Result<Map<CurrencyId, number>, undefined>
  > =>
    db
      .select()
      .from(currencies)
      .then((data) => {
        if (!this.validateCurrencyIds(data.map((c) => c.id as CurrencyId))) {
          return { type: err as typeof err, error: undefined };
        }

        const currencyMap = new Map<CurrencyId, number>();
        for (const currency of data) {
          currencyMap.set(currency.id as CurrencyId, currency.exchangeRate);
        }

        return { type: ok as typeof ok, value: currencyMap };
      })
      .catch(() => {
        return { type: err as typeof err, error: undefined };
      });

  private validateCurrencyIds = (currencyIds: CurrencyId[]): boolean => {
    const currencies = [
      currencyId.jpy,
      currencyId.cny,
      currencyId.gbp,
      currencyId.usd,
      currencyId.eur,
      currencyId.btc,
    ];

    for (const c of currencies) {
      if (!currencyIds.some((id) => id === c)) {
        return false;
      }
    }

    return true;
  };
}
