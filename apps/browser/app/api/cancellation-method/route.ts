import { type NextRequest, NextResponse } from "next/server";
import { v4 } from "uuid";

import {
  validateCancellationMethod,
  validateCancellationMethodId,
} from "@/domain/type";
import { err } from "@/functional/result";
import { CancellationMethodRepository } from "@/infrastructure/cancellation-method/cancellation-method-repository";
import { UserRepository } from "@/infrastructure/user/user-repository";

import type { ICancellationMethodRepository } from "@/domain/cancellation-method/cancellation-method-repository";
import type { IUserRepository } from "@/domain/user/user-repository";

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

  const cancellationMethodIdResult = validateCancellationMethodId(
    req.nextUrl.searchParams.get("cancellationMethodId"),
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
  const cancellationMethodRegistered = validateCancellationMethod({
    id: v4(),
    name: String(formData.get("name")),
    urlToCancel: formData.get("urlToCancel") as string,
    isPrivate: Boolean(formData.get("private")),
    steps: formData.getAll("steps[]") as unknown as string[],
    precautions: String(formData.get("precautions")),
    freeText: String(formData.get("freeText")),
    updatedAt: new Date(),
    linkSubscriptionId: formData.get("linkSubscriptionId") as string,
  });
  if (cancellationMethodRegistered.type === err) {
    return NextResponse.json({}, { status: 400 });
  }

  const isRegistered = await cancellationMethodRepository.add(
    userIdResult.value,
    cancellationMethodRegistered.value,
  );

  return NextResponse.json({ status: isRegistered ? 200 : 400 });
}

export async function PUT(req: NextRequest) {
  const userIdResult = await userRepository.findId(
    req.headers.get("Authorization") as string,
  );
  if (userIdResult.type === err) {
    console.error("認証エラー:", userIdResult.error);
    return NextResponse.json({}, { status: 401 });
  }

  const formData = await req.formData();
  const cancellationMethodUpdated = validateCancellationMethod({
    id: String(formData.get("id")),
    name: String(formData.get("name")),
    urlToCancel: formData.get("urlToCancel") as string,
    isPrivate: Boolean(formData.get("private")),
    steps: formData.getAll("steps[]") as unknown as string[],
    precautions: String(formData.get("precautions")),
    freeText: String(formData.get("freeText")),
    updatedAt: new Date(),
    linkSubscriptionId: formData.get("linkSubscriptionId") as string,
  });
  if (cancellationMethodUpdated.type === err) {
    return NextResponse.json({}, { status: 400 });
  }

  const isUpdated = await cancellationMethodRepository.update(
    userIdResult.value,
    cancellationMethodUpdated.value,
  );

  return NextResponse.json({ status: isUpdated ? 200 : 400 });
}

export async function DELETE(req: NextRequest) {
  const userIdResult = await userRepository.findId(
    req.headers.get("Authorization") as string,
  );
  if (userIdResult.type === err) {
    console.error("認証エラー:", userIdResult.error);
    return NextResponse.json({}, { status: 401 });
  }

  const formData = await req.formData();
  const cancellationMethodIdResult = validateCancellationMethodId(
    formData.get("cancellationMethodId") as string,
  );
  if (cancellationMethodIdResult.type === err) {
    return NextResponse.json({}, { status: 400 });
  }

  const isDeleted = await cancellationMethodRepository.delete(
    userIdResult.value,
    cancellationMethodIdResult.value,
  );

  return NextResponse.json({}, { status: isDeleted ? 200 : 400 });
}
