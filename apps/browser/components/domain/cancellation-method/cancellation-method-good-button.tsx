"use client";

import { useActionState, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { ThumbsUp } from "lucide-react";

import {
  deleteGoodForCancellationMethod,
  evaluateGoodToCancellationMethod,
} from "./_lib/actions";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  const { isSignedIn } = useUser();
  const [evaluatedGood, setEvaluated] = useState(evaluated);
  const [_, action] = useActionState(
    evaluatedGood
      ? deleteGoodForCancellationMethod
      : evaluateGoodToCancellationMethod,
    undefined,
  );

  return (
    <form
      action={action as never}
      onSubmit={() => setEvaluated(!evaluatedGood)} // そこまで真正性が求められる機能ではない為、楽観的更新で実装
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
              type={isSignedIn ? "submit" : "button"}
              className="h-8 px-2"
              variant="ghost"
              size="sm"
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
