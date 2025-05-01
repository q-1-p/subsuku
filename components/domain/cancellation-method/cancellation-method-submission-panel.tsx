import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, Plus, ThumbsUp, Upload } from "lucide-react";
import Link from "next/link";

export default function CancellationMethodSubmissionPanel() {
  return (
    <Card className="overflow-hidden rounded-2xl border shadow-sm">
      <CardHeader>
        <CardTitle>解約方法の投稿について</CardTitle>
        <CardDescription>
          あなたの経験を共有して、他のユーザーの役に立ちましょう
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p>
            サブスクリプションの解約方法は頻繁に変更されることがあります。最新の解約方法を知っている場合は、ぜひ共有してください。あなたの投稿が他のユーザーの役に立ちます。
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex flex-col items-center gap-2 rounded-xl bg-secondary/30 p-4">
              <div className="rounded-full bg-primary/20 p-3 text-primary">
                <Upload className="h-6 w-6" />
              </div>
              <h3 className="font-medium text-lg">解約方法を投稿</h3>
              <p className="text-center text-muted-foreground text-sm">
                あなたが経験した解約手順を詳しく共有してください。
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-xl bg-secondary/30 p-4">
              <div className="rounded-full bg-primary/20 p-3 text-primary">
                <ThumbsUp className="h-6 w-6" />
              </div>
              <h3 className="font-medium text-lg">検証して確認</h3>
              <p className="text-center text-muted-foreground text-sm">
                投稿された解約方法で実際に解約できたら、検証ボタンを押してください。
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-xl bg-secondary/30 p-4">
              <div className="rounded-full bg-primary/20 p-3 text-primary">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="font-medium text-lg">役立つ情報を評価</h3>
              <p className="text-center text-muted-foreground text-sm">
                役立つ解約方法には「いいね」を押して、他のユーザーにも伝わるようにしましょう。
              </p>
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <Link href="/cancellation-guide/submit">
              <Button className="rounded-xl">
                <Plus className="mr-2 h-4 w-4" />
                解約方法を投稿する
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
