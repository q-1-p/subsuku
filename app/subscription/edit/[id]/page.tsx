import SiteSubPageHeader from "@/components/domain/site/site-sub-page-header";
import { fetchSubscription } from "@/components/domain/subscription/_functions";
import SubscriptionForm from "@/components/domain/subscription/subscription-form";

export default async function Page({
  params,
}: { params: Promise<{ id: string }> }) {
  const subscription = await fetchSubscription((await params).id);

  return (
    <>
      <SiteSubPageHeader
        backLink="/dashboard"
        backText="ダッシュボードに戻る"
      />
      <main className="flex-1 p-6">
        <div className="mx-auto max-w-2xl">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="font-bold text-2xl">サブスクリプションを編集</h1>
              <p className="mt-1 text-muted-foreground text-sm">
                サブスクリプションの詳細を修正してください
              </p>
            </div>
            <SubscriptionForm subscription={subscription} />
          </div>
        </div>
      </main>
    </>
  );
}
