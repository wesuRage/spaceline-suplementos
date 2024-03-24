"use client";

import Spinner from "../../components/Spinner";
import { Key, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ItemsContainer from "./components/ItemsContainer";
import ItemCard from "./components/ItemCard";
import { Shuffle } from "@/functions/Shuffle";

export default function Produtos() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/produtos")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      });
  }, []);

  if (!data) return <Spinner />;

  if (!search) {
    let whey: Array<Object> = [];
    let creatina: Array<Object> = [];
    let pretreino: Array<Object> = [];
    let hipercalorico: Array<Object> = [];
    let multivitaminico: Array<Object> = [];
    let termogenico: Array<Object> = [];
    let vestimenta: Array<Object> = [];

    data.map((item: any) => {
      if (item.tags.includes("whey")) {
        whey.push(item);
        whey = Shuffle(whey);
      }

      if (item.tags.includes("creatina")) {
        creatina.push(item);
        creatina = Shuffle(creatina);
      }

      if (item.tags.includes("treino")) {
        pretreino.push(item);
        pretreino = Shuffle(pretreino);
      }

      if (item.tags.includes("hipercalorico")) {
        hipercalorico.push(item);
        hipercalorico = Shuffle(hipercalorico);
      }

      if (item.tags.includes("multivitaminico")) {
        multivitaminico.push(item);
        multivitaminico = Shuffle(multivitaminico);
      }

      if (item.tags.includes("termogenico")) {
        termogenico.push(item);
        termogenico = Shuffle(termogenico);
      }

      if (item.tags.includes("vestimenta")) {
        vestimenta.push(item);
        vestimenta = Shuffle(vestimenta);
      }
    });

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    return (
      <main className="flex justify-center">
        <div>
          <div className="w-full mt-2">
            <h1 className="ms-4 text-xl font-bold text-main-green">
              Whey Protein
            </h1>
            <ItemsContainer>
              {whey.map((item: any, key: Key) => {
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
          <div className="w-full mt-2">
            <h1 className="ms-4 text-xl font-bold text-main-green">
              Creatinas
            </h1>
            <ItemsContainer>
              {creatina.map((item: any, key: Key) => {
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
          <div className="w-full mt-2">
            <h1 className="ms-4 text-xl font-bold text-main-green">
              Pré-treinos
            </h1>
            <ItemsContainer>
              {pretreino.map((item: any, key: Key) => {
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
          <div className="w-full mt-2">
            <h1 className="ms-4 text-xl font-bold text-main-green">
              Hipercalóricos
            </h1>
            <ItemsContainer>
              {hipercalorico.map((item: any, key: Key) => {
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
          <div className="w-full mt-2">
            <h1 className="ms-4 text-xl font-bold text-main-green">
              Multivitamínicos
            </h1>
            <ItemsContainer>
              {multivitaminico.map((item: any, key: Key) => {
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
          <div className="w-full mt-2">
            <h1 className="ms-4 text-xl font-bold text-main-green">
              Termogênicos
            </h1>
            <ItemsContainer>
              {termogenico.map((item: any, key: Key) => {
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
          <div className="w-full mt-2">
            <h1 className="ms-4 text-xl font-bold text-main-green">
              Vestimentas
            </h1>
            <ItemsContainer>
              {vestimenta.map((item: any, key: Key) => {
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
        </div>
      </main>
    );
  }

  const query = search.split(" ");

  const resposta = data.filter((item: any) => {
    const tagsArray = item.tags.split(" ");
    return tagsArray.some((tag: string) => query.includes(tag));
  });

  let produtosShuffle: Array<Object> = [];
  data.map((item: any) => {
    produtosShuffle.push(item);
    produtosShuffle = Shuffle(produtosShuffle);

    return produtosShuffle;
  });

  return (
    <main className="flex justify-center">
      <div>
        <div className="mt-2">
          <h1 className="ms-4 text-xl font-bold">
            Resultados para <span className="text-main-green">{search}</span>:
          </h1>
          <ItemsContainer>
            {resposta.length > 0 ? (
              resposta.map((item: any, key: Key) => {
                return (
                  <ItemCard
                    key={key}
                    imagemURL={item.imagemURL}
                    nomeProduto={item.nomeProduto}
                    precoRiscado={item.precoRiscado}
                    preco={item.preco}
                  />
                );
              })
            ) : (
              <h1 className="ms-5 font-bold text-xl">
                <i className="fa-solid fa-triangle-exclamation text-red-500"></i>{" "}
                Nenhum produto encontrado
              </h1>
            )}
          </ItemsContainer>
        </div>
        <div className="mt-2">
          <h1 className="ms-5 font-bold text-xl text-main-green">
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
      </div>
    </main>
  );
}
