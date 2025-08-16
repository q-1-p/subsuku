import { type NextRequest, NextResponse } from "next/server";

import { err } from "@/lib/result";

import { UserRepository } from "@/infrastructure/user-repository";

import type { IUserRepository } from "@/domain/user/user-repository";

const userRepository: IUserRepository = new UserRepository();

export async function PATCH(req: NextRequest) {
  const userIdResult = await userRepository.findId(
    req.headers.get("Authorization") as string,
  );
  if (userIdResult.type === err) {
    return NextResponse.json({}, { status: 401 });
  }

  const formData = await req.formData();
  const result = await userRepository.updateMailAddress(
    userIdResult.value,
    formData.get("mailAddress") as string,
  );

  return NextResponse.json({}, { status: result ? 200 : 400 });
}

export async function DELETE(req: NextRequest) {
  const clerkUserId = req.headers.get("Authorization") as string;
  const userIdResult = await userRepository.findId(clerkUserId);
  if (userIdResult.type === err) {
    return NextResponse.json({}, { status: 401 });
  }

  const result = await userRepository.delete(userIdResult.value, clerkUserId);

  return NextResponse.json({}, { status: result ? 200 : 400 });
}
