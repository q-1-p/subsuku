import { type NextRequest, NextResponse } from "next/server";

import { CancellationMethodId } from "@/domain/cancellation-method/cancellation-method-id";
import type { ICancellationMethodRepository } from "@/domain/cancellation-method/cancellation-method-repository";
import { CancellationMethodRepository } from "@/infrastructure/cancellation-method-repository";
import { err } from "@/lib/result";

const cancellationMethodRepository: ICancellationMethodRepository =
  new CancellationMethodRepository();

export async function GET(req: NextRequest) {
  const cancellationMethodIdResult = CancellationMethodId.factory(
    req.nextUrl.searchParams.get("cancellationMethodId") as string,
  );
  if (cancellationMethodIdResult.type === err) {
    return NextResponse.json({ status: 400 });
  }

  const cancellationMethodResult = await cancellationMethodRepository.find(
    cancellationMethodIdResult.value,
  );
  if (cancellationMethodResult.type === err) {
    return NextResponse.json({ status: 400 });
  }

  return NextResponse.json(cancellationMethodResult.value, { status: 200 });
}
