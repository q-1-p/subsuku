import { type NextRequest, NextResponse } from "next/server";

import { err } from "@/lib/result";

import { CancellationMethodRepository } from "@/infrastructure/cancellation-method-repository";
import { UserRepository } from "@/infrastructure/user-repository";

import type { ICancellationMethodRepository } from "@/domain/cancellation-method/cancellation-method-repository";
import type { IUserRepository } from "@/domain/user/user-repository";

const userRepository: IUserRepository = new UserRepository();
const cancellationMethodRepository: ICancellationMethodRepository =
  new CancellationMethodRepository();

export async function GET(req: NextRequest) {
  if (req.headers.get("Authorization")) {
    const userIdResult = await userRepository.findId(
      req.headers.get("Authorization") as string,
    );
    if (userIdResult.type === err) {
      return NextResponse.json({}, { status: 401 });
    }
    const cancellationMethodsResult = await cancellationMethodRepository.search(
      userIdResult.value,
      req.nextUrl.searchParams.get("searchQuery") as string,
      req.nextUrl.searchParams.get("onlyMine") === "true",
      req.nextUrl.searchParams.get("onlyBookmarked") === "true",
    );
    if (cancellationMethodsResult.type === err) {
      return NextResponse.json({}, { status: 400 });
    }

    return NextResponse.json(cancellationMethodsResult.value, { status: 200 });
  }

  const cancellationMethodsResult =
    await cancellationMethodRepository.searchForName(
      req.nextUrl.searchParams.get("searchQuery") as string,
    );
  if (cancellationMethodsResult.type === err) {
    return NextResponse.json({}, { status: 400 });
  }

  return NextResponse.json(cancellationMethodsResult.value, { status: 200 });
}
