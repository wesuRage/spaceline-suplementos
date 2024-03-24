"use client";
import PageContainer from "./components/PageContainer";
import type { PutBlobResult } from "@vercel/blob";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import LittleSpinner from "@/components/LittleSpinner";

export default function Adicionar() {
  const router = useRouter();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const inputFileRef2 = useRef<HTMLInputElement>(null);
  const [nomeProduto, setNomeProduto] = useState<string>();
  const [preco, setPreco] = useState<string>();
  const [precoRiscado, setPrecoRiscado] = useState<string>("0");
  const [descricao, setDescricao] = useState<string>();
  const [comprados, setComprados] = useState<string>();
  const [tags, setTags] = useState<string>();
  const [altura, setAltura] = useState<string>();
  const [largura, setLargura] = useState<string>();
  const [comprimento, setComprimento] = useState<string>();
  const [peso, setPeso] = useState<string>();
  const [image, setImage] = useState<any>(null);
  const [image2, setImage2] = useState<any>(null);
  const [tipos, setTipos] = useState<string>("Nenhum");
  const [escolhas, setEscolhas] = useState<string>("");
  const [enviado, setEnviado] = useState<Boolean>(false);

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

  const displayImage2 = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setImage2(URL.createObjectURL(event.target.files[0]));
    }
  };

  async function submit(event: any) {
    event.preventDefault();

    setEnviado(true);

    const botao = document.getElementById("submit-button");
    botao?.setAttribute(
      "class",
      "transition ease-in-out duration-200 p-2 font-bold rounded my-5 border-2 border-sec-green text-sec-green cursor-not-allowed"
    );
    botao?.setAttribute("disabled", "true");

    if (!inputFileRef.current?.files) {
      throw new Error("No file selected");
    }

    const file = inputFileRef.current.files[0];

    const response = await fetch(`/api/images?filename=${file.name}`, {
      method: "POST",
      body: file,
    });

    const newBlob = (await response.json()) as PutBlobResult;

    if (inputFileRef2.current?.files![0]) {
      const file2 = inputFileRef2.current.files[0];

      const response2 = await fetch(`/api/images?filename=${file2.name}`, {
        method: "POST",
        body: file2,
      });

      const newBlob2 = (await response2.json()) as PutBlobResult;

      setImage(newBlob.url);
      setImage2(newBlob2.url);

      const data = {
        imagemURL: newBlob.url,
        fatosNutricionaisURL: newBlob2.url,
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
        tipo: tipos,
        escolhas,
        avaliacoes: [],
      };
      console.log("data", data);

      await fetch("/api/produtos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } else {
      const data2 = {
        imagemURL: newBlob.url,
        fatosNutricionaisURL: "",
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
        tipo: tipos,
        escolhas,
        avaliacoes: [],
      };
      console.log("data2", data2);
      await fetch("/api/produtos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data2),
      });
    }

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
                Imagem
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
                htmlFor="tabela nutricional"
                className="text-main-green font-bold block"
              >
                Tabela Nutricional
              </label>
              {image2 && (
                <div className="relative mb-5">
                  <Image
                    src={image2}
                    alt="tabela nutricional"
                    width={300}
                    height={300}
                    className="border-2 border-main-green rounded-md"
                  ></Image>
                </div>
              )}
              <input
                name="tabela nutricional"
                onChange={displayImage2}
                ref={inputFileRef2}
                type="file"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="nomeProduto"
                className="text-main-green font-bold"
              >
                Nome
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
                  Preço
                </label>

                <input
                  required
                  onChange={(e: any) => setPreco(e.target.value)}
                  type="text"
                  name="preco"
                  className="block transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full max-w-[240px] rounded p-3 box-border outline-0 border-2 border-black focus:border-main-green"
                />
              </div>
              <div>
                <label htmlFor="preco" className="text-main-green font-bold">
                  Preço Riscado
                </label>

                <input
                  required
                  onChange={(e: any) => setPrecoRiscado(e.target.value)}
                  value={precoRiscado || 0}
                  type="text"
                  name="preco"
                  className="block transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full max-w-[240px] rounded p-3 box-border outline-0 border-2 border-black focus:border-main-green"
                />
              </div>
            </div>
            <div className="mb-5">
              <label htmlFor="descricao" className="text-main-green font-bold">
                Descrição
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
              <fieldset className="border-[#333] border-2 p-2">
                <legend className="text-main-green font-bold mb-2">Tipo</legend>

                <div>
                  <div>
                    <input
                      name="tipo"
                      required
                      type="radio"
                      id="sabor"
                      value="sabor"
                      onChange={() => setTipos("Sabor")}
                    />
                    <label htmlFor="sabor" className="ms-2">
                      Sabor
                    </label>
                  </div>

                  <div>
                    <input
                      name="tipo"
                      required
                      type="radio"
                      id="cor"
                      value="cor"
                      onChange={() => setTipos("Cor")}
                    />
                    <label htmlFor="cor" className="ms-2">
                      Cor
                    </label>
                  </div>

                  <div>
                    <input
                      name="tipo"
                      required
                      type="radio"
                      id="tamanho"
                      value="tamanho"
                      onChange={() => setTipos("Tamanho")}
                    />
                    <label htmlFor="tamanho" className="ms-2">
                      Tamanho
                    </label>
                  </div>

                  <div>
                    <input
                      name="tipo"
                      required
                      type="radio"
                      id="nenhum"
                      value="nenhum"
                      onChange={() => setTipos("Nenhum")}
                    />
                    <label htmlFor="nenhum" className="ms-2">
                      Nenhum
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
            <div className="mb-5">
              <label htmlFor="escolhas" className="text-main-green font-bold">
                Escolhas (separadas por ";")
              </label>

              <input
                name="escolhas"
                type="text"
                onChange={(e: any) => setEscolhas(e.target.value)}
                className="block transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full max-w-[500px] rounded p-3 box-border outline-0 border-2 border-black focus:border-main-green"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="tags" className="text-main-green font-bold">
                Tags
              </label>

              <input
                required
                name="tags"
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
                  Altura (cm)
                </label>
                <input
                  type="text"
                  required
                  onChange={(e: any) => setAltura(e.target.value)}
                  className="block transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full rounded p-3 box-border outline-0 border-2 border-black focus:border-main-green"
                />
              </div>
              <div>
                <label
                  htmlFor="descricao"
                  className="text-main-green font-bold text-[10px]"
                >
                  Largura (cm)
                </label>
                <input
                  type="text"
                  required
                  onChange={(e: any) => setLargura(e.target.value)}
                  className="block transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full rounded p-3 box-border outline-0 border-2 border-black focus:border-main-green"
                />
              </div>
              <div>
                <label
                  htmlFor="descricao"
                  className="text-main-green font-bold text-[10px]"
                >
                  Comprimento (cm)
                </label>
                <input
                  type="text"
                  required
                  onChange={(e: any) => setComprimento(e.target.value)}
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
                  Peso (kg)
                </label>
                <input
                  type="text"
                  required
                  onChange={(e: any) => setPeso(e.target.value)}
                  className="block transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full rounded p-3 box-border outline-0 border-2 border-black focus:border-main-green"
                />
              </div>
              <div>
                <label
                  htmlFor="descricao"
                  className="text-main-green font-bold"
                >
                  Comprados
                </label>
                <input
                  type="number"
                  required
                  min={0}
                  onChange={(e: any) => setComprados(e.target.value)}
                  className="block transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full rounded p-3 box-border outline-0 border-2 border-black focus:border-main-green"
                />
              </div>
            </div>
            <div className="flex">
              <button
                type="submit"
                id="submit-button"
                className="me-5 transition ease-in-out duration-200 p-2 font-bold rounded my-5 border-2 border-main-green text-main-green hover:text-black hover:bg-main-green"
              >
                Adicionar Produto
              </button>
              {enviado && <LittleSpinner />}
            </div>
          </section>
        </form>
      </PageContainer>
    </main>
  );
}
