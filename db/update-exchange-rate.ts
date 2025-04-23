import { currencyId } from "@/domain/currency/currency-id";
import { eq } from "drizzle-orm";
import { db } from ".";
import { currencies } from "./schema";

const updateExchangeRate = () =>
  fetch(
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
          .update(currencies)
          .set({
            exchangeRate: rate.rate,
          })
          .where(eq(currencies.id, rate.id))
          .execute();
      }
    });

if (require.main === module) {
  updateExchangeRate()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("シードプロセスでエラーが発生しました:", error);
      process.exit(1);
    });
}
