import { CancellationMethodForm } from "@/components/domain/cancellation-method/cancellation-method-form.container";
import SiteSubPageHeader from "@/components/domain/site/site-sub-page-header";

export default async function Page({
  params,
}: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <>
      <SiteSubPageHeader
        backLink="/app/cancellation-guide"
        backText="解約ガイドに戻る"
      />
      <main className="container flex-1 py-6">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h1 className="font-bold text-2xl">解約方法を編集</h1>
            </div>

            <CancellationMethodForm cancellationMethodId={id} />
          </div>
        </div>
      </main>
    </>
  );
}
