import Link from "next/link";

import Header from "@/components/base/header";
import NoticeIcon from "../notice/notice-icon";
import UserIcon from "../user/user-icon";

export default async function SiteLoggedInHeader() {
  return (
    <Header>
      <div className="mr-4 flex">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold">さぶ空く</span>
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-end space-x-2">
        <div className="flex items-center gap-2">
          <NoticeIcon />
          <UserIcon />
        </div>
      </div>
    </Header>
  );
}
