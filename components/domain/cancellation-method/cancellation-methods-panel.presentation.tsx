"use client";

import { useForm, useTransform } from "@tanstack/react-form";
import { type } from "arktype";
import { Search } from "lucide-react";
import { useActionState, useEffect, useState } from "react";

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
import type { CancellationMethodDetail } from "@/domain/type";
import { useAtom } from "jotai";
import { searchCancellationMethods } from "./_lib/actions";
import { cancellationMethodsAtom } from "./_lib/jotai";
import CancellationMethodCard from "./cancellation-method-card";

const sortItem = {
  none: "none",
  name: "name",
  bookmark: "bookmark",
  good: "good",
} as const;
type SortItem = (typeof sortItem)[keyof typeof sortItem];

const scheme = type({
  searchQuery: "string >= 0",
  onlyMine: "boolean",
  onlyBookmarked: "boolean",
});

export default function CancellationMethodsPanelPresentation() {
  const [cancellationMethods, action] = useActionState<
    CancellationMethodDetail[],
    FormData
  >(searchCancellationMethods, []);
  const [sortedCancellationMethods, setSortedCancellationMethods] = useAtom(
    cancellationMethodsAtom,
  );
  const form = useForm({
    defaultValues: {
      searchQuery: "",
      onlyMine: false,
      onlyBookmarked: false,
    },
    transform: useTransform((baseForm) => baseForm, [cancellationMethods]),
    validators: {
      onMount: scheme,
      onChangeAsync: scheme,
      onChangeAsyncDebounceMs: 500,
    },
  });

  const [sort, setSort] = useState<SortItem>(sortItem.none);

  useEffect(() => {
    let temp = cancellationMethods ?? [];

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

    setSortedCancellationMethods(temp);
  }, [cancellationMethods, sort, setSortedCancellationMethods]);

  return (
    <div>
      <Card className="overflow-hidden rounded-2xl border shadow-sm">
        <CardHeader>
          <CardTitle>解約方法一覧</CardTitle>
          <CardDescription>各サービスの解約手順を確認できます</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <form
              action={action as never}
              className="grid flex-1 grid-cols-1 gap-4 md:flex md:items-center md:justify-between"
            >
              <div
                id="search-form"
                className="grid flex-1 grid-cols-1 items-center gap-2 space-x-2 md:flex"
              >
                <div className="relative min-w-64">
                  <Search className="absolute top-2.5 left-2 h-4 w-4 text-muted-foreground" />
                  <form.Field name="searchQuery">
                    {(field) => (
                      <Input
                        className="w-full rounded-xl pl-8"
                        name="searchQuery"
                        placeholder="サービスを検索..."
                        value={field.state.value}
                        onChange={(e) => {
                          field.handleChange(e.target.value);
                        }}
                      />
                    )}
                  </form.Field>
                </div>
                <div className="flex items-center space-x-2 px-2 md:p-0">
                  <form.Field name="onlyMine">
                    {(field) => (
                      <label className="flex cursor-pointer items-center space-x-2">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-primary"
                          name="onlyMine"
                          checked={field.state.value}
                          onChange={(e) => {
                            field.handleChange(e.target.checked);
                          }}
                        />
                        <span className="text-sm">自分の投稿のみ</span>
                      </label>
                    )}
                  </form.Field>
                </div>
                <div className="flex items-center space-x-2 px-2 md:p-0">
                  <form.Field name="onlyBookmarked">
                    {(field) => (
                      <label className="flex cursor-pointer items-center space-x-2">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-primary"
                          name="onlyBookmarked"
                          checked={field.state.value}
                          onChange={(e) => {
                            field.handleChange(e.target.checked);
                          }}
                        />
                        <span className="text-sm">
                          ブックマークした投稿のみ
                        </span>
                      </label>
                    )}
                  </form.Field>
                </div>
              </div>
              <div className="flex gap-2 sm:flex-row sm:items-center">
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
              <div>
                <form.Subscribe selector={(state) => [state.isSubmitting]}>
                  {([isSubmitting]) => (
                    <>
                      <Button
                        type="submit"
                        variant="default"
                        className="rounded-xl"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "検索中..." : "検索する"}
                      </Button>
                    </>
                  )}
                </form.Subscribe>
              </div>
            </form>

            <Separator />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <form.Subscribe selector={(state) => [state.isSubmitting]}>
                {([isSubmitting]) => {
                  if (isSubmitting) {
                    return (
                      <div className="col-span-full flex h-24 items-center justify-center">
                        <p className="text-muted-foreground">検索中...</p>
                      </div>
                    );
                  }
                  if (0 < sortedCancellationMethods.length) {
                    return sortedCancellationMethods.map(
                      (cancellationMethod) => (
                        <CancellationMethodCard
                          key={cancellationMethod.id}
                          cancellationMethod={cancellationMethod}
                        />
                      ),
                    );
                  }

                  return (
                    <div className="col-span-full flex h-24 items-center justify-center">
                      <p className="text-muted-foreground">
                        該当するサービスはありません
                      </p>
                    </div>
                  );
                }}
              </form.Subscribe>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
