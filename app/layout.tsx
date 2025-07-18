import { ClerkProvider } from "@clerk/nextjs";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Toaster } from "sonner";

import type { Metadata } from "next";

import "@/app/globals.css";

import SiteFooter from "@/components/domain/site/site-footer";

export const metadata: Metadata = {
  title: "さぶ空く",
  description:
    "サブスクリプションの一覧を円換算で管理し、更新日前にメール通知などを行うサービスです",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  robots: "noindex",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="ja" suppressHydrationWarning>
        <body className="flex min-h-screen flex-col">
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID as string} />
          {children}
          <SiteFooter />
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
