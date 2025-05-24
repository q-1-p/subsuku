import type { Metadata } from "next";

import { SiteHeader } from "@/components/domain/site/site-header";
import { SubscriptionEditForm } from "@/components/domain/subscription/subscription-edit-form.container";

export const metadata: Metadata = {
  title: "サブスクリプション編集 | さぶ空く",
  description:
    "サブスクリプション編集ページです。サブスクリプションの詳細を修正できます。",
};

export default async function Page({
  params,
}: { params: Promise<{ id: string }> }) {
  return (
    <>
      <SiteHeader backLink="/app/dashboard" backText="ダッシュボードに戻る" />
      <main className="flex-1 p-6">
        <div className="mx-auto max-w-2xl">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="font-bold text-2xl">サブスクリプションを編集</h1>
              <p className="mt-1 text-muted-foreground text-sm">
                サブスクリプションの詳細を修正してください
              </p>
            </div>
            <SubscriptionEditForm subscriptionId={(await params).id} />
          </div>
        </div>
      </main>
    </>
  );
}
