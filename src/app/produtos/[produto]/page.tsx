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
import "./style.css";

export default function Produto({ params }: { params: any }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [data, setData] = useState<any>();
  const [produtos, setProdutos] = useState<any>();
  const [magnify, setMagnify] = useState({});
  const [imagem, setImagem] = useState(data?.imagemURL);
  const [openImage, setOpenImage] = useState(false);

  function comprarAgora() {
    if (!session) {
      router.push("/login");
    }
  }

  async function adicionarCarrinho() {
    if (!session) {
      router.push("/login");
    } else {
      const result = await fetch(`/api/carrinho/${session?.user.email}`).then(
        (res) => res.json()
      );

      let notInCart = true;

      for (const item of result) {
        if (item.nomeProduto === decodeURI(params.produto)) {
          notInCart = false;
        }
      }

      if (notInCart) {
        await fetch(`/api/carrinho/${session?.user.email}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: session?.user.email,
            nomeProduto: decodeURI(params.produto),
          }),
        });
      }

      const botao = document.getElementById("adicionar")!;
      botao.innerHTML = "ADICIONADO";
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
        setImagem(res.imagemURL);
      })
      .catch(() => {
        router.push("/404");
      });
  }, [params.produto]);

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

  const relacionados = produtos
    .map((item: any) => {
      const tagsArray = item.tags.split(" ");
      const dataTagsArray = data.tags.split(" ");
      const tagsEmComum = tagsArray.filter((tag: any) =>
        dataTagsArray.includes(tag)
      );
      return {
        ...item,
        tagsEmComum: tagsEmComum.length,
      };
    })
    .filter((item: any) => item.tagsEmComum > 0);

  relacionados.sort((a: any, b: any) => b.tagsEmComum - a.tagsEmComum);

  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

  function handleMouseMove(e: any) {
    e.preventDefault();

    const { offsetX, offsetY, target } = e.nativeEvent;
    const { offsetWidth, offsetHeight } = target;

    const xPercentage = (offsetX / offsetWidth) * 100;
    const yPercentage = (offsetY / offsetHeight) * 100;

    setMagnify((prev) => ({
      ...prev,
      display: "block",
      backgroundImage: `url("${imagem}")`,
      backgroundPosition: `${xPercentage}% ${yPercentage}%`,
      top: `${offsetY}px`,
      left: `${offsetX}px`,
    }));
  }

  function handleMouseLeave() {
    setMagnify((prev) => ({ ...prev, display: "none" }));
  }

  function change() {
    if (imagem == data.imagemURL) {
      setImagem(data.fatosNutricionaisURL);
    } else {
      setImagem(data.imagemURL);
    }
  }

  return (
    <main className="flex justify-center">
      <div>
        <PageContainer>
          <div className="flex md:justify-between md:flex-row flex-col items-center align-middle">
            {data.fatosNutricionaisURL ? (
              <div>
                <div className="flex me-5 items-center p-2">
                  <div className="relative min-w-[300px] h-[300px] cursor-none border-2 border-[#333] rounded-xl">
                    <button
                      onClick={change}
                      className="transition ease-in-out duration-200 bg-black border-2 border-[#333] h-[50px] w-[50px] rounded-full relative top-[45%] right-6 z-10 active:text-main-green active:border-main-green md:hover:text-main-green md:hover:border-main-green"
                    >
                      <i className="fa-solid fa-arrow-left"></i>
                    </button>
                    <Image
                      src={imagem}
                      alt={data.nomeProduto}
                      draggable={false}
                      quality={100}
                      onClick={() => setOpenImage(true)}
                      layout="fill"
                      placeholder="blur"
                      blurDataURL={imagem}
                      priority={true}
                      className="rounded-xl select-none z-1"
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                    />
                    <div className="magnify" style={magnify}></div>
                    <button
                      onClick={change}
                      className="transition ease-in-out duration-200 bg-black border-2 border-[#333] h-[50px] w-[50px] rounded-full relative top-[45%] left-[220px] z-10 active:text-main-green active:border-main-green md:hover:text-main-green md:hover:border-main-green"
                    >
                      <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  </div>
                  {openImage && (
                    <div className="fixed bg-[rgba(0,0,0,0.5)] w-full h-full top-0 left-0 z-30">
                      <div className="flex justify-center flex-col md:flex-rol items-center align-middle w-full h-full">
                        <button
                          onClick={() => setOpenImage(false)}
                          className="transition ease-in-out duration-200 bg-black relative mb-[20px] border-2 border-main-green hover:text-black hover:bg-main-green text-main-green w-[50px] h-[50px] rounded-full"
                        >
                          <i className="fa-solid fa-x"></i>
                        </button>
                        <div className="relative w-full h-[350px] md:w-[500px] md:h-[500px]">
                          <div>
                            <Image
                              src={imagem}
                              alt={data.nomeProduto}
                              draggable={false}
                              quality={100}
                              priority={true}
                              placeholder="blur"
                              blurDataURL={imagem}
                              layout="fill"
                              className="relative rounded-xl select-none"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="relative min-w-[300px] h-[300px] me-5 cursor-none border-2 border-[#333] rounded-xl">
                <div>
                  <Image
                    src={data.imagemURL}
                    alt={data.nomeProduto}
                    onClick={() => setOpenImage(true)}
                    draggable={false}
                    quality={100}
                    layout="fill"
                    className="rounded-xl select-none"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                  />
                  <div className="magnify" style={magnify}></div>
                </div>
                {openImage && (
                  <div className="fixed bg-black w-full h-full">
                    <Image
                      src={data.imagemURL}
                      alt={data.nomeProduto}
                      quality={100}
                      draggable={false}
                      layout="fill"
                      className="rounded-xl select-none"
                    />
                  </div>
                )}
              </div>
            )}
            <div className="inline max-w-[300px] sm:block md:p-x-0 p-x-10">
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
            </div>
            <div>
              <div className="flex flex-col align-middle">
                {data.tipo != "Nenhum" && (
                  <div className="mt-5">
                    <div>
                      <h1 className="text-main-green font-bold">
                        {`${data.tipo}`.toUpperCase()}
                        <span className="text-[#aaa]">:</span>
                      </h1>

                      <div className="flex flex-wrap max-w-[350px] min-w-[350px]">
                        {data.escolhas
                          .split(";")
                          .map((item: any, index: Key) => {
                            return (
                              <button
                                key={index}
                                id={item}
                                onClick={() => {
                                  document
                                    .querySelectorAll(".botao-escolha")
                                    .forEach((element: any) => {
                                      element.setAttribute(
                                        "class",
                                        "botao-escolha transition ease-in-out duration-200 border-2 border-[#555] text-[#555] me-2 mb-2 p-2 rounded-md font-bold hover:text-main-green hover:border-main-green"
                                      );
                                    });

                                  document
                                    .getElementById(item)
                                    ?.setAttribute(
                                      "class",
                                      "botao-escolha transition ease-in-out duration-200 border-2 border-main-green bg-main-green text-black me-2 mb-2 p-2 rounded-md font-bold"
                                    );
                                }}
                                className="botao-escolha transition ease-in-out duration-200 border-2 border-[#555] text-[#555] me-2 mb-2 p-2 rounded-md font-bold hover:text-main-green hover:border-main-green"
                              >
                                {`${item}`.toUpperCase()}
                              </button>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                )}
                {!session || session.user.role == "user" ? (
                  <div>
                    <button
                      onClick={adicionarCarrinho}
                      id="adicionar"
                      className="border-2 border-main-green text-main-green font-bold rounded p-2 w-full mt-5"
                    >
                      ADICIONAR AO CARRINHO
                    </button>
                    <button
                      onClick={comprarAgora}
                      className="border-2 border-main-green text-black bg-main-green font-bold rounded p-2 w-full mt-2 mb-5"
                    >
                      COMPRAR AGORA
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      onClick={editar}
                      className="border-2 border-main-green text-black bg-main-green font-bold rounded p-2 w-full mt-2 mb-5"
                    >
                      EDITAR
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </PageContainer>

        <h1 className="md:m-4 md:p-0 px-2 my-4 text-xl text-main-green font-bold">
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

        <h1 className="md:m-4 md:p-0 px-2 my-4 text-xl text-main-green font-bold">
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
