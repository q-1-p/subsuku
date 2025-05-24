"use client";

import { useForm, useTransform } from "@tanstack/react-form";
import { type } from "arktype";
import { useActionState } from "react";
import { toast } from "sonner";

import { Label } from "@radix-ui/react-label";
import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Input } from "../../ui/input";
import { updateEmail } from "./_lib/actions";

const validator = type({
  mailAddress: "string.email",
});

export function UserSettingBoard() {
  const [_, action] = useActionState(async (_: unknown, formData: FormData) => {
    // server actionsを実行している場合、tanstack formが検知できないので、手動で変更する
    form.state.canSubmit = false;
    form.state.isSubmitting = true;

    const result = await updateEmail(undefined, formData);
    if (result === true) {
      toast("メールアドレスを更新しました");
    } else if (result === false) {
      toast("メールアドレスの更新に失敗しました");
    }

    form.state.isSubmitting = false;
    form.state.canSubmit = true;
  }, {});

  const form = useForm({
    defaultValues: {
      mailAddress: "",
    },
    transform: useTransform((baseForm) => baseForm, [action]),
    validators: {
      onMount: validator,
      onChangeAsync: validator,
      onChangeAsyncDebounceMs: 500,
    },
  });

  return (
    <Card className="overflow-hidden rounded-2xl border shadow-sm">
      <CardHeader>
        <CardTitle>アカウント設定</CardTitle>
        <CardDescription>設定を変更してください</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action as never} className="gap-2 space-y-6 p-4">
          <form.Field name="mailAddress">
            {(field) => (
              <div className="flex flex-col gap-2">
                <Label htmlFor="mailAddress">通知先メールアドレス</Label>
                <Input
                  type="text"
                  name="mailAddress"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-red-500">
                    通知先メールアドレスを入力してください
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <div className="flex justify-end">
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button type="submit" disabled={!canSubmit || isSubmitting}>
                  {isSubmitting ? "保存中..." : "保存"}
                </Button>
              )}
            </form.Subscribe>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
