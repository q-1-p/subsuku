"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import type { ICancellationMethod } from "@/domain/cancellation-method/cancellation-method";
import type { ISubscription } from "@/domain/subscription/subscription";
import { useAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { subscriptionsAtom } from "../subscription/_lib/jotai";
import { cancellationMethodsAtom } from "./_lib/jotai";
import CancellationMethodCard from "./cancellation-method-card";

const sortItem = {
  none: "none",
  name: "name",
  bookmark: "bookmark",
  good: "good",
} as const;
type SortItem = (typeof sortItem)[keyof typeof sortItem];

export default function CancellationMethodsPanelPresentation({
  cancellationMethods,
  subscriptions,
}: {
  cancellationMethods: ICancellationMethod[];
  subscriptions?: ISubscription[];
}) {
  const [cancellationMethodsCache, setCancellationMethodsCache] = useAtom(
    cancellationMethodsAtom,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [mine, setMine] = useState(false);
  const [onlyBookmark, setOnlyBookmark] = useState(false);
  const [sort, setSort] = useState<SortItem>(sortItem.none);

  useHydrateAtoms([[subscriptionsAtom, subscriptions ?? []]]);

  useEffect(() => {
    let temp =
      cancellationMethods?.filter((cancellationMethod) =>
        cancellationMethod.subscriptionName.includes(searchQuery),
      ) ?? [];

    if (mine) {
      temp = temp.filter((cancellationMethod) => cancellationMethod.mine);
    }
    if (onlyBookmark) {
      temp = temp.filter(
        (cancellationMethod) => cancellationMethod.isBookmarked,
      );
    }

    switch (sort) {
      case sortItem.name:
        temp = temp.sort((a, b) =>
          a.subscriptionName.localeCompare(b.subscriptionName),
        );
        break;
      case sortItem.bookmark:
        temp = temp.sort((a, b) => b.bookmarkCount - a.bookmarkCount);
        break;
      case sortItem.good:
        temp = temp.sort((a, b) => b.goodCount - a.goodCount);
        break;
    }

    setCancellationMethodsCache(temp);
  }, [
    cancellationMethods,
    searchQuery,
    mine,
    onlyBookmark,
    sort,
    setCancellationMethodsCache,
  ]);

  return (
    <div>
      <Card className="overflow-hidden rounded-2xl border shadow-sm">
        <CardHeader>
          <CardTitle>解約方法一覧</CardTitle>
          <CardDescription>各サービスの解約手順を確認できます</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-1 items-center space-x-2">
                <div className="relative min-w-64">
                  <Search className="absolute top-2.5 left-2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="サービスを検索..."
                    className="w-full rounded-xl pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <label className="flex cursor-pointer items-center space-x-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary"
                      checked={mine}
                      onChange={(e) => setMine(e.target.checked)}
                    />
                    <span className="text-sm">自分の投稿のみ</span>
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <label className="flex cursor-pointer items-center space-x-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary"
                      checked={onlyBookmark}
                      onChange={(e) => setOnlyBookmark(e.target.checked)}
                    />
                    <span className="text-sm">ブックマークした投稿のみ</span>
                  </label>
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="flex items-center space-x-2">
                  <Button
                    variant={sort === sortItem.name ? "secondary" : "outline"}
                    className="rounded-xl"
                    onClick={() =>
                      setSort(
                        sort === sortItem.name ? sortItem.none : sortItem.name,
                      )
                    }
                  >
                    名前順
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={
                      sort === sortItem.bookmark ? "secondary" : "outline"
                    }
                    className="rounded-xl"
                    onClick={() =>
                      setSort(
                        sort === sortItem.bookmark
                          ? sortItem.none
                          : sortItem.bookmark,
                      )
                    }
                  >
                    ブックマーク順
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={sort === sortItem.good ? "secondary" : "outline"}
                    className="rounded-xl"
                    onClick={() =>
                      setSort(
                        sort === sortItem.good ? sortItem.none : sortItem.good,
                      )
                    }
                  >
                    いいね順
                  </Button>
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {cancellationMethods?.length > 0 ? (
                cancellationMethodsCache.map((cancellationMethod) => (
                  <CancellationMethodCard
                    key={cancellationMethod.id}
                    cancellationMethod={cancellationMethod}
                  />
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
