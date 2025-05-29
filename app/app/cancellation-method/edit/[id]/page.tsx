import type { Metadata } from "next";

import { CancellationMethodEditForm } from "@/components/domain/cancellation-method/cancellation-method-edit-form.container";
import { SiteHeader } from "@/components/domain/site/site-header";

export const metadata: Metadata = {
  title: "解約方法編集 | さぶ空く",
  description: "解約方法編集ページです。解約方法を編集できます。",
};

export default async function Page({
  params,
}: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <>
      <SiteHeader backLink="/cancellation-guide" backText="解約ガイドに戻る" />
      <main className="flex-1 py-6">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col gap-6 px-4">
            <div className="flex items-center justify-between">
              <h1 className="font-bold text-2xl">解約方法を編集</h1>
            </div>
            <CancellationMethodEditForm cancellationMethodId={id} />
          </div>
        </div>
      </main>
    </>
  );
}
