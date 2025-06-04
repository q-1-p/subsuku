import type { Metadata } from "next";

import { SiteHeader } from "@/components/domain/site/site-header";
import SubscriptionInformationPanel from "@/components/domain/subscription/subscription-information-panel";

export const metadata: Metadata = {
  title: "サブスクリプション詳細 | さぶ空く",
  description:
    "サブスクリプション詳細ページです。サブスクリプションの詳細を確認できます。",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function SubscriptionDetailPage({
  params,
}: { params: Promise<{ id: string }> }) {
  return (
    <>
      <SiteHeader backLink="/app/dashboard" backText="ダッシュボードに戻る" />
      <SubscriptionInformationPanel subscriptionId={(await params).id} />
    </>
  );
}
