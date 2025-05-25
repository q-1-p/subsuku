import { CreditCard } from "lucide-react";

import AggregationCard from "../../base/aggregation-card";

export default function SubscriptionsMonthlyTotalFeeCardPresentation({
  fee,
}: { fee: number }) {
  return (
    <AggregationCard
      title="登録金額"
      totalResult={`¥${Math.round(fee).toLocaleString()}`}
      description="登録されているサブスクリプションの総額"
    >
      <CreditCard className="h-4 w-4 text-muted-foreground" />
    </AggregationCard>
  );
}
