import { SignedIn } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { CancellationMethodListPanel } from "@/components/domain/cancellation-method/cancellation-method-list-panel.container";
import CancellationMethodSubmissionPanel from "@/components/domain/cancellation-method/cancellation-method-submission-panel";
import { SiteHeader } from "@/components/domain/site/site-header";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "サブスクリプション解約ガイド | さぶ空く",
  description:
    "サブスクリプション解約ガイドページです。解約方法を検索したり、サブスクリプションに解約方法を結びつけたりできます。",
  robots: {
    index: true,
    follow: false,
  },
};

export default function Page() {
  return (
    <>
      <SiteHeader backLink="/app/dashboard" backText="ダッシュボードに戻る" />
      <main className="flex-1 p-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <h1 className="font-bold text-2xl">サブスクリプション解約ガイド</h1>
            <SignedIn>
              <Link href="/app/cancellation-method/submission">
                <Button className="rounded-xl">
                  <Plus className="mr-2 h-4 w-4" />
                  解約方法を投稿
                </Button>
              </Link>
            </SignedIn>
          </div>

          <CancellationMethodListPanel />
          <CancellationMethodSubmissionPanel />
        </div>
      </main>
    </>
  );
}
