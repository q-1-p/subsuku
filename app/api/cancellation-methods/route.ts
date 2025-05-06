import { type NextRequest, NextResponse } from "next/server";

import type { ICancellationMethodRepository } from "@/domain/cancellation-method/cancellation-method-repository";
import type { IUserRepository } from "@/domain/user/user-repository";
import { CancellationMethodRepository } from "@/infrastructure/cancellation-method-repository";
import { UserRepository } from "@/infrastructure/user-repository";
import { err } from "@/lib/result";

const userRepository: IUserRepository = new UserRepository();
const cancellationMethodRepository: ICancellationMethodRepository =
  new CancellationMethodRepository();

export async function GET(req: NextRequest) {
  const useIdrResult = await userRepository.findId(
    req.headers.get("Authorization") as string,
  );
  if (useIdrResult.type === err) {
    return NextResponse.json({}, { status: 401 });
  }
  const cancellationMethodsResult = await cancellationMethodRepository.search(
    useIdrResult.value,
    req.nextUrl.searchParams.get("searchQuery") as string,
    req.nextUrl.searchParams.get("onlyMine") === "true",
    req.nextUrl.searchParams.get("onlyBookmarked") === "true",
  );
  if (cancellationMethodsResult.type === err) {
    return NextResponse.json({}, { status: 400 });
  }

  return NextResponse.json(cancellationMethodsResult.value, { status: 200 });
}
