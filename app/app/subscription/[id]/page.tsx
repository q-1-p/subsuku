import SiteSubPageHeader from "@/components/domain/site/site-sub-page-header";
import SubscriptionInformationPanel from "@/components/domain/subscription/subscription-information-panel";

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
