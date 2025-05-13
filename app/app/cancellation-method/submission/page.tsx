import type { Metadata } from "next";

import { CancellationMethodForm } from "@/components/domain/cancellation-method/cancellation-method-form.container";
import SiteSubPageHeader from "@/components/domain/site/site-sub-page-header";

export const metadata: Metadata = {
  title: "解約方法投稿 | さぶ空く",
  description: "解約方法投稿ページです。解約方法を投稿できます。",
};

export default function Page() {
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
              <h1 className="font-bold text-2xl">解約方法を投稿</h1>
            </div>

            <CancellationMethodForm />
          </div>
        </div>
      </main>
    </>
  );
}
