"use client";
import { useSession } from "next-auth/react";
import SignOut from "./_components/SignOut";

export default function Home() {
  const { data } = useSession();
  console.log(data);

  return (
    <>
      {/* {data && data.user.name}ß */}
      <SignOut />
    </>
  );
}
