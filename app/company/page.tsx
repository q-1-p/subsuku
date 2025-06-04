import type { Metadata } from "next";

import { SiteHeader } from "@/components/domain/site/site-header";

export const metadata: Metadata = {
  title: "運営者情報 | さぶ空く",
  description:
    "運営者情報ページです。代表者名、プロフィール、メールアドレスなどをご確認いただけます。",
  robots: {
    index: true,
    follow: false,
  },
};

export default function CompanyPage() {
  // 共通のデータ構造を定義
  const companyInfo = [
    {
      id: "representative",
      title: "代表者名",
      content: "仮",
    },
    {
      id: "profile",
      title: "プロフィール",
      content: "さぶ空くの運営をしている個人開発者です。",
    },
    {
      id: "email",
      title: "メールアドレス",
      content: (
        <a
          href="mailto:subsuku.jp+contact@gmail.com"
          className="text-blue-600 hover:underline"
        >
          subsuku.jp+contact@gmail.com
        </a>
      ),
    },
  ];

  return (
    <>
      <SiteHeader />
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <h1 className="mb-8 text-center font-bold text-3xl">運営者情報</h1>

        {/* デスクトップ表示用のテーブル (md以上の画面サイズで表示) */}
        <div className="mb-8 hidden rounded-lg bg-white p-6 shadow-md md:block dark:bg-gray-800">
          <table className="w-full border-collapse">
            <tbody>
              {companyInfo.map((info) => (
                <tr key={info.id} className="border-b dark:border-gray-700">
                  <th className="bg-gray-50 px-6 py-4 text-left font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                    {info.title}
                  </th>
                  <td className="px-6 py-4">{info.content}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* モバイル表示用のカードレイアウト (md未満の画面サイズで表示) */}
        <div className="space-y-4 md:hidden">
          {companyInfo.map((info) => (
            <div
              key={info.id}
              className="rounded-lg bg-white p-4 shadow-md dark:bg-gray-800"
            >
              <h2 className="mb-2 font-semibold text-gray-700 dark:text-gray-200">
                {info.title}
              </h2>
              <div className="text-gray-900 dark:text-gray-100">
                {info.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
