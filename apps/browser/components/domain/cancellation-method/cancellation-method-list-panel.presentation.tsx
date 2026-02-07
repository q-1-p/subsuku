"use client";

import { useEffect, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { type } from "arktype";
import { useAtom } from "jotai";
import { Search } from "lucide-react";

import { searchCancellationMethods } from "./_lib/actions";
import { cancellationMethodsAtom } from "./_lib/jotai";
import { CancellationMethodSummaryCard } from "./cancellation-method-summary-card";

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

export function CancellationMethodListPanelPresentation() {
  const [sortedCancellationMethods, setSortedCancellationMethods] = useAtom(
    cancellationMethodsAtom,
  );

  const form = useForm({
    defaultValues: {
      searchQuery: "",
      onlyMine: false,
      onlyBookmarked: false,
    },
    validators: {
      onMount: scheme,
      onChangeAsync: scheme,
      onChangeAsyncDebounceMs: 500,
    },
  });

  const [sort, setSort] = useState<SortItem>(sortItem.none);
  const [canSubmit, setCanSubmit] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    setCanSubmit(false);
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("searchQuery", form.state.values.searchQuery);
    formData.append("onlyMine", form.state.values.onlyMine ? "on" : "");
    formData.append(
      "onlyBookmarked",
      form.state.values.onlyBookmarked ? "on" : "",
    );

    setSortedCancellationMethods(await searchCancellationMethods([], formData));

    setIsSubmitting(false);
    setCanSubmit(true);
  };

  useEffect(() => {
    if (sort === sortItem.none) return;

    setSortedCancellationMethods((currentMethods) => {
      switch (sort) {
        case sortItem.name:
          return [...currentMethods].sort((a, b) =>
            a.subscriptionName.localeCompare(b.subscriptionName),
          );
        case sortItem.bookmark:
          return [...currentMethods].sort(
            (a, b) => b.bookmarkCount - a.bookmarkCount,
          );
        case sortItem.good:
          return [...currentMethods].sort((a, b) => b.goodCount - a.goodCount);
        default:
          return currentMethods;
      }
    });
  }, [sort, setSortedCancellationMethods]);

  return (
    <div>
      <Card className="overflow-hidden rounded-2xl border shadow-sm">
        <CardHeader>
          <CardTitle>解約方法一覧</CardTitle>
          <CardDescription>各サービスの解約手順を確認できます</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <form className="grid flex-1 grid-cols-1 gap-4 md:flex md:items-center md:justify-between">
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
                    type="button"
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
                    type="button"
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
                    type="button"
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
                <Button
                  type="button"
                  variant="default"
                  className="rounded-xl"
                  disabled={!canSubmit}
                  onClick={submit}
                >
                  {isSubmitting ? "検索中..." : "検索する"}
                </Button>
              </div>
            </form>

            <Separator />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {0 < sortedCancellationMethods.length ? (
                sortedCancellationMethods.map((cancellationMethod) => (
                  <CancellationMethodSummaryCard
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
