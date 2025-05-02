"use client";

import { ThumbsUp } from "lucide-react";
import { useState } from "react";
import { Toaster } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { goodCancellationMethod } from "./_lib/actions";

export default function CancellationMethodGoodButton({
  cancellationMethodId,
  rated,
  count,
  text,
}: {
  cancellationMethodId: string;
  rated: boolean;
  count: number;
  text?: string;
}) {
  const [ratedGood, setRated] = useState(rated);

  return (
    <form action={goodCancellationMethod as never}>
      <input
        type="hidden"
        name="cancellationMethodId"
        value={cancellationMethodId}
      />
      <Toaster />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="submit"
              className="h-8 px-2"
              variant="ghost"
              size="sm"
              onClick={() => setRated(!ratedGood)} // そこまで真正性が求められる機能ではない為、楽観的更新で実装
            >
              <ThumbsUp className="mr-1 h-4 w-4" />
              <span className={`${ratedGood && "text-red-500"} text-xs`}>
                {ratedGood
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
            <p>{text ?? "いいね"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </form>
  );
}
