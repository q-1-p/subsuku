import { Pencil } from "lucide-react";
import Link from "next/link";

import SubscriptionBillingInformationCardPresentation from "@/components/domain/subscription/subscription-billing-information-card-presentation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchSubscription } from "./_functions";
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
                <Button variant="outline" size="icon">
                  <Link href={`/subscription/edit/${subscription.id}`}>
                    <Pencil className="h-4 w-4" />
                  </Link>
                </Button>
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
                {/* <Card className="overflow-hidden rounded-2xl border shadow-sm">
                <CardHeader>
                  <CardTitle>解約方法</CardTitle>
                  <CardDescription>
                    {subscription.name}を解約する手順
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ol className="my-4 list-decimal space-y-3 pl-5">
                    {subscription.cancelInstructions.map((step, index) => (
                      <li
                        key={0}
                        className="rounded-xl bg-secondary/30 p-3 text-base"
                      >
                        {step}
                      </li>
                    ))}
                  </ol>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                  <Button className="w-full" asChild>
                    <a
                      href={subscription.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      サービスサイトに移動
                    </a>
                  </Button>
                  <p className="text-center text-muted-foreground text-xs">
                    解約手順は変更される場合があります。最新情報は公式サイトでご確認ください。
                  </p>
                </CardFooter>
              </Card> */}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </>
  );
}
