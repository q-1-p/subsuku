"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import type { ISubscription } from "@/domain/subscription/subscription";
import { SubscriptionCard } from "./subscription-card";

export default function SubscriptionListPresentation({
  subscriptions,
  isOverView,
}: { subscriptions: ISubscription[]; isOverView: boolean }) {
  const [folding, setFolding] = useState(isOverView);

  return (
    <div className="space-y-4">
      {subscriptions
        .slice(0, folding ? 3 : subscriptions.length)
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
