"use client";

import { useActionState, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { type } from "arktype";
import { Plus, TrashIcon } from "lucide-react";
import Link from "next/link";

import {
  registerCancellationMethod,
  updateCancellationMethod,
} from "./_lib/actions";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  type CancellationMethodDetail,
  cancellationMethodFreeTextSchema,
  cancellationMethodPrecautionsSchema,
  cancellationMethodStepsSchema,
  type SubscriptionDetail,
  subscriptionNameSchema,
} from "@/domain/type";

const cancellationMethodEditFormScheme = type({
  id: "string.uuid | string == 0",
  name: subscriptionNameSchema,
  private: "boolean",
  urlToCancel: "string.url | string == 0",
  steps: cancellationMethodStepsSchema,
  precautions: cancellationMethodPrecautionsSchema,
  freeText: cancellationMethodFreeTextSchema,
  linkSubscriptionId: "string.uuid | string == 0",
});

export function CancellationMethodEditFormPresentation({
  cancellationMethod,
  subscriptions,
  subscriptionNameSuggestions,
}: {
  cancellationMethod?: CancellationMethodDetail;
  subscriptions: SubscriptionDetail[];
  subscriptionNameSuggestions: Promise<string[]>;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, action] = useActionState(async (_: unknown, formData: FormData) => {
    // server actionsを実行している場合、tanstack formが検知できないので、手動で変更する
    form.state.canSubmit = false;
    form.state.isSubmitting = true;

    if (
      cancellationMethod
        ? await updateCancellationMethod(_, formData)
        : await registerCancellationMethod(_, formData)
    ) {
      alert("解約方法を投稿しました");
      window.location.href = form.state.values.linkSubscriptionId
        ? `/app/subscription/${form.state.values.linkSubscriptionId}`
        : "/cancellation-guide";
    } else {
      alert("解約方法の投稿に失敗しました");
    }

    form.state.isSubmitting = false;
    form.state.canSubmit = true;
  }, {});
  const [linkToSubscription, setLinkToSubscription] = useState(false);

  // 入力候補関連のstate
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const form = useForm({
    defaultValues: {
      id: cancellationMethod?.id ?? "",
      name: cancellationMethod?.subscriptionName ?? "",
      private: cancellationMethod?.isPrivate ?? false,
      urlToCancel: cancellationMethod?.urlToCancel ?? "",
      steps: cancellationMethod?.steps ?? [""],
      precautions: cancellationMethod?.precautions ?? "",
      freeText: cancellationMethod?.freeText ?? "",
      linkSubscriptionId: "",
    },
    validators: {
      onMount: cancellationMethodEditFormScheme,
      onChangeAsync: cancellationMethodEditFormScheme,
      onChangeAsyncDebounceMs: 500,
    },
  });

  return (
    <Card className="overflow-hidden rounded-2xl border shadow-sm">
      <CardHeader>
        <CardTitle>解約方法の詳細</CardTitle>
        <CardDescription>
          あなたの経験を共有して、他のユーザーの役に立ちましょう
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action as never} className="space-y-6">
          <input type="hidden" name="id" value={form.state.values.id} />

          <div className="flex flex-col gap-4">
            {/*
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="private-toggle">非公開で保存</Label>
                <p className="text-muted-foreground text-xs">
                  オンにすると、この解約方法はあなただけが閲覧できます
                </p>
              </div>
              <Switch
                id="private-toggle"
                checked={isPrivate}
                onCheckedChange={setIsPrivate}
              />
            </div>
            */}

            {!cancellationMethod && (
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="link-toggle">サブスクと関連付ける</Label>
                  <p className="text-muted-foreground text-xs">
                    あなたが管理しているサブスクと関連付けます
                  </p>
                </div>
                <Switch
                  id="link-toggle"
                  checked={linkToSubscription}
                  onCheckedChange={setLinkToSubscription}
                />
              </div>
            )}

            {linkToSubscription && (
              <form.Field name="linkSubscriptionId">
                {(field) => (
                  <Select
                    name="linkSubscriptionId"
                    onValueChange={(e) => field.handleChange(e)}
                  >
                    <SelectTrigger className="w-full flex-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {subscriptions?.map((subscription) => (
                        <SelectItem
                          key={subscription.id}
                          value={subscription.id}
                        >
                          {subscription.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </form.Field>
            )}
          </div>

          <Separator />

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <form.Field name="name">
                {(field) => {
                  // 入力値に基づいて候補をフィルタリングする関数
                  const handleInputChange = async (
                    e: React.ChangeEvent<HTMLInputElement>,
                  ) => {
                    const value = e.target.value;
                    field.handleChange(value);

                    if (value.length > 0) {
                      const filtered = (
                        await subscriptionNameSuggestions
                      ).filter((suggestion) =>
                        suggestion.toLowerCase().includes(value.toLowerCase()),
                      );
                      setFilteredSuggestions(filtered);
                      setShowSuggestions(filtered.length > 0);
                    } else {
                      setShowSuggestions(false);
                    }
                  };

                  // 候補をクリックした時の処理
                  const handleSuggestionClick = (suggestion: string) => {
                    field.handleChange(suggestion);
                    setShowSuggestions(false);
                  };

                  return (
                    <>
                      <Label htmlFor="name">
                        サブスク名 <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Input
                          name="name"
                          placeholder="例）Netflix"
                          value={field.state.value}
                          onChange={handleInputChange}
                          onFocus={() => {
                            if (
                              field.state.value &&
                              filteredSuggestions.length > 0
                            ) {
                              setShowSuggestions(true);
                            }
                          }}
                          onBlur={() => {
                            // 少し遅延させて候補をクリックできるようにする
                            setTimeout(() => setShowSuggestions(false), 200);
                          }}
                          required
                        />
                        {showSuggestions && filteredSuggestions.length > 0 && (
                          <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-300 bg-white shadow-lg">
                            <ul className="max-h-60 overflow-auto py-1 text-base">
                              {filteredSuggestions.map((suggestion) => (
                                <button
                                  key={`suggestion-${suggestion}`}
                                  className="w-full cursor-pointer px-4 py-2 text-left hover:bg-gray-100"
                                  onClick={() =>
                                    handleSuggestionClick(suggestion)
                                  }
                                  type="button"
                                >
                                  {suggestion}
                                </button>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      {0 < field.state.meta.errors.length && (
                        <p className="pt-2 text-red-500">
                          31文字以下の名前を入力してください
                        </p>
                      )}
                    </>
                  );
                }}
              </form.Field>
            </div>
          </div>

          <div className="space-y-2">
            <form.Field name="urlToCancel">
              {(field) => (
                <>
                  <Label htmlFor="urlToCancel">解約先URL</Label>
                  <Input
                    className="rounded-xl"
                    name="urlToCancel"
                    placeholder="https://www.example.com"
                    value={field.state.value}
                    onChange={(e) => field.setValue(e.target.value)}
                  />
                </>
              )}
            </form.Field>
          </div>

          <Separator />

          <div className="space-y-4">
            <form.Field name="steps" mode="array">
              {(field) => (
                <>
                  <div className="flex items-center justify-between">
                    <Label>
                      解約手順 <span className="text-red-500">*</span>
                    </Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => field.setValue([...field.state.value, ""])}
                      className="rounded-xl"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      ステップを追加
                    </Button>
                  </div>
                  {field.state.value.map((_, index) => (
                    <div
                      key={index.toString()}
                      className="flex items-center gap-2"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                        {index + 1}
                      </div>
                      <form.Field name={`steps[${index}]`}>
                        {(steps) => (
                          <Input
                            name="steps[]"
                            placeholder="例）公式サイトにログインします"
                            value={steps.state.value}
                            onChange={(e) => steps.setValue(e.target.value)}
                            required={index === 0}
                          />
                        )}
                      </form.Field>
                      <Button
                        type="button"
                        className="h-10 w-10 shrink-0"
                        variant="ghost"
                        size="icon"
                        disabled={field.state.value.length === 1}
                        onClick={() =>
                          field.setValue(
                            field.state.value.filter((_, i) => i !== index),
                          )
                        }
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </>
              )}
            </form.Field>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="notes">注意事項</Label>
            <form.Field name="precautions">
              {(field) => (
                <Textarea
                  className="rounded-xl"
                  name="precautions"
                  placeholder="解約時の注意点や重要な情報があれば記入してください"
                  value={field.state.value}
                  onChange={(e) => field.setValue(e.target.value)}
                />
              )}
            </form.Field>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">その他</Label>
            <form.Field name="freeText">
              {(field) => (
                <Textarea
                  className="rounded-xl"
                  name="freeText"
                  placeholder="自由記述欄"
                  value={field.state.value}
                  onChange={(e) => field.setValue(e.target.value)}
                />
              )}
            </form.Field>
          </div>

          <div className="flex justify-end gap-2">
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <>
                  <Button type="button" variant="outline" asChild>
                    <Link href="/cancellation-guide">キャンセル</Link>
                  </Button>
                  <Button type="submit" disabled={!canSubmit}>
                    {isSubmitting ? "保存中..." : "保存"}
                  </Button>
                </>
              )}
            </form.Subscribe>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
