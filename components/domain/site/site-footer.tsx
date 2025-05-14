import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="w-full border-t py-6">
      <div className="flex w-full flex-col items-center justify-center gap-4 px-4 md:flex-row md:gap-8">
        <p className="text-center text-gray-500 text-sm dark:text-gray-400">
          2025 さぶ空く（仮）. All rights reserved.
        </p>
        <div className="flex gap-4">
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
            href="/contact"
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
