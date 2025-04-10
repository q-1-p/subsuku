import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";

import "@/app/globals.css";
import Footer from "@/components/base/footer";

export const metadata: Metadata = {
  title: "さぶ空く",
  description: "",
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
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
