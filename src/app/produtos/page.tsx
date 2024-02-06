"use client";

import Spinner from "../../components/Spinner";
import { Key, useEffect, useState } from "react";
import ItemsContainer from "./components/ItemsContainer";
import ItemCard from "./components/ItemCard";
import { Shuffle } from "@/functions/Shuffle";

export default function Produtos() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("http://localhost:3000/produtos")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <Spinner />;

  let produtosShuffle: Array<Object> = [];
  const produtos = data.data.map((item: any) => {
    produtosShuffle.push(item);
    produtosShuffle = Shuffle(produtosShuffle);

    return produtosShuffle;
  });

  console.log(produtos);

  const produtosEncontrados = data.produtos;

  return (
    <>
      <h1 className="ms-10 mt-10">
        <span className="text-[var(--green-200)]">{produtosEncontrados}</span>{" "}
        produtos.
      </h1>
      <main className="flex justify-center">
        <ItemsContainer>
          {data.data.map((item: any, key: Key) => {
            return (
              <ItemCard
                key={key}
                imagemID={item.imagemID}
                nomeProduto={item.nomeProduto}
                precoRiscado={item.precoRiscado}
                preco={item.preco}
              />
            );
          })}
        </ItemsContainer>
      </main>
    </>
  );
}
