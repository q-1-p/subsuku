import type { Metadata } from "next";

import SitePublicHeader from "@/components/domain/site/site-public-header";

export const metadata: Metadata = {
  title: "問い合わせ | さぶ空く",
  description:
    "問い合わせページです。お問い合わせはGoogleフォームから行います。",
};

export default function ContactPage() {
  return (
    <>
      <SitePublicHeader />
      <div className="flex items-center justify-center p-4">
        <iframe
          className="h-[1000px] w-full"
          src="https://docs.google.com/forms/d/e/1FAIpQLScP3SHbXL0xZLRlA-CNMer63xPAa8Q1za-E3dFMAOjXiTrnBQ/viewform?embedded=true"
          title="問い合わせフォーム"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          referrerPolicy="no-referrer"
        >
          読み込んでいます…
        </iframe>
      </div>
    </>
  );
}
