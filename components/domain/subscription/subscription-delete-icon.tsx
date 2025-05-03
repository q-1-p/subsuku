"use client";

import { useAtom } from "jotai";
import { Trash2 } from "lucide-react";
import { redirect } from "next/navigation";
import { useActionState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { deleteSubscription } from "./_lib/actions";
import { subscriptionsAtom } from "./_lib/jotai";

export default function SubscriptionDeleteIcon({
  subscriptionId,
}: { subscriptionId: string }) {
  const [result, action] = useActionState<boolean, FormData>(
    deleteSubscription,
    false,
  );
  const [subscriptions, setSubscriptions] = useAtom(subscriptionsAtom);

  useEffect(() => {
    if (result) {
      setSubscriptions(subscriptions.filter((s) => s.id !== subscriptionId));
      alert("登録されたサブスクを削除しました");
      redirect("/app/dashboard");
    }
  }, [result, subscriptionId, subscriptions, setSubscriptions]);

  return (
    <form action={action as never}>
      <input type="hidden" name="subscriptionId" value={subscriptionId} />
      <Button type="submit" variant="destructive" size="icon">
        <Trash2 className="h-4 w-4" />
      </Button>
    </form>
  );
}
