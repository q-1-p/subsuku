import { SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { use } from "react";

export default function DashboardPage() {
  const user = use(currentUser());

  console.log(user?.id);

  return (
    <>
      <div>Dashboard</div>
      <SignOutButton />
      <p>{user?.externalId}</p>
    </>
  );
}
