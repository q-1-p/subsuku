import { ArrowRight } from "lucide-react";
import Image from "next/image"; // Add this line

import LoginDialog from "@/components/case/login-dialog";
import BellIcon from "@/components/common/bell-icon";
import CancelIcon from "@/components/common/cancel-icon";
import ClockIcon from "@/components/common/clock-icon";
import FunctionCard from "@/components/common/function-card";
import { SiteHeader } from "@/components/domain/site/site-header";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full bg-gradient-to-b from-secondary/50 to-background py-12 md:py-24 lg:py-32">
          <div className="w-full px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="font-bold text-3xl tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    サブスクを賢く管理
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    サブスクリプションの一覧を円換算で管理し、更新日前にメール通知。解約方法もまとめて確認できます。
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <LoginDialog>
                    <Button size="lg" className="gap-1">
                      無料で始める
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </LoginDialog>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/img/preview.webp"
                  className="w-full rounded-lg border border-gray-400 object-cover"
                  width={550}
                  height={350}
                  alt="サブスク管理アプリのスクリーンショット"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-muted py-12 md:py-24 lg:py-32">
          <div className="w-full px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="font-bold text-3xl tracking-tighter sm:text-4xl md:text-5xl">
                  主な機能
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-ui/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  サブスクリプション管理をシンプルに、そして効率的に。
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              <FunctionCard
                title="円換算での管理"
                description="ドルやユーロなど、様々な通貨のサブスクを円換算で一元管理できます。"
                icon={<ClockIcon />}
              />
              <FunctionCard
                title="更新日の通知"
                description="サブスクの更新日が近づくとメールでお知らせします。不要なサブスクを解約する機会を逃しません。"
                icon={<BellIcon />}
              />
              <FunctionCard
                title="解約方法の表示"
                description="各サービスの解約方法もまとめて表示。面倒な調査は必要ありません。"
                icon={<CancelIcon />}
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
