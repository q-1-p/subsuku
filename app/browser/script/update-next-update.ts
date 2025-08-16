import { SubscriptionRepository } from "@/infrastructure/subscription-repository";

if (require.main === module) {
  new SubscriptionRepository()
    .updateNextUpdate()
    .then(() => {
      console.log("次回更新日更新プロセスが正常に完了しました");
      process.exit(0);
    })
    .catch((error) => {
      console.error("次回更新日更新プロセスでエラーが発生しました:", error);
      process.exit(1);
    });
}
