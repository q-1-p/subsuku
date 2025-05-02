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
import { evaluateGoodToCancellationMethod } from "./_lib/actions";

export default function CancellationMethodGoodButton({
  cancellationMethodId,
  evaluated,
  count,
  text,
}: {
  cancellationMethodId: string;
  evaluated: boolean;
  count: number;
  text?: string;
}) {
  const [evaluatedGood, setEvaluated] = useState(evaluated);

  return (
    <form action={evaluateGoodToCancellationMethod as never}>
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
              onClick={() => setEvaluated(!evaluatedGood)} // そこまで真正性が求められる機能ではない為、楽観的更新で実装
            >
              <ThumbsUp className="mr-1 h-4 w-4" />
              <span className={`${evaluatedGood && "text-red-500"} text-xs`}>
                {evaluatedGood
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
            <p>{text ?? "いいね"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </form>
  );
}
