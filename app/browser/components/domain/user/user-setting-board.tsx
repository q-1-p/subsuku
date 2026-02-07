"use client";

import { useActionState } from "react";
import { Label } from "@radix-ui/react-label";
import { useForm } from "@tanstack/react-form";
import { type } from "arktype";
import { toast } from "sonner";

import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Input } from "../../ui/input";
import { deleteAccount, updateEmail } from "./_lib/actions";

import { mailAddressSchema } from "@/domain/type";

const validator = type({
  mailAddress: mailAddressSchema,
});

export function UserSettingBoard() {
  const [, saveSettings] = useActionState(
    async (_: unknown, formData: FormData) => {
      // server actionsを実行している場合、tanstack formが検知できないので、手動で変更する
      form.state.canSubmit = false;
      form.state.isSubmitting = true;

      if (await updateEmail(undefined, formData)) {
        toast("メールアドレスを更新しました");
      } else {
        toast("メールアドレスの更新に失敗しました");
      }

      form.state.isSubmitting = false;
      form.state.canSubmit = true;
    },
    {},
  );

  const [, deleteAccountAction] = useActionState(
    async (_: unknown, _formData: FormData) => {
      form.state.canSubmit = false;
      form.state.isSubmitting = true;

      if (confirm("アカウントを削除します。よろしいですか？")) {
        if (await deleteAccount()) {
          alert("アカウントを削除しました");
          window.location.href = "/";
        } else {
          alert("アカウントの削除に失敗しました");
        }
      }

      form.state.isSubmitting = false;
      form.state.canSubmit = true;
    },
    {},
  );

  const form = useForm({
    defaultValues: {
      mailAddress: "",
    },
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
        <form className="gap-2 space-y-6 p-4">
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

          <div className="flex justify-between">
            <div className="mr-2">
              <Button
                variant="destructive"
                className="text-white"
                formAction={deleteAccountAction as never}
                disabled={form.state.isSubmitting}
              >
                アカウント削除
              </Button>
            </div>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  disabled={!canSubmit || isSubmitting}
                  formAction={saveSettings as never}
                >
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
