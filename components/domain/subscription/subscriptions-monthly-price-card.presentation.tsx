import { CreditCard } from "lucide-react";

import { AggregationCard } from "../../base/aggregation-card";

export const SubscriptionsMonthlyPriceCardPresentation = ({
  fee,
}: { fee: number }) => {
  return (
    <AggregationCard
      title="月額合計"
      totalResult={fee.toLocaleString()}
      description="月額サブスクのみ"
    >
      <CreditCard className="h-4 w-4 text-muted-foreground" />
    </AggregationCard>
  );
};
