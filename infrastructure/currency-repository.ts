import { eq, sql } from "drizzle-orm";

import { db } from "@/db";
import { currenciesTable } from "@/db/schema";
import { type CurrencyId, currencyId } from "@/domain/currency/currency-id";
import type { ICurrencyRepository } from "@/domain/currency/currency-repository";
import { type Result, err, ok } from "@/lib/result";

const findQuery = db
  .select({ exchangeRate: currenciesTable.exchangeRate })
  .from(currenciesTable)
  .where(eq(currenciesTable.id, sql.placeholder("currency")))
  .limit(1)
  .prepare("find");
const findAllQuery = db.select().from(currenciesTable).prepare("findAll");

export class CurrencyRepository implements ICurrencyRepository {
  public find = (currency: CurrencyId): Promise<Result<number, undefined>> => {
    return findQuery
      .execute({ currency })
      .then((x) => {
        return { type: ok as typeof ok, value: x[0].exchangeRate };
      })
      .catch(() => {
        return { type: err as typeof err, error: undefined };
      });
  };
  public findAll = (): Promise<Result<Map<CurrencyId, number>, undefined>> => {
    return findAllQuery
      .execute()
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
  };

  public update = async () => {
    await fetch(
      `https://openexchangerates.org/api/latest.json?app_id=${process.env.OPEN_EXCHANGE_RATES_APP_ID}`,
    )
      .then((res) => res.json())
      .then(async (data) => {
        const rates: { id: number; rate: number }[] = [
          { id: currencyId.usd, rate: data.rates.JPY / data.rates.USD },
          { id: currencyId.eur, rate: data.rates.JPY / data.rates.EUR },
          { id: currencyId.gbp, rate: data.rates.JPY / data.rates.GBP },
          { id: currencyId.cny, rate: data.rates.JPY / data.rates.CNY },
        ];

        for (const rate of rates) {
          await db
            .update(currenciesTable)
            .set({
              exchangeRate: rate.rate,
            })
            .where(eq(currenciesTable.id, rate.id))
            .execute();
        }
      });

    await fetch("https://api.excelapi.org/crypto/rate?pair=btc-jpy")
      .then((res) => res.json())
      .then(async (data) => {
        await db
          .update(currenciesTable)
          .set({
            exchangeRate: data,
          })
          .where(eq(currenciesTable.id, currencyId.btc))
          .execute();
      });
  };

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
