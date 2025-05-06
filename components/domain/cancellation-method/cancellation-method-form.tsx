"use client";

import { useForm, useTransform } from "@tanstack/react-form";
import { type } from "arktype";
import { Plus, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect } from "react";

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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { registerCancellationMethod } from "./_lib/actions";

const cancellationMethodEditFormScheme = type({
  name: "string > 0",
  private: "boolean",
  serviceUrl: "string",
  steps: "string[] > 0",
  precautions: "string",
  freeText: "string",
  linkSubscriptionId: "number | undefined",
});

export function CancellationMethodForm() {
  const [result, action] = useActionState<boolean | undefined, FormData>(
    registerCancellationMethod,
    undefined,
  );

  const form = useForm({
    defaultValues: {
      name: "",
      private: false,
      serviceUrl: "",
      steps: [""],
      precautions: "",
      freeText: "",
      linkSubscriptionId: undefined,
    },
    transform: useTransform((baseForm) => baseForm, [result]),
    validators: {
      onMount: cancellationMethodEditFormScheme,
      onChangeAsync: cancellationMethodEditFormScheme,
      onChangeAsyncDebounceMs: 500,
    },
  });

  useEffect(() => {
    if (result === true) {
      alert("解約方法を投稿しました");
      window.location.href = "/app/cancellation-guide";
    } else if (result === false) {
      alert("解約方法の投稿に失敗しました");
    }
  }, [result]);

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
          {/* 
          <div className="flex flex-col gap-4">
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

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="link-toggle">
                  サブスクリプションと関連付ける
                </Label>
                <p className="text-muted-foreground text-xs">
                  あなたが管理しているサブスクリプションと関連付けます
                </p>
              </div>
              <Switch
                id="link-toggle"
                checked={linkToSubscription}
                onCheckedChange={setLinkToSubscription}
              />
            </div>
          </div>

          {linkToSubscription && (
            <div className="space-y-2">
              <Label>サブスクリプションを選択</Label>
              <Popover
                open={openSubscriptionSelect}
                onOpenChange={setOpenSubscriptionSelect}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openSubscriptionSelect}
                    className="w-full justify-between rounded-xl"
                  >
                    {selectedSubscription
                      ? mySubscriptions.find(
                          (sub) => sub.id === selectedSubscription,
                        )?.name
                      : "サブスクリプションを選択..."}
                    <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="サブスクリプションを検索..." />
                    <CommandList>
                      <CommandEmpty>
                        サブスクリプションが見つかりません
                      </CommandEmpty>
                      <CommandGroup>
                        {mySubscriptions.map((sub) => (
                          <CommandItem
                            key={sub.id}
                            value={sub.name}
                            onSelect={() =>
                              handleSelectSubscription(sub.id)
                            }
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className={`flex h-6 w-6 items-center justify-center rounded-full ${sub.color} font-bold text-white text-xs`}
                              >
                                {sub.logo}
                              </div>
                              <span>{sub.name}</span>
                            </div>
                            <Check
                              className={cn(
                                "ml-auto h-4 w-4",
                                selectedSubscription === sub.id
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          )} */}

          <Separator />

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <form.Field name="name">
                {(field) => (
                  <>
                    <Label htmlFor="name">
                      サービス名 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      className="rounded-xl"
                      name="name"
                      placeholder="Example"
                      value={field.state.value}
                      onChange={(e) => field.setValue(e.target.value)}
                      required
                    />
                  </>
                )}
              </form.Field>
            </div>
          </div>

          <div className="space-y-2">
            <form.Field name="serviceUrl">
              {(field) => (
                <>
                  <Label htmlFor="serviceUrl">公式サイトURL</Label>
                  <Input
                    className="rounded-xl"
                    name="serviceUrl"
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
                  className=" rounded-xl"
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
                    <Link href="/app/cancellation-method">キャンセル</Link>
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
