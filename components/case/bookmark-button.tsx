import { BookmarkIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function BookmarkButton() {
  return (
    <form>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <BookmarkIcon className="mr-1 h-4 w-4" />
              <span className="text-xs">0</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>ブックマークする</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </form>
  );
}
