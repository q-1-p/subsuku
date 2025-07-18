import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import fs from "node:fs";
import path from "node:path";
import { SiteHeader } from "@/components/domain/site/site-header";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "利用規約 | さぶ空く",
  description: "利用規約ページです。利用規約を確認できます。",
  robots: {
    index: true,
    follow: false,
  },
};

export default function LegalPage() {
  // legal.mdファイルの内容を読み込む
  const filePath = path.join(process.cwd(), "public/doc/legal.md");
  const content = fs.readFileSync(filePath, "utf8");

  return (
    <>
      <SiteHeader />
      <div className="flex min-h-screen flex-col items-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8 dark:bg-gray-900">
        <div className="mb-10 w-full max-w-4xl overflow-hidden rounded-lg bg-white p-6 shadow-lg sm:p-8 md:p-10 dark:bg-gray-800">
          <article className="prose prose-sm dark:prose-invert mx-auto prose-p:my-1 prose-headings:mb-2 max-w-3xl text-left prose-headings:font-bold prose-a:text-blue-600 prose-headings:text-gray-800 leading-relaxed hover:prose-a:text-blue-800 dark:prose-a:text-blue-400 dark:prose-headings:text-gray-100">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </article>
        </div>
      </div>
    </>
  );
}
