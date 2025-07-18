import { FileText, Plus } from "lucide-react";
import Link from "next/link";

import { SiteHeader } from "@/components/domain/site/site-header";
import SubscriptionsCountCard from "@/components/domain/subscription/subscriptions-count-card.container";
import SubscriptionsMonthlyFeeCard from "@/components/domain/subscription/subscriptions-monthly-fee-card.container";
import SubscriptionsMonthlyTotalFeeCard from "@/components/domain/subscription/subscriptions-monthly-total-fee-card.container";
import SubscriptionsPanel from "@/components/domain/subscription/subscriptions-panel";
import SubscriptionsToBeUpdatePanel from "@/components/domain/subscription/subscriptions-to-be-update-panel";
import SubscriptionsYearlyFeeCard from "@/components/domain/subscription/subscriptions-yearly-fee-card.container";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ダッシュボード | さぶ空く",
  description:
    "ダッシュボードページです。サブスクリプション情報の確認などができます。",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardPage() {
  return (
    <>
      <SiteHeader />
      <main className="w-full flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <h1 className="font-bold text-2xl">ダッシュボード</h1>
            <div className="flex gap-2">
              <Link href="/cancellation-guide">
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  解約ガイド
                </Button>
              </Link>
              <Link href="/app/subscription/add">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  サブスクを追加
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <SubscriptionsMonthlyFeeCard />
            <SubscriptionsYearlyFeeCard />
            <SubscriptionsMonthlyTotalFeeCard />
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
                  isOverView={true}
                />
                <SubscriptionsToBeUpdatePanel
                  className="lg:col-span-3"
                  isOverView={true}
                />
              </div>
            </TabsContent>
            <TabsContent value="all">
              <SubscriptionsPanel isOverView={false} />
            </TabsContent>
            <TabsContent value="upcoming">
              <SubscriptionsToBeUpdatePanel isOverView={false} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  );
}
