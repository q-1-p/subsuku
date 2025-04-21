import "dotenv/config";
import { addDays, formatDate } from "date-fns";
import { v4 as uuidv4 } from "uuid";

import { currency } from "@/domain/currency/currency";
import { intervalUnit } from "@/domain/interval";
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
          clerkId: "user_2vftzsgfsdmGACPA98396ejadso",
        })
        .returning();

      userId = newUser[0].id;
    } else {
      // 既存ユーザーのIDを使用
      userId = existingUsers[0].id;
    }

    // サブスクリプションデータの挿入
    await db.insert(subscriptions).values([
      {
        id: uuidv4(),
        name: "Netflix",
        active: true,
        userId: userId,
        price: "1490",
        currencyId: currency.jpy,
        nextUpdate: formatDate(new Date(), "yyyy-MM-dd"),
        intervalCycle: 1,
        intervalUnitId: intervalUnit.monthly,
      },
      {
        id: uuidv4(),
        name: "Amazon Prime",
        active: true,
        userId: userId,
        price: "600",
        currencyId: currency.usd,
        nextUpdate: formatDate(addDays(new Date(), 6), "yyyy-MM-dd"),
        intervalCycle: 1,
        intervalUnitId: intervalUnit.monthly,
      },
      {
        id: uuidv4(),
        name: "Spotify",
        active: true,
        userId: userId,
        price: "980",
        currencyId: currency.eur,
        nextUpdate: formatDate(addDays(new Date(), 20), "yyyy-MM-dd"),
        intervalCycle: 1,
        intervalUnitId: intervalUnit.monthly,
      },
      {
        id: uuidv4(),
        name: "YouTube Premium",
        active: true,
        userId: userId,
        price: "1180",
        currencyId: currency.gbp,
        nextUpdate: formatDate(addDays(new Date(), -4), "yyyy-MM-dd"),
        intervalCycle: 1,
        intervalUnitId: intervalUnit.monthly,
      },
      {
        id: uuidv4(),
        name: "iCloud+",
        active: true,
        userId: userId,
        price: "400",
        currencyId: currency.cny,
        nextUpdate: formatDate(addDays(new Date(), 5), "yyyy-MM-dd"),
        intervalCycle: 1,
        intervalUnitId: intervalUnit.yearly,
      },
      {
        id: uuidv4(),
        name: "Proton Unlimited",
        active: true,
        userId: userId,
        price: "400",
        currencyId: currency.btc,
        nextUpdate: formatDate(addDays(new Date(), 30), "yyyy-MM-dd"),
        intervalCycle: 1,
        intervalUnitId: intervalUnit.yearly,
      },
    ]);

    // 為替レートの挿入
    await db.insert(currencies).values([
      {
        id: currency.jpy,
        exchangeRate: 1,
      },
      {
        id: currency.usd,
        exchangeRate: 140.89,
      },
      {
        id: currency.eur,
        exchangeRate: 162.22,
      },
      {
        id: currency.gbp,
        exchangeRate: 188.44,
      },
      {
        id: currency.cny,
        exchangeRate: 19.3175,
      },
      {
        id: currency.btc,
        exchangeRate: 12301589,
      },
    ]);

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
