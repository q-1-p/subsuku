import { CreditCard } from "lucide-react";

import AggregationCard from "../../base/aggregation-card";

export default function SubscriptionsYearlyPriceCardPresentation({
  fee,
}: { fee: number }) {
  return (
    <AggregationCard
      title="年額（月換算）"
      totalResult={`¥${Math.round(fee).toLocaleString()}`}
      description="年間サブスクを月額換算"
    >
      <CreditCard className="h-4 w-4 text-muted-foreground" />
    </AggregationCard>
  );
}
