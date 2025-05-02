"use client";

import { addDays, isBefore, startOfDay } from "date-fns";
import { useAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import type { ISubscription } from "@/domain/subscription/subscription";
import { subscriptionsAtom } from "./_lib/jotai";
import SubscriptionCard from "./subscription-card";

export default function SubscriptionListPresentation({
  subscriptions,
  upcoming,
  isOverView,
}: { subscriptions: ISubscription[]; upcoming: boolean; isOverView: boolean }) {
  const today = startOfDay(new Date());
  const upcomingDate = addDays(new Date(), 7);
  const [folding, setFolding] = useState(isOverView);
  useHydrateAtoms([[subscriptionsAtom, subscriptions]]);
  const [subscriptionsCache] = useAtom(subscriptionsAtom);

  return (
    <div className="space-y-4">
      {subscriptionsCache
        .filter((subscription: ISubscription) =>
          upcoming
            ? isBefore(today, subscription.nextUpdate) &&
              isBefore(subscription.nextUpdate, upcomingDate)
            : true,
        )
        .slice(0, folding ? 3 : subscriptionsCache.length)
        .map((subscription: ISubscription) => (
          <SubscriptionCard key={subscription.id} subscription={subscription} />
        ))}
      {isOverView && (
        <Button
          variant="outline"
          className="w-full rounded-xl"
          onClick={() => setFolding(!folding)}
        >
          {folding ? "すべて表示" : "折りたたむ"}
        </Button>
      )}
    </div>
  );
}
