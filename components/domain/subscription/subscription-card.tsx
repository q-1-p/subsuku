"use client";

import { useAtom } from "jotai";
import { Bell, Settings, Trash2 } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { intervalId } from "@/domain/interval/interval-id";
import type { ISubscription } from "@/domain/subscription/subscription";
import { deleteSubscription } from "./actions";
import { subscriptionsAtom } from "./jotai";

export default function SubscriptionCard({
  subscription,
}: { subscription: ISubscription }) {
  const [subscriptions, setSubscriptions] = useAtom(subscriptionsAtom);

  const handleDelete = async () => {
    const formData = new FormData();
    formData.append("subscriptionId", subscription.id);

    if (await deleteSubscription(formData)) {
      setSubscriptions(subscriptions.filter((s) => s.id !== subscription.id));
    }
  };

  return (
    <form className="flex items-center">
      <div
        className={
          "flex h-9 w-9 items-center justify-center rounded-full bg-green-600 text-white"
        }
      >
        {subscription.name[0]}
      </div>
      <div className="ml-4 space-y-1">
        <p className="font-medium text-sm leading-none">
          <Link
            href={`/app/subscription/${subscription.id}`}
            className="hover:underline"
          >
            {subscription.name}
          </Link>
        </p>
        <p className="text-muted-foreground text-sm">
          {subscription.intervalId === intervalId.yearly ? "年額" : "月額"} ¥
          {subscription.amount.toLocaleString()}
        </p>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <div className="font-medium text-sm">
          {new Date(subscription.nextUpdate).toLocaleDateString("ja-JP")}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
              <Settings className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/app/subscription/edit/${subscription.id}`}>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>編集</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem>
              <Bell className="mr-2 h-4 w-4" />
              <span>通知設定</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => handleDelete()}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              <span>削除</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </form>
  );
}
