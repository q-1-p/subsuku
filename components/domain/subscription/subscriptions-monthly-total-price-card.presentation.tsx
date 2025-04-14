import { CreditCard } from "lucide-react";

import { AggregationCard } from "../../base/aggregation-card";

export const SubscriptionsMonthlyTotalPriceCardPresentation = ({
  fee,
}: { fee: number }) => {
  return (
    <AggregationCard
      title="総月額"
      totalResult={fee.toLocaleString()}
      description="すべてのサブスクを含む"
    >
      <CreditCard className="h-4 w-4 text-muted-foreground" />
    </AggregationCard>
  );
};
