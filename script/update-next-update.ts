import { db } from "@/db";
import { subscriptionsTable } from "@/db/schema";
import { timeUnit } from "@/domain/type";
import { addDays, addMonths, addYears, format } from "date-fns";
import { ja } from "date-fns/locale/ja";
import { eq, lt } from "drizzle-orm";

const updateNextUpdate = async () => {
  const today = format(addDays(new Date(), -1), "yyyy-MM-dd", { locale: ja });
  const updateSubscriptions = await db
    .select({
      id: subscriptionsTable.id,
      nextUpdate: subscriptionsTable.nextUpdate,
      updateCycleNumber: subscriptionsTable.updateCycleNumber,
      updateCycleUnit: subscriptionsTable.updateCycleUnit,
    })
    .from(subscriptionsTable)
    .where(lt(subscriptionsTable.nextUpdate, today));

  for (const subscription of updateSubscriptions) {
    const nextUpdate =
      subscription.updateCycleUnit === timeUnit.month
        ? addMonths(subscription.nextUpdate, subscription.updateCycleNumber)
        : addYears(subscription.nextUpdate, subscription.updateCycleNumber);

    await db
      .update(subscriptionsTable)
      .set({
        nextUpdate: format(nextUpdate, "yyyy-MM-dd", { locale: ja }),
      })
      .where(eq(subscriptionsTable.id, subscription.id));
  }
};

if (require.main === module) {
  updateNextUpdate()
    .then(() => {
      console.log("次回更新日更新プロセスが正常に完了しました");
      process.exit(0);
    })
    .catch((error) => {
      console.error("次回更新日更新プロセスでエラーが発生しました:", error);
      process.exit(1);
    });
}
