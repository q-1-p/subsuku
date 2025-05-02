import { BookmarkCheckIcon, BookmarkPlusIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { goodCancellationMethod } from "./_lib/actions";

export default function CancellationMethodBookmarkButton({
  cancellationMethodId,
  rated,
  count,
}: {
  cancellationMethodId: string;
  rated: boolean;
  count: number;
}) {
  const [bookmarked, setRated] = useState(rated);

  return (
    <form action={goodCancellationMethod as never}>
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
              onClick={() => setRated(!bookmarked)} // そこまで真正性が求められる機能ではない為、楽観的更新で実装
            >
              {rated ? (
                <BookmarkCheckIcon className="mr-1 h-4 w-4" />
              ) : (
                <BookmarkPlusIcon className="mr-1 h-4 w-4" />
              )}
              <span className={`${bookmarked && "text-red-500"} text-xs`}>
                {bookmarked
                  ? rated
                    ? count
                    : count + 1
                  : rated
                    ? count - 1
                    : count}
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{rated ? "ブックマーク解除" : "ブックマーク"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </form>
  );
}
