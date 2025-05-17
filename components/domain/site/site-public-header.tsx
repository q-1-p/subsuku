import Link from "next/link";

import Header from "@/components/base/header";
import LoginDialog from "@/components/case/login-dialog";
import { Button } from "@/components/ui/button";

export default async function SitePublicHeader() {
  return (
    <Header>
      <div className="mr-4 flex">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold">さぶ空く</span>
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-end space-x-2">
        <LoginDialog>
          <Button size="sm">ログイン</Button>
        </LoginDialog>
      </div>
    </Header>
  );
}
