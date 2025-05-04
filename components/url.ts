import { headers } from "next/headers";

export const getOrigin = async () => {
  const headersList = await headers();
  const host = headersList.get("x-forwarded-host") || headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") || "http";

  return `${protocol}://${host}`;
};
