import { CreditCard } from "lucide-react";

import AggregationCard from "../../base/aggregation-card";

export default function SubscriptionsMonthlyFeeCardPresentation({
  fee,
}: { fee: number }) {
  return (
    <AggregationCard
      title="月間コスト"
      totalResult={`¥${Math.round(fee).toLocaleString()}`}
      description="今後1ヶ月間の支払い金額"
    >
      <CreditCard className="h-4 w-4 text-muted-foreground" />
    </AggregationCard>
  );
}
