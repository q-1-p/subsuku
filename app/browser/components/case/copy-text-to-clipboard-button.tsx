import { Copy } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export default function CopyTextToClipBoardButton({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  const copyStepsToClipboard = () => {
    navigator.clipboard.writeText(text).then(() => {
      toast("コピーしました", {
        description: `${title}をクリップボードにコピーしました。`,
      });
    });
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="rounded-xl"
      onClick={() => copyStepsToClipboard()}
    >
      <Copy className="mr-2 h-4 w-4" />
      {title}をコピー
    </Button>
  );
}
