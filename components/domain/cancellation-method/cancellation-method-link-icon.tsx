import { useForm } from "@tanstack/react-form";
import { useAtomValue } from "jotai";
import { LinkIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useActionState, useEffect } from "react";
import { subscriptionsAtom } from "../subscription/_lib/jotai";
import { linkCancellationMethod } from "./_lib/actions";

export function CancellationMethodLinkIcon({
  cancellationMethodId,
}: {
  cancellationMethodId: string;
}) {
  const [result, action] = useActionState(linkCancellationMethod, false);
  const subscriptions = useAtomValue(subscriptionsAtom);
  const form = useForm({
    defaultValues: {
      subscriptionId: subscriptions.at(0)?.id ?? "",
    },
  });

  useEffect(() => {
    if (result) {
      window.location.href = `/app/subscription/${form.state.values.subscriptionId}`;
    }
  }, [result, form.state.values.subscriptionId]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <LinkIcon className="h-4 w-4 hover:cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={action as never}>
          <input
            type="hidden"
            name="cancellationMethodId"
            value={cancellationMethodId}
          />
          <DialogHeader>
            <DialogTitle>解約方法を結びつける</DialogTitle>
            <DialogDescription>
              どのサブスクリプションに結びつけるか選択してください
            </DialogDescription>
          </DialogHeader>
          <div className="py-2">
            <form.Field name="subscriptionId">
              {(field) => (
                <Select
                  name="subscriptionId"
                  onValueChange={(e) => field.handleChange(e)}
                >
                  <SelectTrigger className="w-full flex-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {subscriptions?.map((subscription) => (
                      <SelectItem key={subscription.id} value={subscription.id}>
                        {subscription.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </form.Field>
          </div>
          <DialogFooter className="">
            <Button type="submit">結びつける</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
