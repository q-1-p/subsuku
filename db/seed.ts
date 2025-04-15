import "dotenv/config";
import { v4 as uuidv4 } from "uuid";
import { db } from "./index";
import { subscriptions, users } from "./schema";

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

    // サブスクリプションのダミーデータ
    const subscriptionData = [
      {
        id: uuidv4(),
        name: "Netflix",
        active: true,
        userId: userId,
        price: "1490",
        currencyId: 1, // 1 = JPY
        nextUpdate: new Date(2025, 4, 1).toISOString().split("T")[0], // 2025年5月1日
        intervalCycle: 1,
        intervalUnitId: 2, // 2 = 月
      },
      {
        id: uuidv4(),
        name: "Amazon Prime",
        active: true,
        userId: userId,
        price: "600",
        currencyId: 1,
        nextUpdate: new Date(2025, 3, 15).toISOString().split("T")[0], // 2025年4月15日
        intervalCycle: 1,
        intervalUnitId: 2,
      },
      {
        id: uuidv4(),
        name: "Spotify",
        active: true,
        userId: userId,
        price: "980",
        currencyId: 1,
        nextUpdate: new Date(2025, 4, 20).toISOString().split("T")[0], // 2025年5月20日
        intervalCycle: 1,
        intervalUnitId: 2,
      },
      {
        id: uuidv4(),
        name: "YouTube Premium",
        active: true,
        userId: userId,
        price: "1180",
        currencyId: 1,
        nextUpdate: new Date(2025, 5, 5).toISOString().split("T")[0], // 2025年6月5日
        intervalCycle: 1,
        intervalUnitId: 2,
      },
      {
        id: uuidv4(),
        name: "iCloud+",
        active: true,
        userId: userId,
        price: "400",
        currencyId: 1,
        nextUpdate: new Date(2025, 4, 25).toISOString().split("T")[0], // 2025年5月25日
        intervalCycle: 1,
        intervalUnitId: 2,
      },
    ];

    // サブスクリプションデータの挿入
    await db.insert(subscriptions).values(subscriptionData);

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
