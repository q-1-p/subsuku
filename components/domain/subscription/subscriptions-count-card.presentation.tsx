import { CreditCard } from "lucide-react";

import { AggregationCard } from "../../base/aggregation-card";

export const SubscriptionsCountCardPresentation = ({
  count,
}: { count: number }) => {
  return (
    <AggregationCard
      title="サブスク数"
      totalResult={count}
      description="アクティブなサブスク"
    >
      <CreditCard className="h-4 w-4 text-muted-foreground" />
    </AggregationCard>
  );
};
