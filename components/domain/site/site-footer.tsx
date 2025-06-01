import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="w-full border-t py-6">
      <div className="flex w-full flex-col items-center justify-center gap-4 px-4 md:flex-row md:gap-8">
        <p className="text-center text-gray-500 text-sm dark:text-gray-400">
          2025 さぶ空く All rights reserved.
        </p>
        <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
          <Link
            href="/legal"
            className="text-gray-500 text-sm hover:underline dark:text-gray-400"
          >
            利用規約
          </Link>
          <Link
            href="/privacy-policy"
            className="text-gray-500 text-sm hover:underline dark:text-gray-400"
          >
            プライバシーポリシー
          </Link>
          <Link
            href="https://tricky-chokeberry-957.notion.site/2051ac83cb968081bd9eecb412a31e92?pvs=105"
            className="text-gray-500 text-sm hover:underline dark:text-gray-400"
          >
            お問い合わせ
          </Link>
          <Link
            href="/company"
            className="text-gray-500 text-sm hover:underline dark:text-gray-400"
          >
            運営者情報
          </Link>
        </div>
      </div>
    </footer>
  );
}
