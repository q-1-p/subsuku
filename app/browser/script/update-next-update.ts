import { addMonths, addYears, format } from "date-fns";
import { eq, lt } from "drizzle-orm";

import { db } from "@/db";
import { subscriptionsTable } from "@/db/schema";
import { timeUnit } from "@/domain/type";

const updateNextUpdate = async () => {
  const today = format(new Date(), "yyyy-MM-dd");
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
        nextUpdate: format(nextUpdate, "yyyy-MM-dd"),
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
