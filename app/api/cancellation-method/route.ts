import { type NextRequest, NextResponse } from "next/server";

import { CancellationMethodId } from "@/domain/cancellation-method/cancellation-method-id";
import { CancellationMethodRegistered } from "@/domain/cancellation-method/cancellation-method-registered";
import type { ICancellationMethodRepository } from "@/domain/cancellation-method/cancellation-method-repository";
import type { IUserRepository } from "@/domain/user/user-repository";
import { CancellationMethodRepository } from "@/infrastructure/cancellation-method-repository";
import { UserRepository } from "@/infrastructure/user-repository";
import { err } from "@/lib/result";

const userRepository: IUserRepository = new UserRepository();
const cancellationMethodRepository: ICancellationMethodRepository =
  new CancellationMethodRepository();

export async function GET(req: NextRequest) {
  const userIdResult = await userRepository.findId(
    req.headers.get("Authorization") as string,
  );
  if (userIdResult.type === err) {
    console.error("認証エラー:", userIdResult.error);
    return NextResponse.json({}, { status: 401 });
  }

  const cancellationMethodIdResult = CancellationMethodId.factory(
    req.nextUrl.searchParams.get("cancellationMethodId") as string,
  );
  if (cancellationMethodIdResult.type === err) {
    console.error("キャンセル方法IDエラー:", cancellationMethodIdResult.error);
    return NextResponse.json({}, { status: 400 });
  }

  const cancellationMethodResult = await cancellationMethodRepository.find(
    userIdResult.value,
    cancellationMethodIdResult.value,
  );
  if (cancellationMethodResult.type === err) {
    console.error("キャンセル方法取得エラー:", cancellationMethodResult.error);
    return NextResponse.json({}, { status: 400 });
  }

  return NextResponse.json(cancellationMethodResult.value, { status: 200 });
}

export async function POST(req: NextRequest) {
  const userIdResult = await userRepository.findId(
    req.headers.get("Authorization") as string,
  );
  if (userIdResult.type === err) {
    console.error("認証エラー:", userIdResult.error);
    return NextResponse.json({}, { status: 401 });
  }

  const formData = await req.formData();
  const cancellationMethodRegistered = CancellationMethodRegistered.factory(
    String(formData.get("name")),
    String(formData.get("serviceUrl")),
    Boolean(formData.get("private")),
    formData.getAll("steps[]") as unknown as string[],
    String(formData.get("precautions")),
    String(formData.get("freeText")),
    String(formData.get("linkSubscriptionId")),
    userIdResult.value,
  );
  if (cancellationMethodRegistered.type === err) {
    console.error(
      "キャンセル方法登録エラー:",
      cancellationMethodRegistered.error,
    );
    return NextResponse.json({}, { status: 400 });
  }

  const isRegistered = await cancellationMethodRepository.add(
    cancellationMethodRegistered.value,
  );

  return NextResponse.json({ status: isRegistered ? 200 : 400 });
}
