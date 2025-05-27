"use client";

import { useForm, useTransform } from "@tanstack/react-form";
import { type } from "arktype";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import Link from "next/link";
import { useActionState, useState } from "react";

import CurrencyIcon from "@/components/common/currency-icon";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import type { ISubscription } from "@/domain/subscription/subscription";
import {
  type CurrencyId,
  type TimeUnit,
  currencyId,
  timeUnit,
} from "@/domain/type";
import { registerSubscription, updateSubscription } from "./_lib/actions";

const currencyNames = {
  [currencyId.jpy]: "日本円 (JPY)",
  [currencyId.cny]: "人民元 (CNY)",
  [currencyId.gbp]: "英ポンド (GBP)",
  [currencyId.usd]: "米ドル (USD)",
  [currencyId.eur]: "ユーロ (EUR)",
  [currencyId.btc]: "ビットコイン (BTC)",
} as const;

const subscriptionFormScheme = type({
  name: "0 < string < 32",
  amount: type("0 < string < 20").narrow((value) => 100000000 > +value),
  currencyId: "number.integer",
  intervalCycle: "number.integer > 0",
  intervalId: "number.integer",
  nextUpdate: "string > 8",
});

function validateInputFloat(value: string): string {
  const float = value
    .replace(/^0+(?=\d)/, "")
    .replace(/\.$/, ".0")
    .replace(/^\./, "0.");
  return float.length < 1 || Number.isNaN(+float) ? "0" : float;
}

export function SubscriptionEditFormPresentation({
  subscription,
  subscriptionNameSuggestions,
}: {
  subscription?: ISubscription;
  subscriptionNameSuggestions: Promise<string[]>;
}) {
  const [_, action] = useActionState(async (_: unknown, formData: FormData) => {
    // server actionsを実行している場合、tanstack formが検知できないので、手動で変更する
    form.state.canSubmit = false;
    form.state.isSubmitting = true;

    if (
      subscription
        ? await updateSubscription(_, formData)
        : await registerSubscription(_, formData)
    ) {
      alert("サブスクリプションを登録しました");
      window.location.href = "/app/dashboard";
    } else {
      alert("サブスクリプションの登録に失敗しました");
    }

    form.state.isSubmitting = false;
    form.state.canSubmit = true;
  }, {});

  const form = useForm({
    defaultValues: {
      id: subscription?.id ?? "",
      name: subscription?.name ?? "",
      amount: subscription?.amount.toString() ?? "100",
      currencyId: subscription?.currencyId ?? currencyId.jpy,
      intervalCycle: subscription?.intervalCycle ?? 1,
      intervalId: subscription?.intervalId ?? timeUnit.year,
      nextUpdate: subscription?.nextUpdate.toString() ?? "",
    },
    transform: useTransform((baseForm) => baseForm, [action]),
    validators: {
      onMount: subscriptionFormScheme,
      onChangeAsync: subscriptionFormScheme,
      onChangeAsyncDebounceMs: 500,
    },
  });

  // 入力値に基づいた候補を管理するstate
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState(subscription?.name ?? "");

  return (
    <Card className="overflow-hidden rounded-2xl border shadow-sm">
      <CardHeader>
        <CardTitle>サブスクリプション情報</CardTitle>
        <CardDescription>サービスの基本情報を入力してください</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action as never} className="space-y-6">
          <input type="hidden" name="id" value={subscription?.id} />
          <div className="grid grid-cols-1 gap-4">
            <form.Field name="name">
              {(field) => {
                // 入力値に基づいて候補をフィルタリングする関数
                const handleInputChange = async (
                  e: React.ChangeEvent<HTMLInputElement>,
                ) => {
                  const value = e.target.value;
                  field.handleChange(value);
                  setInputValue(value);

                  if (value.length > 0) {
                    const filtered = (await subscriptionNameSuggestions).filter(
                      (suggestion) =>
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
                  setInputValue(suggestion);
                  setShowSuggestions(false);
                };

                return (
                  <>
                    <h4>サブスクリプション名</h4>
                    <div className="relative">
                      <Input
                        name="name"
                        value={field.state.value}
                        onChange={handleInputChange}
                        onFocus={() => {
                          if (inputValue && filteredSuggestions.length > 0) {
                            setShowSuggestions(true);
                          }
                        }}
                        onBlur={() => {
                          // 少し遅延させて候補をクリックできるようにする
                          setTimeout(() => setShowSuggestions(false), 200);
                        }}
                      />
                      {showSuggestions && (
                        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white shadow-lg">
                          {filteredSuggestions.map((suggestion) => (
                            <div
                              key={suggestion}
                              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                              onMouseDown={(e) => {
                                e.preventDefault(); // onBlurが先に発火するのを防ぐ
                                handleSuggestionClick(suggestion);
                              }}
                            >
                              {suggestion}
                            </div>
                          ))}
                        </div>
                      )}
                      {0 < field.state.meta.errors.length && (
                        <p className="pt-2 text-red-500">
                          31文字以下の名前を入力してください
                        </p>
                      )}
                    </div>
                  </>
                );
              }}
            </form.Field>
          </div>

          <Separator />

          <div className="flex flex-col gap-4 md:grid md:grid-cols-3">
            <div className="col-span-2 flex gap-2">
              <form.Subscribe selector={(state) => [state.values.currencyId]}>
                {([currentCurrency]) => (
                  <>
                    <div className="grid">
                      <h4 className="pb-3">金額</h4>
                      <div>
                        <form.Field name="amount">
                          {(field) => (
                            <>
                              <div className="relative">
                                <CurrencyIcon
                                  className="absolute top-2.5 left-2 h-4 w-4 text-muted-foreground"
                                  currencyId={currentCurrency as CurrencyId}
                                />
                                <Input
                                  className="w-full pl-8"
                                  name="amount"
                                  value={field.state.value}
                                  onChange={(e) => {
                                    field.handleChange(e.target.value);
                                  }}
                                  onBlur={(e) => {
                                    field.handleChange(
                                      validateInputFloat(e.target.value),
                                    );
                                  }}
                                />
                                {0 < field.state.meta.errors.length && (
                                  <p className="px-2 text-red-500">
                                    8桁以内の数値を入力してください
                                  </p>
                                )}
                              </div>
                            </>
                          )}
                        </form.Field>
                      </div>
                    </div>
                    <div className="">
                      <h4 className="pb-3">通貨</h4>
                      <form.Field name="currencyId">
                        {(field) => (
                          <>
                            <Select
                              name="currencyId"
                              defaultValue={`${field.state.value}`}
                              onValueChange={(e) =>
                                field.handleChange(+e as CurrencyId)
                              }
                            >
                              <SelectTrigger className="flex-2">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {Object.entries(currencyId).map(
                                  ([key, value]) => (
                                    <SelectItem
                                      key={key}
                                      value={value.toString()}
                                    >
                                      {currencyNames[value as CurrencyId]}
                                    </SelectItem>
                                  ),
                                )}
                              </SelectContent>
                            </Select>
                          </>
                        )}
                      </form.Field>
                    </div>
                  </>
                )}
              </form.Subscribe>
            </div>
            <div className="col-span-1">
              <h4 className="pb-3">請求サイクル</h4>
              <div className="flex gap-2">
                <form.Field name="intervalCycle">
                  {(field) => (
                    <div className="relative">
                      <Input
                        name="intervalCycle"
                        min={1}
                        max={99}
                        value={field.state.value}
                        onChange={(e) => {
                          if (e.target.value === "" || 0 < +e.target.value) {
                            field.handleChange(+e.target.value);
                          }
                        }}
                      />
                      {0 < field.state.meta.errors.length && (
                        <p className="px-2 text-red-500">
                          1以上の数を入力してください
                        </p>
                      )}
                    </div>
                  )}
                </form.Field>
                <form.Field name="intervalId">
                  {(field) => (
                    <Select
                      name="intervalId"
                      defaultValue={`${field.state.value}`}
                      onValueChange={(e) => field.handleChange(+e as TimeUnit)}
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(timeUnit).map(([key, value]) => (
                          <SelectItem key={key} value={value.toString()}>
                            {`${value === timeUnit.month ? "月" : "年"}毎`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </form.Field>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex flex-col">
            <h4 className="pb-2">次回更新日</h4>
            <div>
              <form.Field name="nextUpdate">
                {(field) => (
                  <>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          className={`w-full pl-3 text-left font-normal ${!field.state.value && "text-muted-foreground"}`}
                          variant={"outline"}
                        >
                          {field.state.value ? (
                            format(field.state.value, "PPP", { locale: ja })
                          ) : (
                            <span>日付を選択</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          <input
                            type="hidden"
                            name="nextUpdate"
                            value={field.state.value}
                          />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={
                            field.state.value
                              ? new Date(field.state.value)
                              : undefined
                          }
                          onSelect={(date) =>
                            date
                              ? field.setValue(date.toISOString())
                              : field.setValue("")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    {0 < field.state.meta.errors.length && (
                      <p className="pt-2 text-red-500">
                        次回の請求日を選択してください。通知の設定などに使用されます。
                      </p>
                    )}
                  </>
                )}
              </form.Field>
            </div>
          </div>

          <Separator />

          <div className="flex justify-end gap-2">
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <>
                  <Button type="button" variant="outline" asChild>
                    <Link href="/app/dashboard">キャンセル</Link>
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
