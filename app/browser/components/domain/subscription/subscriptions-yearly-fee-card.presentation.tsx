import { CreditCard } from "lucide-react";

import AggregationCard from "../../base/aggregation-card";

export default function SubscriptionsYearlyFeeCardPresentation({
  fee,
}: {
  fee: number;
}) {
  return (
    <AggregationCard
      title="年間コスト"
      totalResult={`¥${Math.round(fee).toLocaleString()}`}
      description="今後1年間の支払い金額"
    >
      <CreditCard className="h-4 w-4 text-muted-foreground" />
    </AggregationCard>
  );
}
