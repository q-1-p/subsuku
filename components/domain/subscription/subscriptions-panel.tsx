import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SubscriptionList from "./subscription-list.container";

export function SubscriptionsPanel({
  upcoming,
  isOverView,
  className,
}: {
  upcoming: boolean;
  isOverView: boolean;
  className?: string;
}) {
  return (
    <Card
      className={`overflow-hidden rounded-2xl border shadow-sm transition-shadow duration-200 hover:shadow ${className}`}
    >
      <CardHeader>
        <CardTitle>{upcoming ? "近日更新予定" : "サブスク一覧"}</CardTitle>
        <CardDescription>
          {upcoming
            ? "7日以内に更新予定のサブスク"
            : "アクティブなサブスクリプションの一覧"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SubscriptionList upcoming={upcoming} isOverView={isOverView} />
      </CardContent>
    </Card>
  );
}
