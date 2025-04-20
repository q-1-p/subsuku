"use client";

import { mergeForm, useForm, useTransform } from "@tanstack/react-form";
import { initialFormState } from "@tanstack/react-form/nextjs";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";

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
import { type Currency, currency, currencyNames } from "@/domain/currency";
import { intervalUnit, intervalUnitNames } from "@/domain/interval";
import { registerSubscription } from "./subscription-form-actions";
import { subscriptionFormOptions } from "./subscription-form-options";
import { subscriptionFormScheme } from "./subscription-form-scheme";

export default function SubscriptionForm() {
  const [state, action] = useActionState(
    registerSubscription,
    initialFormState,
  );
  const form = useForm({
    ...subscriptionFormOptions,
    transform: useTransform(
      (baseForm) => mergeForm(baseForm, state ?? {}),
      [state],
    ),
    validators: {
      onMount: subscriptionFormScheme,
      onChangeAsync: subscriptionFormScheme,
      onChangeAsyncDebounceMs: 500,
    },
  });

  const validateInputFloat = (value: string): string => {
    const float = value
      .replace(/^0+(?=\d)/, "")
      .replace(/\.$/, ".0")
      .replace(/^\./, "0.");
    return float.length < 1 || Number.isNaN(+float) ? "0" : float;
  };

  return (
    <Card className="overflow-hidden rounded-2xl border shadow-sm">
      <CardHeader>
        <CardTitle>サブスクリプション情報</CardTitle>
        <CardDescription>サービスの基本情報を入力してください</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          action={action as never}
          className="space-y-6"
          onSubmit={form.handleSubmit}
        >
          <div className="grid grid-cols-1 gap-4">
            <form.Field name="name">
              {(field) => (
                <>
                  <h4>サブスクリプション名</h4>
                  <div>
                    <Input
                      name="name"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {0 < field.state.meta.errors.length && (
                      <p className="pt-2 text-red-500">
                        名前を入力してください
                      </p>
                    )}
                  </div>
                </>
              )}
            </form.Field>
          </div>

          <Separator />

          <div className="grid grid-cols-3 gap-4 md:grid-cols-3">
            <div className="col-span-2 flex gap-2">
              <form.Subscribe selector={(state) => [state.values.currency]}>
                {([currencyId]) => (
                  <>
                    <div className="grid">
                      <h4 className="pb-3">金額</h4>
                      <div>
                        <form.Field name="price">
                          {(field) => (
                            <>
                              <div className="relative">
                                <CurrencyIcon
                                  className="absolute top-2.5 left-2 h-4 w-4 text-muted-foreground"
                                  currencyId={currencyId}
                                />
                                <Input
                                  className="w-full pl-8"
                                  name="price"
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
                                    0以上の数を入力してください
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
                      <form.Field name="currency">
                        {(field) => (
                          <>
                            <Select
                              name="currency"
                              defaultValue="0"
                              onValueChange={(e) =>
                                field.handleChange(Number(e))
                              }
                            >
                              <SelectTrigger className="flex-2">
                                <SelectValue defaultValue={"0"} />
                              </SelectTrigger>
                              <SelectContent>
                                {Object.entries(currency).map(
                                  ([key, value]) => (
                                    <SelectItem
                                      key={key}
                                      value={value.toString()}
                                    >
                                      {currencyNames[value as Currency]}
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
                <form.Field name="intervalUnit">
                  {(field) => (
                    <Select
                      name="intervalUnit"
                      defaultValue="0"
                      onValueChange={(e) => field.handleChange(Number(e))}
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(intervalUnit).map(([key, value]) => (
                          <SelectItem key={key} value={value.toString()}>
                            {intervalUnitNames[value]}
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
