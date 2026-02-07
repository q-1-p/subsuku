import SubscriptionList from "./subscription-list.container";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SubscriptionsPanel({
  isOverView,
  className,
}: {
  isOverView: boolean;
  className?: string;
}) {
  return (
    <Card
      className={`overflow-hidden rounded-2xl border shadow-sm transition-shadow duration-200 hover:shadow ${className}`}
    >
      <CardHeader>
        <CardTitle>サブスク一覧</CardTitle>
        <CardDescription>アクティブなサブスクの一覧</CardDescription>
      </CardHeader>
      <CardContent>
        <SubscriptionList upcoming={false} isOverView={isOverView} />
      </CardContent>
    </Card>
  );
}
