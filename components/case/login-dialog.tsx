import Link from "next/link";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

export default function LoginDialog({
  children,
}: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ログイン</DialogTitle>
          <DialogDescription>
            ログイン方法を選択してください。
          </DialogDescription>
          <div className="flex items-center justify-center py-2">
            <Link href="/app/dashboard" className="w-full">
              <Button
                variant="default"
                className="w-full rounded-full bg-green-600 hover:bg-green-700"
              >
                Googleでログイン
              </Button>
            </Link>
          </div>
        </DialogHeader>
        <DialogFooter>
          <DialogDescription>
            ログインすることで
            <a href="/privacy-policy" className="text-blue-600 underline">
              プライバシーポリシー
            </a>
            に同意したものとみなします。 利用規約は
            <a href="/legal" className="text-blue-600 underline">
              こちら
            </a>
            をご確認ください。
          </DialogDescription>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
