import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Toaster } from "sonner";

import "@/app/globals.css";
import SiteFooter from "@/components/domain/site/site-footer";

export const metadata: Metadata = {
  title: "さぶ空く",
  description:
    "サブスクリプションの一覧を円換算で管理し、更新日前にメール通知などを行うサービスです",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
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
          {children}
          <SiteFooter />
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
