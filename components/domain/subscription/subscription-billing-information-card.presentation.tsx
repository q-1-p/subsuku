import { formatDate } from "date-fns";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  currencyId,
  monthlyCost,
  type SubscriptionDetail,
  timeUnit,
  yearlyCost,
} from "@/domain/type";

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
}: {
  subscription: SubscriptionDetail;
}) {
  return (
    <Card className="overflow-hidden rounded-2xl border shadow-sm">
      <CardHeader>
        <CardTitle>請求情報</CardTitle>
        <CardDescription>料金と支払いサイクルの詳細</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4 md:grid-cols-3">
          <div>
            <h3 className="font-medium text-muted-foreground text-sm">料金</h3>
            <p className="font-bold text-xl">
              {`${currencyIcons[subscription.currencyId]}${subscription.amount.toLocaleString()}`}
            </p>
          </div>
          <div>
            <h3 className="font-medium text-muted-foreground text-sm">通貨</h3>
            <p className="text-base">
              {currencyCodes[subscription.currencyId]}
            </p>
          </div>
          <div>
            <h3 className="font-medium text-muted-foreground text-sm">
              請求サイクル
            </h3>
            <p className="text-base">
              {subscription.updateCycle.number}
              {(() => {
                switch (subscription.updateCycle.unit) {
                  case timeUnit.day:
                    return "日";
                  case timeUnit.month:
                    return "ヶ月";
                  case timeUnit.year:
                    return "年";
                }
              })()}
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
              ¥{monthlyCost(subscription).toLocaleString()}
            </p>
          </div>
          <div>
            <h3 className="font-medium text-muted-foreground text-sm">
              年間コスト
            </h3>
            <p className="font-bold text-xl">
              ¥{yearlyCost(subscription).toLocaleString()}
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
  );
}
