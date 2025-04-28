import { CurrencyRepository } from "@/infrastructure/currency-repository";

if (require.main === module) {
  new CurrencyRepository()
    .update()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("シードプロセスでエラーが発生しました:", error);
      process.exit(1);
    });
}
