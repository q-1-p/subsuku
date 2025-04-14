import type { ISubscription } from "@/domain/subscription/subscription";
import SubscriptionListPresentation from "./subscription-list.presentation";

export default async function SubscriptionList({
  upcoming,
  isOverView,
}: {
  upcoming: boolean;
  isOverView: boolean;
}) {
  // ダミーデータを入れて
  const subscriptions: ISubscription[] = [
    {
      id: "1",
      name: "Netflix",
      active: true,
      fee: 1490,
      currency: 1,
      nextUpdate: new Date("2024-08-15"),
      intervalCycle: 1,
      intervalUnit: 1,
    },
    {
      id: "2",
      name: "Spotify",
      active: true,
      fee: 980,
      currency: 1,
      nextUpdate: new Date("2024-07-30"),
      intervalCycle: 1,
      intervalUnit: 1,
    },
    {
      id: "3",
      name: "Amazon Prime",
      active: true,
      fee: 4900,
      currency: 1,
      nextUpdate: new Date("2024-12-01"),
      intervalCycle: 1,
      intervalUnit: 1,
    },
  ];

  return (
    <SubscriptionListPresentation
      subscriptions={upcoming ? subscriptions : subscriptions}
      isOverView={isOverView}
    />
  );
}
