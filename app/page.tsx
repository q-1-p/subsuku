import { ArrowRight } from "lucide-react";
import Link from "next/link";

import Header from "@/components/base/header";
import BellIcon from "@/components/common/bell-icon";
import CancelIcon from "@/components/common/cancel-icon";
import ClockIcon from "@/components/common/clock-icon";
import FunctionCard from "@/components/common/function-card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <Header>
        <Link href="/app/dashboard">
          <Button size="sm">ログイン</Button>
        </Link>
      </Header>
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
                    サブスクリプションの一覧を円換算で管理し、更新日前にメール通知。解約方法もワンクリックで確認できます。
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/app/dashboard">
                    <Button size="lg" className="gap-1">
                      無料で始める
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/features">
                    <Button size="lg" variant="outline">
                      機能を見る
                    </Button>
                  </Link>
                </div>
              </div>
              {/* ToDo あとで画像を入れる */}
              <div className="flex items-center justify-center">
                <div className="relative h-[450px] w-full overflow-hidden rounded-lg bg-muted">
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    <div className="space-y-4 p-6">
                      <div className="h-24 w-full rounded-lg bg-muted-foreground/20" />
                      <div className="space-y-2">
                        <div className="h-4 w-full rounded-lg bg-muted-foreground/20" />
                        <div className="h-4 w-[80%] rounded-lg bg-muted-foreground/20" />
                        <div className="h-4 w-[90%] rounded-lg bg-muted-foreground/20" />
                      </div>
                      <div className="flex gap-2">
                        <div className="h-8 w-24 rounded-lg bg-muted-foreground/20" />
                        <div className="h-8 w-24 rounded-lg bg-muted-foreground/20" />
                      </div>
                    </div>
                  </div>
                </div>
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
                description="各サービスの解約方法をワンクリックで確認。面倒な調査は必要ありません。"
                icon={<CancelIcon />}
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
