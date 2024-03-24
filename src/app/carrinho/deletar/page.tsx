"use client";

import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Deletar() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/carrinho");
    }, 1000);
  }, []);

  return (
    <main className="flex justify-center">
      <Spinner />
    </main>
  );
}
