// "use client";

import { getServerSession } from "next-auth";

// import { useSession } from "next-auth/react";

export default function Home() {
  const session = getServerSession();
  // console.log("user", session);
  return <main>Dashboard -- {JSON.stringify(session)}</main>;
}
