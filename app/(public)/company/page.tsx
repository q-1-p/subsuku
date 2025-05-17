import type { Metadata } from "next";

import SitePublicHeader from "@/components/domain/site/site-public-header";

export const metadata: Metadata = {
  title: "運営者情報 | さぶ空く",
  description:
    "運営者情報ページです。代表者名、プロフィール、メールアドレスなどをご確認いただけます。",
};

const handleName = process.env.HANDLE_NAME || "";

export default function CompanyPage() {
  return (
    <>
      <SitePublicHeader />
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <h1 className="mb-8 text-center font-bold text-3xl">運営者情報</h1>

        {/* デスクトップ表示用のテーブル (md以上の画面サイズで表示) */}
        <div className="mb-8 hidden rounded-lg bg-white p-6 shadow-md md:block dark:bg-gray-800">
          <table className="w-full border-collapse">
            <tbody>
              <tr className="border-b dark:border-gray-700">
                <th className="bg-gray-50 px-6 py-4 text-left font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                  代表者名
                </th>
                <td className="px-6 py-4">{handleName}</td>
              </tr>
              <tr className="border-b dark:border-gray-700">
                <th className="bg-gray-50 px-6 py-4 text-left font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                  プロフィール
                </th>
                <td className="px-6 py-4">
                  さぶ空くの運営をしている個人開発者です。
                </td>
              </tr>
              <tr className="border-b dark:border-gray-700">
                <th className="bg-gray-50 px-6 py-4 text-left font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                  メールアドレス
                </th>
                <td className="px-6 py-4">
                  <a
                    href="mailto:subsuku.jp+contact@gmail.com"
                    className="text-blue-600 hover:underline"
                  >
                    subsuku.jp+contact@gmail.com
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* モバイル表示用のカードレイアウト (md未満の画面サイズで表示) */}
        <div className="space-y-4 md:hidden">
          <div className="rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
            <h2 className="mb-2 font-semibold text-gray-700 dark:text-gray-200">
              代表者名
            </h2>
            <p className="text-gray-900 dark:text-gray-100">{handleName}</p>
          </div>

          <div className="rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
            <h2 className="mb-2 font-semibold text-gray-700 dark:text-gray-200">
              プロフィール
            </h2>
            <p className="text-gray-900 dark:text-gray-100">
              さぶ空くの運営をしている個人開発者です。
            </p>
          </div>

          <div className="rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
            <h2 className="mb-2 font-semibold text-gray-700 dark:text-gray-200">
              メールアドレス
            </h2>
            <p className="text-gray-900 dark:text-gray-100">
              <a
                href="mailto:subsuku.jp+contact@gmail.com"
                className="text-blue-600 hover:underline"
              >
                subsuku.jp+contact@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
