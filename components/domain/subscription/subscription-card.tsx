"use client";

import { useSetAtom } from "jotai";
import { EditIcon, Settings, Trash2 } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";

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
import { deleteSubscription } from "./_lib/actions";
import { subscriptionsAtom } from "./_lib/jotai";

export default function SubscriptionCard({
  subscription,
}: { subscription: ISubscription }) {
  const [_, action] = useActionState(async (_: unknown, formData: FormData) => {
    if (await deleteSubscription(_, formData)) {
      setSubscriptions((prev) => prev.filter((s) => s.id !== subscription.id));
    }
  }, {});
  const setSubscriptions = useSetAtom(subscriptionsAtom);

  return (
    <div className="flex items-center">
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
          {Math.round(subscription.fee).toLocaleString()}
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
                <EditIcon className="mr-2 h-4 w-4" />
                <span>編集</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="py-0 text-destructive">
              <form action={action as never}>
                <input
                  type="hidden"
                  name="subscriptionId"
                  value={subscription.id}
                />
                <Button type="submit" variant="ghost" className="m-0 p-0">
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>削除</span>
                </Button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
