"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProdutoProps {
  nomeProduto: string;
  preco: string;
  imagemURL: string;
  email: string | undefined;
}

export default function Produto({
  nomeProduto,
  preco,
  imagemURL,
  email,
}: ProdutoProps) {
  const router = useRouter();

  async function deletar() {
    await fetch(`/api/carrinho/${email}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        nomeProduto: nomeProduto,
      }),
    });
    router.push("/carrinho/deletar");
  }

  return (
    <div className="block">
      <div className="flex items-center min-w-full md:min-w-full ">
        <Link
          href={`/produtos/${nomeProduto}`}
          className="flex w-full items-center max-w-[550px] min-w-[550px]"
        >
          <div className="flex items-center w-full max-w-[1000px] border-2 border-[#333] rounded-xl hover:border-main-green transition ease-in-out duration-200 my-2">
            <div className="relative min-w-[50px] min-h-[50px]">
              <Image
                src={imagemURL}
                layout="fill"
                alt={nomeProduto}
                className="p-2 rounded-xl"
              />
            </div>
            <div className="flex justify-between w-full">
              <h1 className="truncate max-w-[100px] md:max-w-[250px] md:trucante">
                {nomeProduto}
              </h1>
              <div className="hidden md:inline h-[20px] border-[1px] border-[#333] w-0 mx-2 mt-0.5"></div>
              <h1 className="text-main-green">R${preco}</h1>
            </div>
            <Link
              href={`/comprar?itens=${nomeProduto}`}
              className="h-full bg-main-green p-3 text-black font-bold ms-2 rounded-e-xl"
            >
              COMPRAR
            </Link>
          </div>
        </Link>
        <div className="ms-2 inline">
          <button
            onClick={deletar}
            className="border-2 border-[#333] text-[#333] p-2 rounded-xl px-3 transition ease-in-out duration-200 hover:border-red-500 hover:text-red-500"
          >
            <i className="fa-solid fa-x"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
