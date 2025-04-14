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
          email: "test@example.com",
          clerkId: `user_${Math.random().toString(36).substring(2, 10)}`,
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
        fee: "1490",
        currencyId: 1, // 1 = JPY
        nextUpdate: new Date(2025, 4, 30), // 2025年5月30日
        intervalCycle: 1,
        intervalUnitId: 2, // 2 = 月
      },
      {
        id: uuidv4(),
        name: "Amazon Prime",
        active: true,
        userId: userId,
        fee: "600",
        currencyId: 1,
        nextUpdate: new Date(2025, 5, 15), // 2025年6月15日
        intervalCycle: 1,
        intervalUnitId: 2,
      },
      {
        id: uuidv4(),
        name: "Spotify",
        active: true,
        userId: userId,
        fee: "980",
        currencyId: 1,
        nextUpdate: new Date(2025, 4, 20), // 2025年5月20日
        intervalCycle: 1,
        intervalUnitId: 2,
      },
      {
        id: uuidv4(),
        name: "YouTube Premium",
        active: true,
        userId: userId,
        fee: "1180",
        currencyId: 1,
        nextUpdate: new Date(2025, 5, 5), // 2025年6月5日
        intervalCycle: 1,
        intervalUnitId: 2,
      },
      {
        id: uuidv4(),
        name: "iCloud+",
        active: true,
        userId: userId,
        fee: "400",
        currencyId: 1,
        nextUpdate: new Date(2025, 4, 25), // 2025年5月25日
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
