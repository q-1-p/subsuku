import SiteLoggedInHeader from "@/components/domain/site/site-logged-in-header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteLoggedInHeader />
      {children}
    </>
  );
}
