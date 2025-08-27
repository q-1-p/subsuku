import { SiteHeader } from "@/components/domain/site/site-header";
import { SubscriptionEditForm } from "@/components/domain/subscription/subscription-edit-form.container";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "サブスクリプション追加 | さぶ空く",
  description:
    "サブスクリプション追加ページです。新しいサブスクリプションの詳細を入力できます。",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return (
    <>
      <SiteHeader backLink="/app/dashboard" backText="ダッシュボードに戻る" />
      <main className="flex-1 p-6">
        <div className="mx-auto max-w-2xl">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="font-bold text-2xl">サブスクリプションを追加</h1>
              <p className="mt-1 text-muted-foreground text-sm">
                新しいサブスクリプションの詳細を入力してください
              </p>
            </div>
            <SubscriptionEditForm />
          </div>
        </div>
      </main>
    </>
  );
}
