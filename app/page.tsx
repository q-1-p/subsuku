import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold">さぶ空く</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <nav className="flex items-center space-x-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  ログイン
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">登録</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-secondary/50 to-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    サブスクを賢く管理
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    サブスクリプションの一覧を円換算で管理し、更新日前にメール通知。解約方法もワンクリックで確認できます。
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/register">
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
              <div className="flex items-center justify-center">
                <div className="relative w-full h-[450px] bg-muted rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    <div className="space-y-4 p-6">
                      <div className="h-24 w-full rounded-lg bg-muted-foreground/20"></div>
                      <div className="space-y-2">
                        <div className="h-4 w-full rounded-lg bg-muted-foreground/20"></div>
                        <div className="h-4 w-[80%] rounded-lg bg-muted-foreground/20"></div>
                        <div className="h-4 w-[90%] rounded-lg bg-muted-foreground/20"></div>
                      </div>
                      <div className="flex gap-2">
                        <div className="h-8 w-24 rounded-lg bg-muted-foreground/20"></div>
                        <div className="h-8 w-24 rounded-lg bg-muted-foreground/20"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">主な機能</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  サブスクリプション管理をシンプルに、そして効率的に。
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-2xl border p-6 shadow-sm bg-white/80 hover:bg-white transition-colors duration-200">
                <div className="rounded-full bg-primary/20 text-primary p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">円換算での管理</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  ドルやユーロなど、様々な通貨のサブスクを円換算で一元管理できます。
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-2xl border p-6 shadow-sm bg-white/80 hover:bg-white transition-colors duration-200">
                <div className="rounded-full bg-primary/20 text-primary p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">更新日の通知</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  サブスクの更新日が近づくとメールでお知らせします。不要なサブスクを解約する機会を逃しません。
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-2xl border p-6 shadow-sm bg-white/80 hover:bg-white transition-colors duration-200">
                <div className="rounded-full bg-primary/20 text-primary p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">解約方法の表示</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  各サービスの解約方法をワンクリックで確認。面倒な調査は必要ありません。
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            © 2024 さぶ空く（仮）. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-gray-500 hover:underline dark:text-gray-400">
              利用規約
            </Link>
            <Link href="/privacy" className="text-sm text-gray-500 hover:underline dark:text-gray-400">
              プライバシーポリシー
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

