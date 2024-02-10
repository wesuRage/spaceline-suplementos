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
    fetch("/api/produtos")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <Spinner />;

  let produtosShuffle: Array<Object> = [];
  const produtos = data.map((item: any) => {
    produtosShuffle.push(item);
    produtosShuffle = Shuffle(produtosShuffle);

    return produtosShuffle;
  });

  console.log(produtos);

  return (
    <main className="flex justify-center">
      <ItemsContainer>
        {data.map((item: any, key: Key) => {
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
    </main>
  );
}
