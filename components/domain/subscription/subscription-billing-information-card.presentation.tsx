import { formatDate } from "date-fns";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { ISubscription } from "@/domain/subscription/subscription";
import { currencyId, timeUnit } from "@/domain/type";

const currencyCodes = {
  [currencyId.jpy]: "JPY",
  [currencyId.cny]: "CNY",
  [currencyId.gbp]: "GBP",
  [currencyId.usd]: "USD",
  [currencyId.eur]: "EUR",
  [currencyId.btc]: "BTC",
} as const;

const currencyIcons = {
  [currencyId.jpy]: "¥",
  [currencyId.cny]: "¥",
  [currencyId.gbp]: "£",
  [currencyId.usd]: "$",
  [currencyId.eur]: "€",
  [currencyId.btc]: "₿",
} as const;

export default function SubscriptionBillingInformationCardPresentation({
  subscription,
}: { subscription: ISubscription }) {
  return (
    <>
      <Card className="overflow-hidden rounded-2xl border shadow-sm">
        <CardHeader>
          <CardTitle>請求情報</CardTitle>
          <CardDescription>料金と支払いサイクルの詳細</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-muted-foreground text-sm">
                料金
              </h3>
              <p className="font-bold text-xl">
                {`${currencyIcons[subscription.currencyId]}${subscription.amount.toLocaleString()}`}
              </p>
            </div>
            <div>
              <h3 className="font-medium text-muted-foreground text-sm">
                通貨
              </h3>
              <p className="text-base">
                {currencyCodes[subscription.currencyId]}
              </p>
            </div>
            <div>
              <h3 className="font-medium text-muted-foreground text-sm">
                請求サイクル
              </h3>
              <p className="text-base">
                {subscription.intervalId === timeUnit.month ? "月毎" : "年毎"}
              </p>
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-3 gap-4 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-muted-foreground text-sm">
                月額コスト
              </h3>
              <p className="font-bold text-xl">
                ¥
                {(subscription.intervalId === timeUnit.month
                  ? subscription.amount
                  : subscription.amount / 12
                ).toLocaleString()}
              </p>
            </div>
            <div>
              <h3 className="font-medium text-muted-foreground text-sm">
                年間コスト
              </h3>
              <p className="font-bold text-xl">
                ¥
                {(subscription.intervalId === timeUnit.month
                  ? subscription.amount * 12
                  : subscription.amount
                ).toLocaleString()}
              </p>
            </div>
            <div>
              <h3 className="font-medium text-muted-foreground text-sm">
                次回請求日
              </h3>
              <p className="text-base">
                {formatDate(subscription.nextUpdate, "yyyy/MM/dd")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
