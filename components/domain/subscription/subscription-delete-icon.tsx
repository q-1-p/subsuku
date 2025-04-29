"use client";

import { Trash2 } from "lucide-react";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { deleteSubscription } from "./actions";
import { subscriptionsAtom } from "./jotai";

export default function SubscriptionDeleteIcon({
  subscriptionId,
}: { subscriptionId: string }) {
  const [subscriptions, setSubscriptions] = useAtom(subscriptionsAtom);
  const handleDelete = async () => {
    const formData = new FormData();
    formData.append("subscriptionId", subscriptionId);

    if (await deleteSubscription(formData)) {
      setSubscriptions(subscriptions.filter((s) => s.id !== subscriptionId));
      alert("登録されたサブスクを削除しました");
      redirect("/app/dashboard");
    }
  };

  return (
    <Button variant="destructive" size="icon" onClick={handleDelete}>
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}
