import { EditIcon, ExternalLink } from "lucide-react";
import Link from "next/link";

import CopyTextToClipBoardButton from "@/components/case/copy-text-to-clipboard-button";
import CancellationMethodBookmarkButton from "@/components/domain/cancellation-method/cancellation-method-bookmark-button";
import CancellationMethodGoodButton from "@/components/domain/cancellation-method/cancellation-method-good-button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ICancellationMethod } from "@/domain/cancellation-method/cancellation-method";
import { CancellationMethodLinkIcon } from "./cancellation-method-link-icon";

export default function CancellationMethodCard({
  cancellationMethod,
}: {
  cancellationMethod: ICancellationMethod;
}) {
  return (
    <Card
      key={cancellationMethod.id}
      className="gap-2 overflow-hidden rounded-2xl border shadow-sm transition-shadow duration-200 hover:shadow"
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={
                "flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 font-bold text-lg text-white"
              }
            >
              {cancellationMethod.subscriptionName.charAt(0).toUpperCase()}
            </div>
            <div>
              <CardTitle className="text-xl">
                {cancellationMethod.subscriptionName}
              </CardTitle>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="steps" className="border-none">
            <AccordionTrigger className="py-2 hover:no-underline">
              <span className="font-medium text-sm">解約手順</span>
            </AccordionTrigger>
            <AccordionContent>
              <ol className="list-decimal space-y-2 pl-5 text-sm">
                {cancellationMethod.steps.map((step, index) => (
                  <li key={index.toString()} className="text-muted-foreground">
                    {step}
                  </li>
                ))}
              </ol>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="notes" className="border-none">
            <AccordionTrigger className="py-2 hover:no-underline">
              <span className="font-medium text-sm">注意事項</span>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground text-sm">
                {cancellationMethod.precautions}
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="refund" className="border-none">
            <AccordionTrigger className="py-2 hover:no-underline">
              <span className="font-medium text-sm">その他</span>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground text-sm">
                {cancellationMethod.freeText}
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <div className="flex w-full justify-between">
          <CopyTextToClipBoardButton
            title="解約方法"
            text={[
              `${cancellationMethod.subscriptionName}の解約手順:`,
              "",
              ...cancellationMethod.steps.map(
                (step, index) => `${index + 1}. ${step}`,
              ),
              "",
              "注意事項:",
              cancellationMethod.precautions,
              "",
              `公式サイト: ${cancellationMethod.serviceUrl}`,
            ].join("\n")}
          />
          {cancellationMethod.serviceUrl && (
            <Button variant="outline" size="sm" className="rounded-xl" asChild>
              <a
                href={cancellationMethod.serviceUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                公式サイト
              </a>
            </Button>
          )}
        </div>
        <div className="mt-1 flex w-full items-center justify-between">
          <div className="flex items-center gap-3">
            <CancellationMethodBookmarkButton
              cancellationMethodId={cancellationMethod.id}
              evaluated={cancellationMethod.isBookmarked}
              count={cancellationMethod.bookmarkCount}
            />
            <CancellationMethodGoodButton
              cancellationMethodId={cancellationMethod.id}
              evaluated={cancellationMethod.evaluatedGood}
              count={cancellationMethod.goodCount}
              text="この方法で解約できました"
            />
          </div>
          <div className="flex items-center gap-4">
            <Link href={`/cancellation-guide/edit/${cancellationMethod.id}`}>
              <EditIcon className="h-4 w-4" />
            </Link>
            <CancellationMethodLinkIcon
              cancellationMethodId={cancellationMethod.id}
            />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
