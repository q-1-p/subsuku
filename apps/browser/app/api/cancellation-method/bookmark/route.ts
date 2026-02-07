import { type NextRequest, NextResponse } from "next/server";

import { validateCancellationMethodId } from "@/domain/type";
import { err } from "@/functional/result";
import { CancellationMethodRepository } from "@/infrastructure/cancellation-method/cancellation-method-repository";
import { UserRepository } from "@/infrastructure/user/user-repository";

import type { ICancellationMethodRepository } from "@/domain/cancellation-method/cancellation-method-repository";
import type { IUserRepository } from "@/domain/user/user-repository";

const userRepository: IUserRepository = new UserRepository();
const cancellationMethodRepository: ICancellationMethodRepository =
  new CancellationMethodRepository();

export async function POST(req: NextRequest) {
  const userIdResult = await userRepository.findId(
    req.headers.get("Authorization") as string,
  );
  if (userIdResult.type === err) {
    return NextResponse.json({}, { status: 401 });
  }

  const formData = await req.formData();
  const cancellationMethodIdResult = validateCancellationMethodId(
    formData.get("cancellationMethodId"),
  );
  if (cancellationMethodIdResult.type === err) {
    return NextResponse.json({}, { status: 400 });
  }

  const result = await cancellationMethodRepository.addBookmark(
    userIdResult.value,
    cancellationMethodIdResult.value,
  );

  return NextResponse.json({}, { status: result ? 200 : 400 });
}

export async function DELETE(req: NextRequest) {
  const userIdResult = await userRepository.findId(
    req.headers.get("Authorization") as string,
  );
  if (userIdResult.type === err) {
    return NextResponse.json({}, { status: 401 });
  }

  const formData = await req.formData();
  const cancellationMethodIdResult = validateCancellationMethodId(
    formData.get("cancellationMethodId"),
  );
  if (cancellationMethodIdResult.type === err) {
    return NextResponse.json({}, { status: 400 });
  }

  const result = await cancellationMethodRepository.deleteBookmark(
    userIdResult.value,
    cancellationMethodIdResult.value,
  );

  return NextResponse.json({}, { status: result ? 200 : 400 });
}
