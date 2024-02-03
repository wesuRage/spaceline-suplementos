"use client";

import Spinner from "../../components/Spinner";
import { useSearchParams } from "next/navigation";
import { Key, useEffect, useState } from "react";
import ItemsContainer from "./components/ItemsContainer";
import ItemCard from "./components/ItemCard";

export default function Produtos() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search")?.trim();

  const [data, setData] = useState<any>(null);
  const [isLoading, setLoading] = useState<any>(true);

  useEffect(() => {
    fetch("http://localhost:3000/produtos")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <Spinner />;

  if (search == null) {
    return (
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
    );
  }

  const produtos = data.data.map((item: any) => {});

  const produtosEncontrados = data.produtos;

  return (
    <>
      <h1 className="ms-10 mt-10">
        <span className="text-[var(--green-200)]">{produtosEncontrados}</span>{" "}
        produtos encontrados.
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
