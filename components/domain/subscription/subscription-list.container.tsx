import type { ISubscription } from "@/domain/subscription/subscription";
import { currentUser } from "@clerk/nextjs/server";
import SubscriptionListPresentation from "./subscription-list.presentation";

export default async function SubscriptionList({
  upcoming,
  isOverView,
}: {
  upcoming: boolean;
  isOverView: boolean;
}) {
  const clerkUser = await currentUser();
  const subscriptions: ISubscription[] = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/subscriptions?clerkUserid=${clerkUser?.id}&active=true&upcoming=${upcoming}`,
    {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      method: "GET",
    },
  )
    .then((res) => res.json())
    .then((data) => data as ISubscription[])
    .catch((error) => {
      console.error("Error fetching subscriptions:", error);
      return [];
    });

  return (
    <SubscriptionListPresentation
      subscriptions={upcoming ? subscriptions : subscriptions}
      isOverView={isOverView}
    />
  );
}
