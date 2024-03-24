"use client";

import Image from "next/image";
import PageContainer from "./components/PageContainer";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Deletar({ params }: { params: any }) {
  const [data, setData] = useState<any>();
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
  }, []);

  async function deletar() {
    await fetch(`/api/produtos/${params.produto}`, {
      method: "DELETE",
    });

    await fetch(`/api/images`, {
      method: "DELETE",
      body: JSON.stringify({ url: data.imagemURL }),
    });

    if (data.fatosNutricionaisURL) {
      await fetch(`/api/images`, {
        method: "DELETE",
        body: JSON.stringify({ url: data.fatosNutricionaisURL }),
      });
    }

    router.replace("/dashboard");
  }

  useEffect(() => {
    fetch(`/api/produtos/${params.produto}`)
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);

  if (!data) return <Spinner />;

  return (
    <main className="flex justify-center">
      <PageContainer>
        <h1 className="font-bold text-center text-red-500 mb-5">
          <i className="fa-solid fa-triangle-exclamation"></i> Deseja mesmo
          deletar?
        </h1>
        <div className="flex justify-center flex-col items-center">
          <Image
            src={data.imagemURL}
            alt={data.nomeProduto}
            width={100}
            height={100}
            className="border-2 border-main-green rounded"
          />
          <h1 className="text-md text-main-green font-bold max-w-[400px] line-clam-2 mb-2">
            {data.nomeProduto}
          </h1>
          <p className="text-sm max-w-[400px] line-clamp-3 mb-2">
            {data.descricao}
          </p>

          {data.precoRiscado ? (
            <p className="text-[#888] line-through">R${data.precoRiscado}</p>
          ) : (
            <p className="text-[#888] invisible">R$0</p>
          )}

          <p className="text-main-green bg-[var(--green-100)] rounded p-[2px]">
            R${data.preco}
          </p>

          <div className="mt-5">
            <Link
              href={"/dashboard"}
              className="transition ease-in-out duration-200 font-bold text-main-green hover:text-black border-2 border-main-green hover:bg-main-green rounded p-2 "
            >
              Cancelar
            </Link>
            <button
              onClick={deletar}
              className="transition ease-in-out duration-200 ms-5 font-bold text-red-500 hover:text-black border-2 border-red-500 hover:bg-red-500 rounded p-2 "
            >
              Deletar
            </button>
          </div>
        </div>
      </PageContainer>
    </main>
  );
}
