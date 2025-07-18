import { useActionState, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { BookmarkCheckIcon, BookmarkPlusIcon } from "lucide-react";

import {
  bookmarkCancellationMethod,
  releaseBookmarkForCancellationMethod,
} from "./_lib/actions";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function CancellationMethodBookmarkButton({
  cancellationMethodId,
  evaluated,
  count,
}: {
  cancellationMethodId: string;
  evaluated: boolean;
  count: number;
}) {
  const { isSignedIn } = useUser();
  const [bookmarked, setBookmarked] = useState(evaluated);
  const [_, action] = useActionState(
    bookmarked
      ? releaseBookmarkForCancellationMethod
      : bookmarkCancellationMethod,
    undefined,
  );

  return (
    <form action={action as never} onSubmit={() => setBookmarked(!bookmarked)}>
      <input
        type="hidden"
        name="cancellationMethodId"
        value={cancellationMethodId}
      />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type={isSignedIn ? "submit" : "button"}
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
