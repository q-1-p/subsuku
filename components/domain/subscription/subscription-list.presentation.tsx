"use client";

import { useState } from "react";
import { addDays, isBefore, startOfDay } from "date-fns";
import { useAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";

import { subscriptionsAtom } from "./_lib/jotai";
import SubscriptionSummaryCard from "./subscription-summary-card";

import { Button } from "@/components/ui/button";

import type { SubscriptionDetail } from "@/domain/type";

export default function SubscriptionListPresentation({
  subscriptions,
  upcoming,
  isOverView,
}: {
  subscriptions: SubscriptionDetail[];
  upcoming: boolean;
  isOverView: boolean;
}) {
  const today = startOfDay(new Date());
  const upcomingDate = addDays(new Date(), 7);
  const [folding, setFolding] = useState(isOverView);
  useHydrateAtoms([[subscriptionsAtom, subscriptions]]);
  const [subscriptionsCache] = useAtom(subscriptionsAtom);

  return (
    <div className="space-y-4">
      {subscriptionsCache
        .filter((subscription: SubscriptionDetail) =>
          upcoming
            ? isBefore(today, subscription.nextUpdate) &&
              isBefore(subscription.nextUpdate, upcomingDate)
            : true,
        )
        .slice(0, folding ? 3 : subscriptionsCache.length)
        .map((subscription: SubscriptionDetail) => (
          <SubscriptionSummaryCard
            key={subscription.id}
            subscription={subscription}
          />
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
