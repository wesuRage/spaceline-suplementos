"use client";

import Spinner from "@/components/Spinner";
import { Key, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import PageContainer from "./components/PageContainer";
import Image from "next/image";
import ItemsContainer from "../components/ItemsContainer";
import ItemCard from "../components/ItemCard";
import { Shuffle } from "@/functions/Shuffle";

export default function Produto({ params }: { params: any }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [data, setData] = useState<any>();
  const [produtos, setProdutos] = useState<any>();

  function comprarAgora() {
    if (!session) {
      router.push("/login");
    }
  }

  function adicionarCarrinho() {
    if (!session) {
      router.push("/login");
    }
  }

  function editar() {
    router.push(`/dashboard/editar/${params.produto}`);
  }

  useEffect(() => {
    fetch(`/api/produtos/${params.produto}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      });
  }, []);

  useEffect(() => {
    fetch("/api/produtos")
      .then((res) => res.json())
      .then((res) => {
        setProdutos(res);
      });
  }, []);

  if (!data) return <Spinner />;
  if (!produtos) return <Spinner />;

  let produtosShuffle: Array<Object> = [];
  produtos.map((item: any) => {
    produtosShuffle.push(item);
    produtosShuffle = Shuffle(produtosShuffle);

    return produtosShuffle;
  });

  const relacionados = produtos.filter((item: any) => {
    const tagsArray = item.tags.split(" ");
    return tagsArray.some((tag: string) => data.tags.split(" ").includes(tag));
  });

  return (
    <main className="flex justify-center">
      <div>
        <PageContainer>
          <div className="md:flex justify-center">
            <div className="relative w-[300px] h-[300px] me-5">
              <Image
                src={data.imagemURL}
                alt={data.nomeProduto}
                draggable={false}
                layout="fill"
                className="border-2 border-[#333] rounded-xl select-none"
              />
            </div>
            <div className="inline max-w-[300px] sm:block">
              <h1 className="text-2xl text-main-green font-bold">
                {data.nomeProduto}
              </h1>
              <h2>
                <span className="text-main-green">{data.comprados}</span>{" "}
                Vendidos
              </h2>
              {data.precoRiscado != 0 && (
                <h2 className="line-through">R${data.precoRiscado}</h2>
              )}
              <h1 className="text-main-green font-bold text-xl bg-[var(--green-100)] p-[2px] rounded inline">
                R${data.preco}
              </h1>
              <br />
              <br />
              <p>{data.descricao}</p>
              {!session || session.user.role == "user" ? (
                <>
                  <button
                    onClick={adicionarCarrinho}
                    className="border-2 border-main-green text-main-green bg-[#111] font-bold rounded p-2 w-full mt-5"
                  >
                    ADICIONAR AO CARRINHO
                  </button>
                  <button
                    onClick={comprarAgora}
                    className="border-2 border-main-green text-black bg-main-green font-bold rounded p-2 w-full mt-2 mb-5"
                  >
                    COMPRAR AGORA
                  </button>
                </>
              ) : (
                <button
                  onClick={editar}
                  className="border-2 border-main-green text-black bg-main-green font-bold rounded p-2 w-full mt-2 mb-5"
                >
                  EDITAR
                </button>
              )}
            </div>
          </div>
        </PageContainer>

        <h1 className="md:m-4 sm:my-4 text-xl text-main-green font-bold">
          Produtos relacionados
        </h1>

        <ItemsContainer>
          {relacionados.map((item: any, key: Key) => {
            return (
              <ItemCard
                key={key}
                imagemURL={item.imagemURL}
                nomeProduto={item.nomeProduto}
                precoRiscado={item.precoRiscado}
                preco={item.preco}
              />
            );
          })}
        </ItemsContainer>

        <h1 className="md:m-4 sm:my-4 text-xl text-main-green font-bold">
          Você também pode gostar
        </h1>

        <ItemsContainer>
          {produtosShuffle.map((item: any, key: Key) => {
            return (
              <ItemCard
                key={key}
                imagemURL={item.imagemURL}
                nomeProduto={item.nomeProduto}
                precoRiscado={item.precoRiscado}
                preco={item.preco}
              />
            );
          })}
        </ItemsContainer>
      </div>
    </main>
  );
}
