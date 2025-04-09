import "@/app/globals.css";
import Footer from "@/components/base/footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <title>さぶ空く</title>
      </head>
      <body className="flex min-h-screen flex-col">
        {children}
        <Footer />
      </body>
    </html>
  );
}
