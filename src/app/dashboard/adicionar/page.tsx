"use client";
import PageContainer from "./components/PageContainer";
import type { PutBlobResult } from "@vercel/blob";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Adicionar() {
  const router = useRouter();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [nomeProduto, setNomeProduto] = useState();
  const [preco, setPreco] = useState<number>();
  const [precoRiscado, setPrecoRiscado] = useState<number>();
  const [descricao, setDescricao] = useState();
  const [comprados, setComprados] = useState<number>();
  const [tags, setTags] = useState<number>();
  const [altura, setAltura] = useState<number>();
  const [largura, setLargura] = useState<number>();
  const [comprimento, setComprimento] = useState<number>();
  const [peso, setPeso] = useState<number>();
  const [image, setImage] = useState<any>(null);
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

  const displayImage = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  async function submit(event: any) {
    event.preventDefault();

    if (!inputFileRef.current?.files) {
      throw new Error("No file selected");
    }

    const file = inputFileRef.current.files[0];

    const response = await fetch(`/api/images?filename=${file.name}`, {
      method: "POST",
      body: file,
    });

    const newBlob = (await response.json()) as PutBlobResult;

    const data = {
      imagemURL: newBlob.url,
      nomeProduto,
      preco,
      precoRiscado,
      descricao,
      comprados,
      tags,
      altura,
      largura,
      comprimento,
      peso,
    };

    console.log(data);

    fetch("/api/produtos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imagemURL: newBlob.url,
        nomeProduto,
        preco,
        precoRiscado,
        descricao,
        comprados,
        tags,
        altura,
        largura,
        comprimento,
        peso,
      }),
    });

    router.push("/dashboard");
  }

  return (
    <main className="flex justify-center">
      <PageContainer>
        <form onSubmit={submit} className="flex justify-center">
          <section className="max-w-[500px]">
            <div className="mb-5">
              <label
                htmlFor="imagemProduto"
                className="text-main-green font-bold block"
              >
                Imagem *
              </label>
              {image && (
                <div className="relative mb-5">
                  <Image
                    src={image}
                    alt="produto"
                    width={300}
                    height={300}
                    className="border-2 border-main-green rounded-md"
                  ></Image>
                </div>
              )}
              <input
                name="imagemProduto"
                onChange={displayImage}
                ref={inputFileRef}
                type="file"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="nomeProduto"
                className="text-main-green font-bold"
              >
                Nome *
              </label>

              <input
                required
                type="text"
                onChange={(e: any) => setNomeProduto(e.target.value)}
                className="block transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full max-w-[500px] rounded p-3 box-border outline-0 border-2 border-black focus:border-main-green"
              />
            </div>
            <div className="flex justify-between mb-5">
              <div>
                <label htmlFor="preco" className="text-main-green font-bold">
                  Preço *
                </label>

                <input
                  required
                  onChange={(e: any) => setPreco(parseFloat(e.target.value))}
                  type="text"
                  name="preco"
                  className="block transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full max-w-[240px] rounded p-3 box-border outline-0 border-2 border-black focus:border-main-green"
                />
              </div>
              <div>
                <label htmlFor="preco" className="text-main-green font-bold">
                  Preço Riscado *
                </label>

                <input
                  required
                  onChange={(e: any) =>
                    setPrecoRiscado(parseFloat(e.target.value))
                  }
                  type="text"
                  name="preco"
                  className="block transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full max-w-[240px] rounded p-3 box-border outline-0 border-2 border-black focus:border-main-green"
                />
              </div>
            </div>
            <div className="mb-5">
              <label htmlFor="descricao" className="text-main-green font-bold">
                Descrição *
              </label>

              <textarea
                name="descricao"
                required
                onChange={(e: any) => setDescricao(e.target.value)}
                rows={5}
                className="block transition ease-in-out duration-200 text-white bg-[#333] h-auto w-full rounded p-3 box-border outline-0 border-2 border-black focus:border-main-green"
              ></textarea>
            </div>
            <div className="mb-5">
              <label
                htmlFor="nomeProduto"
                className="text-main-green font-bold"
              >
                Tags *
              </label>

              <input
                required
                type="text"
                onChange={(e: any) => setTags(e.target.value)}
                className="block transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full max-w-[500px] rounded p-3 box-border outline-0 border-2 border-black focus:border-main-green"
              />
            </div>
            <div className="flex justify-between">
              <div>
                <label
                  htmlFor="descricao"
                  className="text-main-green font-bold text-[10px]"
                >
                  Altura (cm) *
                </label>
                <input
                  type="text"
                  required
                  onChange={(e: any) => setAltura(parseFloat(e.target.value))}
                  className="block transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full rounded p-3 box-border outline-0 border-2 border-black focus:border-main-green"
                />
              </div>
              <div>
                <label
                  htmlFor="descricao"
                  className="text-main-green font-bold text-[10px]"
                >
                  Largura (cm) *
                </label>
                <input
                  type="text"
                  required
                  onChange={(e: any) => setLargura(parseFloat(e.target.value))}
                  className="block transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full rounded p-3 box-border outline-0 border-2 border-black focus:border-main-green"
                />
              </div>
              <div>
                <label
                  htmlFor="descricao"
                  className="text-main-green font-bold text-[10px]"
                >
                  Comprimento (cm) *
                </label>
                <input
                  type="text"
                  required
                  onChange={(e: any) =>
                    setComprimento(parseFloat(e.target.value))
                  }
                  className="block transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full rounded p-3 box-border outline-0 border-2 border-black focus:border-main-green"
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <label
                  htmlFor="descricao"
                  className="text-main-green font-bold"
                >
                  Peso (kg) *
                </label>
                <input
                  type="text"
                  required
                  onChange={(e: any) => setPeso(parseFloat(e.target.value))}
                  className="block transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full rounded p-3 box-border outline-0 border-2 border-black focus:border-main-green"
                />
              </div>
              <div>
                <label
                  htmlFor="descricao"
                  className="text-main-green font-bold"
                >
                  Comprados *
                </label>
                <input
                  type="number"
                  required
                  min={0}
                  onChange={(e: any) => setComprados(parseInt(e.target.value))}
                  className="block transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full rounded p-3 box-border outline-0 border-2 border-black focus:border-main-green"
                />
              </div>
            </div>
            <button
              type="submit"
              className="transition ease-in-out duration-200 p-2 font-bold rounded my-5 border-2 border-main-green text-main-green hover:text-black hover:bg-main-green"
            >
              Adicionar Produto
            </button>
          </section>
        </form>
      </PageContainer>
    </main>
  );
}
