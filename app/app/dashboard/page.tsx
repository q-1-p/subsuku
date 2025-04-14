import { List, Plus } from "lucide-react";
import Link from "next/link";

import { SubscriptionsCountCard } from "@/components/domain/subscription/subscriptions-count-card.container";
import { SubscriptionsMonthlyPriceCard } from "@/components/domain/subscription/subscriptions-monthly-price-card.container";
import { SubscriptionsMonthlyTotalPriceCard } from "@/components/domain/subscription/subscriptions-monthly-total-price-card.container";
import { SubscriptionsPanel } from "@/components/domain/subscription/subscriptions-panel";
import { SubscriptionsYearlyPriceCard } from "@/components/domain/subscription/subscriptions-yearly-price-card.container";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardPage() {
  return (
    <main className="w-full flex-1 px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-2xl">ダッシュボード</h1>
          <div className="flex gap-2">
            <Link href="/subscriptions">
              <Button variant="outline">
                <List className="mr-2 h-4 w-4" />
                一覧表示
              </Button>
            </Link>
            <Link href="/add-subscription">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                サブスクを追加
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <SubscriptionsMonthlyPriceCard />
          <SubscriptionsYearlyPriceCard />
          <SubscriptionsMonthlyTotalPriceCard />
          <SubscriptionsCountCard />
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 rounded-xl bg-secondary/50 p-1 md:w-auto">
            <TabsTrigger
              value="overview"
              className="rounded-lg data-[state=active]:bg-white"
            >
              概要
            </TabsTrigger>
            <TabsTrigger
              value="all"
              className="rounded-lg data-[state=active]:bg-white"
            >
              すべてのサブスク
            </TabsTrigger>
            <TabsTrigger
              value="upcoming"
              className="rounded-lg data-[state=active]:bg-white"
            >
              更新予定
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <SubscriptionsPanel
                className="lg:col-span-4"
                upcoming={false}
                isOverView={true}
              />
              <SubscriptionsPanel
                className="lg:col-span-3"
                upcoming={true}
                isOverView={true}
              />
            </div>
          </TabsContent>
          <TabsContent value="all">
            <SubscriptionsPanel upcoming={false} isOverView={false} />
          </TabsContent>
          <TabsContent value="upcoming">
            <SubscriptionsPanel upcoming={true} isOverView={false} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
