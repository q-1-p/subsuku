import { SignedIn, SignedOut } from "@clerk/nextjs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import UserIcon from "../user/user-icon";

import Header from "@/components/base/header";
import LoginDialog from "@/components/case/login-dialog";
import { Button } from "@/components/ui/button";

export async function SiteHeader({
  backLink,
  backText,
}: {
  backLink?: string;
  backText?: string;
}) {
  return (
    <Header>
      <SignedIn>
        <div className="mr-4 flex">
          <Link
            href={backLink ?? "/"}
            className="mr-6 flex items-center space-x-2"
          >
            {backLink && <ArrowLeft className="h-4 w-4" />}
            <span className="font-bold">{backText ?? "さぶ空く"}</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <div className="flex items-center gap-2">
            <UserIcon />
          </div>
        </div>
      </SignedIn>
      <SignedOut>
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
      </SignedOut>
    </Header>
  );
}
