"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PageContainer from "./components/PageContainer";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import Produto from "./components/Produto";

export default function Carrinho() {
  const router = useRouter();
  const [data, setData] = useState<any>();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

  useEffect(() => {
    if (!session?.user) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    fetch(`/api/carrinho/${session?.user.email}`)
      .then((res) => res.json())
      .then((res) => {
        let prod: any = [];
        res.map((item: any) => {
          fetch(`/api/produtos/${item.nomeProduto}`)
            .then((res) => res.json())
            .then((res) => prod.push(res));
        });

        setData(prod);
      });
  }, []);

  if (!data) return <Spinner />;

  setTimeout(() => {
    router.refresh();
  }, 1000);

  let todosOsProdutos: any = [];
  data.map((item: any) => {
    todosOsProdutos.push(item.nomeProduto);
  });

  todosOsProdutos = todosOsProdutos.join(",");
  let precoTotal: number;

  data.map((item: any) => {
    if (precoTotal == undefined) {
      precoTotal = parseFloat(item.preco.replace(",", "."));
    } else {
      precoTotal += parseFloat(item.preco.replace(",", "."));
    }
  });

  return (
    <main className="flex justify-center">
      {data.length > 0 ? (
        <PageContainer>
          <>
            {data.map((item: any) => {
              return (
                <div className="flex justify-center flex-wrap flex-1">
                  <Produto
                    email={session?.user.email}
                    nomeProduto={item.nomeProduto}
                    preco={item.preco}
                    imagemURL={item.imagemURL}
                  />
                </div>
              );
            })}
            <div className="w-full">
              <Link
                className="w-full block text-center mt-5 bg-main-green text-black font-bold py-2 rounded-3xl"
                href={`/comprar?itens=${todosOsProdutos}`}
              >
                COMPRAR TUDO
                <div className="hidden md:inline h-[20px] border-[1px] border-black w-0 mx-2 mt-0.5"></div>
                <h1 className="inline">
                  R${`${new Number(precoTotal!).toFixed(2)}`.replace(".", ",")}
                </h1>
              </Link>
            </div>
          </>
        </PageContainer>
      ) : (
        <PageContainer>
          <div className="flex justify-center w-full">
            <div>
              <h1 className="text-center">
                Nenhum item adicionado ao carrinho
              </h1>
              <div className="flex justify-center">
                <Link
                  href={"/produtos"}
                  className="transition ease-in-out duration-200 p-2 font-bold rounded mt-5 border-2 border-main-green text-main-green hover:text-black hover:bg-main-green"
                >
                  VER PRODUTOS
                </Link>
              </div>
            </div>
          </div>
        </PageContainer>
      )}
    </main>
  );
}
