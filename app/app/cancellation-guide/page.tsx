import { Plus } from "lucide-react";
import Link from "next/link";

import CancellationMethodSubmissionPanel from "@/components/domain/cancellation-method/cancellation-method-submission-panel";
import CancellationMethodsPanel from "@/components/domain/cancellation-method/cancellation-methods-panel.container";
import SiteSubPageHeader from "@/components/domain/site/site-sub-page-header";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <>
      <SiteSubPageHeader
        backLink="/app/dashboard"
        backText="ダッシュボードに戻る"
      />
      <main className="flex-1 p-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-2xl">サブスクリプション解約ガイド</h1>
            <Link href="/cancellation-guide/submit">
              <Button className="rounded-xl">
                <Plus className="mr-2 h-4 w-4" />
                解約方法を投稿
              </Button>
            </Link>
          </div>

          <CancellationMethodsPanel />
          <CancellationMethodSubmissionPanel />
        </div>
      </main>
    </>
  );
}
