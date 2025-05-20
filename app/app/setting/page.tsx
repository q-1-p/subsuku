import { SiteHeader } from "@/components/domain/site/site-header";
import { UserSettingBoard } from "@/components/domain/user/user-setting-board";

export default function SettingPage() {
  return (
    <>
      <SiteHeader backLink="/app/dashboard" backText="ダッシュボードに戻る" />
      <main className="flex-1 p-6">
        <div className="mx-auto max-w-2xl">
          <div className="flex flex-col gap-6">
            <h1 className="font-bold text-2xl">設定</h1>
            <UserSettingBoard />
          </div>
        </div>
      </main>
    </>
  );
}
