"use client";
import { Plus, Trash } from "lucide-react";
import Link from "next/link";
import type React from "react";
import { useState } from "react";

import SiteSubPageHeader from "@/components/domain/site/site-sub-page-header";
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export default function Page() {
  const [steps, setSteps] = useState<string[]>([""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [linkToSubscription, setLinkToSubscription] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<
    number | null
  >(null);

  // フォームの状態
  const [formData, setFormData] = useState({
    name: "",
    website: "",
    notes: "",
    refundPolicy: "",
    contactInfo: "",
  });

  // フォームの入力を処理する関数
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ステップの追加
  const addStep = () => {
    setSteps([...steps, ""]);
  };

  // ステップの削除
  const removeStep = (index: number) => {
    const newSteps = [...steps];
    newSteps.splice(index, 1);
    setSteps(newSteps);
  };

  // ステップの更新
  const updateStep = (index: number, value: string) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  return (
    <>
      <SiteSubPageHeader
        backLink="/app/cancellation-guide"
        backText="解約ガイドに戻る"
      />
      <main className="container flex-1 py-6">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h1 className="font-bold text-2xl">解約方法を投稿</h1>
            </div>

            <Card className="overflow-hidden rounded-2xl border shadow-sm">
              <CardHeader>
                <CardTitle>解約方法の詳細</CardTitle>
                <CardDescription>
                  あなたの経験を共有して、他のユーザーの役に立ちましょう
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
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

                  {/* 
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

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        サービス名 <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Netflix"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="rounded-xl"
                        required
                        disabled={
                          linkToSubscription && selectedSubscription !== null
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">公式サイトURL</Label>
                    <Input
                      id="website"
                      name="website"
                      placeholder="https://www.example.com"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="rounded-xl"
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>
                        解約手順 <span className="text-red-500">*</span>
                      </Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addStep}
                        className="rounded-xl"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        ステップを追加
                      </Button>
                    </div>
                    {steps.map((step, index) => (
                      <div
                        key={index.toString()}
                        className="flex items-start gap-2"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <Input
                            value={step}
                            onChange={(e) => updateStep(index, e.target.value)}
                            placeholder={`ステップ ${index + 1}: 例）公式サイトにログインします`}
                            className="rounded-xl"
                            required={index === 0}
                          />
                        </div>
                        {steps.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeStep(index)}
                            className="h-10 w-10 shrink-0"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="notes">注意事項</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      placeholder="解約時の注意点や重要な情報があれば記入してください"
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="min-h-[100px] rounded-xl"
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      type="button"
                      asChild
                      className="rounded-xl"
                    >
                      <Link href="/cancellation-guide">キャンセル</Link>
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="rounded-xl"
                    >
                      {isSubmitting
                        ? "送信中..."
                        : isPrivate
                          ? "保存する"
                          : "投稿する"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
