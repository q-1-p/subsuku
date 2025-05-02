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
import { subscriptionsAtom } from "../subscription/jotai";
import { linkCancellationMethod } from "./_lib/actions";

export function CancellationMethodLinkIcon({
  cancellationMethodId,
}: {
  cancellationMethodId: string;
}) {
  const subscriptions = useAtomValue(subscriptionsAtom);
  const form = useForm({
    defaultValues: {
      subscriptionId: subscriptions.at(0)?.id ?? "",
    },
  });

  const link = () => {
    const formData = new FormData();
    formData.append("cancellationMethodId", cancellationMethodId);
    formData.append("subscriptionId", form.state.values.subscriptionId);

    linkCancellationMethod(formData).then((success) => {
      if (success) {
        window.location.href = `/app/subscription/${form.state.values.subscriptionId}`;
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <LinkIcon className="h-4 w-4 hover:cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>解約方法を結びつける</DialogTitle>
          <DialogDescription>
            どのサブスクリプションに結びつけるか選択してください
          </DialogDescription>
        </DialogHeader>
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
        <DialogFooter>
          <Button type="button" onClick={link}>
            結びつける
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
