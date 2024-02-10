"use client";

import Image from "next/image";
import PageContainer from "./components/PageContainer";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";
import Link from "next/link";

export default function Deletar({ params }: { params: any }) {
  const [data, setData] = useState<any>();
  const router = useRouter();

  async function deletar() {
    await fetch(`/api/produtos/${params.produto}`, {
      method: "DELETE",
    });

    await fetch(`/api/images`, {
      method: "DELETE",
      body: JSON.stringify({ url: data.imagemURL }),
    });

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
        <h1 className="font-bold text-center text-[var(--green-200)] mb-5">
          <i className="fa-solid fa-triangle-exclamation"></i> Deseja mesmo
          deletar?
        </h1>
        <div className="flex justify-center flex-col items-center">
          <Image
            src={data.imagemURL}
            alt={data.nomeProduto}
            width={100}
            height={100}
            className="border-2 border-[var(--green-200)] rounded"
          />
          <h1 className="text-md max-w-[400px] truncate">{data.nomeProduto}</h1>
          <p className="text-sm max-w-[400px] truncate">{data.descricao}</p>
          <p className="text-[var(--green-200)]">R${data.preco}</p>

          <div className="mt-5">
            <Link
              href={"/dashboard"}
              className="transition ease-in-out duration-200 font-bold text-[var(--green-200)] hover:text-black border-2 border-[var(--green-200)] hover:bg-[var(--green-200)] rounded p-2 "
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
