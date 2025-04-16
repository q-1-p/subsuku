import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SubscriptionList from "./subscription-list.container";

export default function SubscriptionsToBeUpdatePanel({
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
        <CardTitle>近日更新予定</CardTitle>
        <CardDescription>7日以内に更新予定のサブスク</CardDescription>
      </CardHeader>
      <CardContent>
        <SubscriptionList upcoming={true} isOverView={isOverView} />
      </CardContent>
    </Card>
  );
}
