"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PedidoPage({ params }: { params: any }) {
  const [produto, setProduto] = useState<any>();
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

  useEffect(() => {
    if (session?.user.role != "admin") {
      router.push("/perfil");
    }

    fetch(`/api/produtos/${params.pedido}`)
      .then((res) => res.json())
      .then((res) => setProduto(res));
  }, []);

  return <h1>{params.pedido}</h1>;
}
