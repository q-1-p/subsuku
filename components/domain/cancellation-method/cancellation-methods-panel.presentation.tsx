"use client";

import {
  Copy,
  Edit,
  ExternalLink,
  Heart,
  Search,
  ThumbsUp,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Toaster, toast } from "sonner";

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
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { ICancellationMethod } from "@/domain/cancellation-method/cancellation-method";

export default function CancellationMethodsPanelPresentation({
  cancellationMethods,
}: { cancellationMethods: ICancellationMethod[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  // 解約手順をクリップボードにコピーする関数
  const copyStepsToClipboard = (guide) => {
    const stepsText = guide.steps
      .map((step, index) => `${index + 1}. ${step}`)
      .join("\n");
    const fullText = `${guide.name}の解約手順:\n\n${stepsText}\n\n注意事項:\n${guide.notes}\n\n公式サイト: ${guide.website}`;

    navigator.clipboard.writeText(fullText).then(() => {
      toast("コピーしました", {
        description: `${guide.name}の解約手順をクリップボードにコピーしました。`,
      });
    });
  };

  // いいねを押す関数
  const handleLike = (_guideId: string) => {
    toast("いいねしました", {
      description: "この解約方法が役に立ったことを評価しました。",
    });
  };

  // 検証する関数
  const handleVerify = (_guideId: string) => {
    toast("検証しました", {
      description:
        "この解約方法で解約できたことを報告しました。ありがとうございます！",
    });
  };

  return (
    <div>
      <Toaster />
      <Card className="overflow-hidden rounded-2xl border shadow-sm">
        <CardHeader>
          <CardTitle>解約方法一覧</CardTitle>
          <CardDescription>各サービスの解約手順を確認できます</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <div className="relative w-full">
                  <Search className="absolute top-2.5 left-2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="サービスを検索..."
                    className="rounded-xl pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" className="rounded-xl">
                    いいね順
                  </Button>
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {cancellationMethods.length > 0 ? (
                cancellationMethods.map((cancellationMethod) => (
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
                            {cancellationMethod.subscriptionName
                              .charAt(0)
                              .toUpperCase()}
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
                            <span className="font-medium text-sm">
                              解約手順
                            </span>
                          </AccordionTrigger>
                          <AccordionContent>
                            <ol className="list-decimal space-y-2 pl-5 text-sm">
                              {cancellationMethod.steps.map((step, index) => (
                                <li
                                  key={index.toString()}
                                  className="text-muted-foreground"
                                >
                                  {step}
                                </li>
                              ))}
                            </ol>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="notes" className="border-none">
                          <AccordionTrigger className="py-2 hover:no-underline">
                            <span className="font-medium text-sm">
                              注意事項
                            </span>
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
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-xl"
                          onClick={() =>
                            copyStepsToClipboard(cancellationMethod)
                          }
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          手順をコピー
                        </Button>
                        {cancellationMethod.serviceUrl && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-xl"
                            asChild
                          >
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
                      {cancellationMethod.mine ? (
                        <div className="mt-1 flex w-full justify-between">
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-xl"
                            asChild
                          >
                            <Link
                              href={`/cancellation-guide/edit/${cancellationMethod.id}`}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              編集
                            </Link>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-xl text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            削除
                          </Button>
                        </div>
                      ) : (
                        <div className="mt-1 flex w-full items-center justify-between">
                          <div className="flex items-center gap-3">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 px-2"
                                    onClick={() =>
                                      handleLike(cancellationMethod.id)
                                    }
                                  >
                                    <Heart className="mr-1 h-4 w-4" />
                                    <span className="text-xs">0</span>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>役に立った</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 px-2"
                                    onClick={() =>
                                      handleVerify(cancellationMethod.id)
                                    }
                                  >
                                    <ThumbsUp className="mr-1 h-4 w-4" />
                                    <span className="text-xs">0</span>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>この方法で解約できました</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                      )}
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full flex h-24 items-center justify-center">
                  <p className="text-muted-foreground">
                    該当するサービスはありません
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
