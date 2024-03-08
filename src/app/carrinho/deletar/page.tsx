"use client";

import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";

export default function Deletar() {
  const router = useRouter();
  router.push("/carrinho");
  return (
    <div>
      <Spinner />
    </div>
  );
}
