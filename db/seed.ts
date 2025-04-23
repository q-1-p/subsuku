import "dotenv/config";
import { addDays, formatDate } from "date-fns";
import { v4 as uuidv4 } from "uuid";

import { currencyId } from "@/domain/currency/currency-id";
import { intervalId } from "@/domain/interval/interval-id";
import { sql } from "drizzle-orm";
import { db } from "./index";
import { currencies, subscriptions, users } from "./schema";

async function seed() {
  try {
    // ユーザーの存在確認
    const existingUsers = await db.select().from(users);

    let userId: string;
    if (existingUsers.length === 0) {
      // ユーザーが存在しない場合は新規作成
      const newUser = await db
        .insert(users)
        .values({
          id: uuidv4(),
          mailAddress: "test@example.com",
          clerkId: process.env.TEST_CLERK_USER_ID as string,
        })
        .returning();

      userId = newUser[0].id;
    } else {
      // 既存ユーザーのIDを使用
      userId = existingUsers[0].id;
    }

    // subscriptionsテーブルに行が存在しないことを確認
    const subscriptionsCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(subscriptions)
      .then((res) => +res[0].count);
    if (subscriptionsCount === 0) {
      // サブスクリプションデータの挿入
      await db.insert(subscriptions).values([
        {
          id: uuidv4(),
          name: "Netflix",
          active: true,
          userId: userId,
          amount: "1490",
          currencyId: currencyId.jpy,
          nextUpdate: formatDate(new Date(), "yyyy-MM-dd"),
          intervalCycle: 1,
          intervalId: intervalId.monthly,
          cancellationMethod: "website",
        },
        {
          id: uuidv4(),
          name: "Amazon Prime",
          active: true,
          userId: userId,
          amount: "10",
          currencyId: currencyId.usd,
          nextUpdate: formatDate(addDays(new Date(), 6), "yyyy-MM-dd"),
          intervalCycle: 1,
          intervalId: intervalId.monthly,
          cancellationMethod: "website",
        },
        {
          id: uuidv4(),
          name: "Spotify",
          active: true,
          userId: userId,
          amount: "8",
          currencyId: currencyId.eur,
          nextUpdate: formatDate(addDays(new Date(), 20), "yyyy-MM-dd"),
          intervalCycle: 1,
          intervalId: intervalId.monthly,
          cancellationMethod: "app",
        },
        {
          id: uuidv4(),
          name: "YouTube Premium",
          active: true,
          userId: userId,
          amount: "5",
          currencyId: currencyId.gbp,
          nextUpdate: formatDate(addDays(new Date(), -4), "yyyy-MM-dd"),
          intervalCycle: 1,
          intervalId: intervalId.monthly,
          cancellationMethod: "website",
        },
        {
          id: uuidv4(),
          name: "iCloud+",
          active: true,
          userId: userId,
          amount: "100",
          currencyId: currencyId.cny,
          nextUpdate: formatDate(addDays(new Date(), 5), "yyyy-MM-dd"),
          intervalCycle: 1,
          intervalId: intervalId.yearly,
          cancellationMethod: "app",
        },
        {
          id: uuidv4(),
          name: "Proton Unlimited",
          active: true,
          userId: userId,
          amount: "0.000165",
          currencyId: currencyId.btc,
          nextUpdate: formatDate(addDays(new Date(), 30), "yyyy-MM-dd"),
          intervalCycle: 1,
          intervalId: intervalId.yearly,
          cancellationMethod: "email",
        },
      ]);
    }
    // subscriptionsテーブルに行が存在しないことを確認
    const currenciesCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(currencies)
      .then((res) => +res[0].count);
    if (currenciesCount === 0) {
      // 為替レートの挿入
      await db.insert(currencies).values([
        {
          id: currencyId.jpy,
          exchangeRate: 1,
        },
        {
          id: currencyId.usd,
          exchangeRate: 140.89,
        },
        {
          id: currencyId.eur,
          exchangeRate: 162.22,
        },
        {
          id: currencyId.gbp,
          exchangeRate: 188.44,
        },
        {
          id: currencyId.cny,
          exchangeRate: 19.3175,
        },
        {
          id: currencyId.btc,
          exchangeRate: 12301589,
        },
      ]);
    }

    console.log("シードデータが正常に挿入されました");
    return { success: true, message: "シードデータが正常に挿入されました" };
  } catch (error) {
    console.error("シードデータの挿入中にエラーが発生しました:", error);
    return { success: false, message: "エラーが発生しました", error };
  }
}

// スクリプトが直接実行された場合にシード関数を実行
if (require.main === module) {
  seed()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("シードプロセスでエラーが発生しました:", error);
      process.exit(1);
    });
}

export { seed };
