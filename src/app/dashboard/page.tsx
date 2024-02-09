"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const { data: session } = useSession();
  if (!session) {
    router.push("/login");
    return;
  }

  if (session?.user.role != "admin") {
    router.push("/perfil");
    return;
  }

  return (
    <>
      <h1>Dashboard</h1>
      <button onClick={() => signOut()}>Logout</button>
    </>
  );
}
