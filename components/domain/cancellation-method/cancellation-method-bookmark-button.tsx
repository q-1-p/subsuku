import { BookmarkCheckIcon, BookmarkPlusIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  bookmarkCancellationMethod,
  releaseBookmarkForCancellationMethod,
} from "./_lib/actions";

export default function CancellationMethodBookmarkButton({
  cancellationMethodId,
  evaluated,
  count,
}: {
  cancellationMethodId: string;
  evaluated: boolean;
  count: number;
}) {
  const [bookmarked, setEvaluated] = useState(evaluated);

  return (
    <form
      action={
        bookmarked // 先にonClickが走る為、演算子を逆転
          ? (releaseBookmarkForCancellationMethod as never)
          : (bookmarkCancellationMethod as never)
      }
      onSubmit={() => setEvaluated(!bookmarked)} // そこまで真正性が求められる機能ではない為、楽観的更新で実装
    >
      <input
        type="hidden"
        name="cancellationMethodId"
        value={cancellationMethodId}
      />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="submit"
              className="h-8 px-2"
              variant="ghost"
              size="sm"
            >
              {bookmarked ? (
                <BookmarkCheckIcon className="mr-1 h-4 w-4" />
              ) : (
                <BookmarkPlusIcon className="mr-1 h-4 w-4" />
              )}
              <span className={`${bookmarked && "text-red-500"} text-xs`}>
                {bookmarked
                  ? evaluated
                    ? count
                    : count + 1
                  : evaluated
                    ? count - 1
                    : count}
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{evaluated ? "ブックマーク解除" : "ブックマーク"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </form>
  );
}
