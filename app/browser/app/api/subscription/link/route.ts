import { type NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  const formData = await req.formData();
  return fetch(`${process.env.BACKEND_URL}/subscription/link`, {
    cache: "no-store",
    headers: {
      Authorization: req.headers.get("Authorization") as string,
      "Content-Type": "application/json",
    },
    method: "PATCH",
    body: JSON.stringify({
      subscription_id: formData.get("subscriptionId") as string,
      cancellation_method_id: formData.get("cancellationMethodId") as string,
    }),
  })
    .then((res) => NextResponse.json({}, { status: res.status }))
    .catch((error) => {
      console.error(error);
      return NextResponse.json({}, { status: 400 });
    });
}
