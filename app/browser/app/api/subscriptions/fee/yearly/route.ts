import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return fetch(`${process.env.BACKEND_URL}/subscriptions/fee/yearly`, {
    cache: "no-store",
    headers: {
      Authorization: req.headers.get("Authorization") as string,
    },
    method: "GET",
  })
    .then((res) => {
      if (!res.ok) {
        return NextResponse.json({}, { status: res.status });
      }

      return res.json();
    })
    .then((data) => {
      return NextResponse.json(data, { status: 200 });
    })
    .catch((error) => {
      console.error(`Error: ${error}`);
      return NextResponse.json({}, { status: 400 });
    });
}
