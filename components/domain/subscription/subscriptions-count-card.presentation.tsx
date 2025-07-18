import { ReceiptText } from "lucide-react";

import AggregationCard from "../../base/aggregation-card";

export default function SubscriptionsCountCardPresentation({
  count,
}: {
  count: number;
}) {
  return (
    <AggregationCard
      title="サブスクリプション数"
      totalResult={count}
      description="アクティブなサブスクリプションのみ"
    >
      <ReceiptText className="h-4 w-4 text-muted-foreground" />
    </AggregationCard>
  );
}
