import { type NextRequest, NextResponse } from "next/server";

import type { ICancellationMethodRepository } from "@/domain/cancellation-method/cancellation-method-repository";
import { validateCancellationMethodId } from "@/domain/type";
import type { IUserRepository } from "@/domain/user/user-repository";
import { CancellationMethodRepository } from "@/infrastructure/cancellation-method-repository";
import { UserRepository } from "@/infrastructure/user-repository";
import { err } from "@/lib/result";

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

  const result = await cancellationMethodRepository.addGood(
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

  const result = await cancellationMethodRepository.deleteGood(
    userIdResult.value,
    cancellationMethodIdResult.value,
  );

  return NextResponse.json({}, { status: result ? 200 : 400 });
}
