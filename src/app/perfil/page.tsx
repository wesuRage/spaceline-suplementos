"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Perfil() {
  const router = useRouter();
  const { data: session } = useSession();
  if (!session) {
    router.push("/login");
  }

  if (session?.user.role == "admin") {
    router.push("/dashboard");
  }

  return (
    <>
      <button
        onClick={() => {
          signOut();
        }}
      >
        Logout
      </button>
    </>
  );
}
