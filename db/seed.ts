import "dotenv/config";
import { addDays, formatDate } from "date-fns";
import { sql } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

import { currencyId } from "@/domain/currency/currency-id";
import { intervalId } from "@/domain/interval/interval-id";
import { db } from "./index";
import {
  cancellationMethodsTable,
  cancellationStepsTable,
  currenciesTable,
  subscriptionsTable,
  usersTable,
} from "./schema";

async function seed() {
  try {
    const userId = await seedUser();
    const insertedMethodIds = await seedCancellationMethods(userId);

    await Promise.all([
      seedCancellationSteps(insertedMethodIds[0]),
      seedSubscriptions(userId, insertedMethodIds[0]),
      seedCurrencies(),
    ]);

    console.log("シードデータが正常に挿入されました");
  } catch (error) {
    console.error("シードデータの挿入中にエラーが発生しました:", error);
    throw error;
  }
}

async function seedUser(): Promise<string> {
  const existingUsers = await db.select().from(usersTable);
  if (existingUsers.length === 0) {
    // ユーザーが存在しない場合は新規作成
    const newUser = await db
      .insert(usersTable)
      .values({
        id: uuidv4(),
        mailAddress: "test@example.com",
        clerkId: process.env.TEST_CLERK_USER_ID as string,
      })
      .returning();

    return newUser[0].id;
  }

  // 既存ユーザーのIDを使用
  return existingUsers[0].id;
}
async function seedCancellationMethods(userId: string): Promise<string[]> {
  const insertedMethods = await db
    .insert(cancellationMethodsTable)
    .values([
      {
        name: "メール",
        public: true,
        precautions: "",
        freeText: "",
        serviceUrl: "",
        createdUserId: userId,
      },
      {
        name: "電話",
        public: true,
        precautions: "",
        freeText: "",
        serviceUrl: "",
        createdUserId: userId,
      },
      {
        name: "Webフォーム",
        public: true,
        precautions: "",
        freeText: "",
        serviceUrl: "",
        createdUserId: userId,
      },
    ])
    .returning({
      id: cancellationMethodsTable.id,
    });

  return insertedMethods.map((method) => method.id);
}
async function seedCancellationSteps(
  cancellationMethodId: string,
): Promise<void> {
  await db.insert(cancellationStepsTable).values([
    {
      cancellationMethodId,
      sequentialOrder: 1,
      procedure: "Step 1",
    },
    {
      cancellationMethodId,
      sequentialOrder: 2,
      procedure: "Step 2",
    },
    {
      cancellationMethodId,
      sequentialOrder: 3,
      procedure: "Step 3",
    },
  ]);
}
async function seedSubscriptions(
  userId: string,
  insertedMethodId: string,
): Promise<void> {
  const subscriptionsCount = await db
    .select({ count: sql<number>`count(*)` })
    .from(subscriptionsTable)
    .then((res) => +res[0].count);
  if (subscriptionsCount === 0) {
    // サブスクリプションデータの挿入
    await db.insert(subscriptionsTable).values([
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
        cancellationMethodId: insertedMethodId, // 実際の ID を使用
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
        cancellationMethodId: insertedMethodId, // 実際の ID を使用
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
        cancellationMethodId: insertedMethodId, // 実際の ID を使用
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
        cancellationMethodId: insertedMethodId, // 実際の ID を使用
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
        cancellationMethodId: insertedMethodId, // 実際の ID を使用
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
        cancellationMethodId: insertedMethodId, // 実際の ID を使用
      },
      {
        id: uuidv4(),
        name: "Ever Note",
        active: false,
        userId: userId,
        amount: "5",
        currencyId: currencyId.usd,
        nextUpdate: formatDate(addDays(new Date(), 3), "yyyy-MM-dd"),
        intervalCycle: 2,
        intervalId: intervalId.monthly,
        cancellationMethodId: insertedMethodId, // 実際の ID を使用
      },
    ]);
  }
}
async function seedCurrencies() {
  const currenciesCount = await db
    .select({ count: sql<number>`count(*)` })
    .from(currenciesTable)
    .then((res) => +res[0].count);
  if (currenciesCount === 0) {
    // 為替レートの挿入
    await db.insert(currenciesTable).values([
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
