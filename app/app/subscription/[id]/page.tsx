import type { Metadata } from "next";

import SiteSubPageHeader from "@/components/domain/site/site-sub-page-header";
import SubscriptionInformationPanel from "@/components/domain/subscription/subscription-information-panel";

export const metadata: Metadata = {
  title: "サブスクリプション詳細 | さぶ空く",
  description:
    "サブスクリプション詳細ページです。サブスクリプションの詳細を確認できます。",
};

export default async function SubscriptionDetailPage({
  params,
}: { params: Promise<{ id: string }> }) {
  return (
    <>
      <SiteSubPageHeader
        backLink="/app/dashboard"
        backText="ダッシュボードに戻る"
      />
      <SubscriptionInformationPanel subscriptionId={(await params).id} />
    </>
  );
}
