import { Pencil } from "lucide-react";
import Link from "next/link";

import SubscriptionBillingInformationCardPresentation from "@/components/domain/subscription/subscription-billing-information-card.presentation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CancellationMethodDetailCardContainer } from "../cancellation-method/cancellation-method-detail-card.container";
import { fetchSubscription } from "./_lib/fetcher";
import SubscriptionDeleteIcon from "./subscription-delete-icon";

export default async function SubscriptionInformationPanel({
  subscriptionId,
}: {
  subscriptionId: string;
}) {
  const subscription = await fetchSubscription(subscriptionId);

  return (
    <>
      <main className="flex-1 p-6">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={
                    "flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 font-bold text-white text-xl"
                  }
                >
                  {subscription.name[0]}
                </div>
                <div>
                  <h1 className="font-bold text-2xl">{subscription.name}</h1>
                </div>
              </div>
              <div className="flex gap-2">
                <Link href={`/app/subscription/edit/${subscription.id}`}>
                  <Button variant="outline" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </Link>
                <SubscriptionDeleteIcon subscriptionId={subscription.id} />
              </div>
            </div>

            <Tabs defaultValue="billing">
              <TabsList className="grid w-full grid-cols-2 rounded-xl bg-secondary/50 p-1">
                <TabsTrigger
                  value="billing"
                  className="rounded-lg data-[state=active]:bg-white"
                >
                  請求情報
                </TabsTrigger>
                <TabsTrigger
                  value="cancel"
                  className="rounded-lg data-[state=active]:bg-white"
                >
                  解約方法
                </TabsTrigger>
              </TabsList>
              <TabsContent value="billing">
                <SubscriptionBillingInformationCardPresentation
                  subscription={subscription}
                />
              </TabsContent>
              <TabsContent value="cancel">
                <CancellationMethodDetailCardContainer
                  cancellationMethodId={subscription.linkCancellationMethodId}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </>
  );
}
