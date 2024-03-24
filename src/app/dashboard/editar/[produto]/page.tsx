"use client";
import PageContainer from "./components/PageContainer";
import type { PutBlobResult } from "@vercel/blob";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";
import { useSession } from "next-auth/react";

export default function Editar({ params }: { params: any }) {
  const router = useRouter();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const inputFileRef2 = useRef<HTMLInputElement>(null);
  const [nomeProduto, setNomeProduto] = useState();
  const [preco, setPreco] = useState<string>();
  const [precoRiscado, setPrecoRiscado] = useState<string>();
  const [descricao, setDescricao] = useState();
  const [comprados, setComprados] = useState<string>();
  const [tags, setTags] = useState<string>();
  const [altura, setAltura] = useState<string>();
  const [largura, setLargura] = useState<string>();
  const [comprimento, setComprimento] = useState<string>();
  const [peso, setPeso] = useState<string>();
  const [image, setImage] = useState<any>(null);
  const [image2, setImage2] = useState<any>(null);
  const [prevImage, setPrevImage] = useState<any>();
  const [prevFatos, setPrevFatos] = useState<any>();
  const [tipos, setTipos] = useState<any>();
  const [escolhas, setEscolhas] = useState<any>();

  const [prevNomeProduto, setPrevNomeProduto] = useState<any>();
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

  useEffect(() => {
    fetch(`/api/produtos/${params.produto}`)
      .then((res) => res.json())
      .then((res: any) => {
        setImage(res.imagemURL);
        setImage2(res.fatosNutricionaisURL);
        setPrevImage(res.imagemURL);
        setPrevFatos(res.fatosNutricionaisURL);
        setPrevNomeProduto(res.nomeProduto);
        setNomeProduto(res.nomeProduto);
        setPreco(res.preco);
        setPrecoRiscado(res.precoRiscado);
        setDescricao(res.descricao);
        setComprados(res.comprados);
        setTags(res.tags);
        setAltura(res.altura);
        setLargura(res.largura);
        setComprimento(res.comprimento);
        setTipos(res.tipo);
        setEscolhas(res.escolhas);
        setPeso(res.peso);
      });
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

    if (!inputFileRef.current?.files || !inputFileRef2.current?.files) {
      console.log("error, no file selected");
      throw new Error("No file selected");
    }

    const file = inputFileRef.current.files[0];
    const file2 = inputFileRef2.current.files[0];

    if (file && file2) {
      const response = await fetch(`/api/images?filename=${file.name}`, {
        method: "POST",
        body: file,
      });

      const response2 = await fetch(`/api/images?filename=${file2.name}`, {
        method: "POST",
        body: file2,
      });

      const newBlob = (await response.json()) as PutBlobResult;
      const newBlob2 = (await response2.json()) as PutBlobResult;

      await fetch("/api/images", {
        method: "DELETE",
        body: JSON.stringify({ url: prevImage }),
      });

      await fetch("/api/images", {
        method: "DELETE",
        body: JSON.stringify({ url: prevFatos }),
      });

      await fetch(`/api/produtos/${nomeProduto}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
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
        }),
      });
    } else if (file && !file2) {
      const response = await fetch(`/api/images?filename=${file.name}`, {
        method: "POST",
        body: file,
      });

      const newBlob = (await response.json()) as PutBlobResult;

      await fetch("/api/images", {
        method: "DELETE",
        body: JSON.stringify({ url: prevImage }),
      });

      await fetch(`/api/produtos/${nomeProduto}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imagemURL: newBlob.url,
          fatosNutricionaisURL: prevFatos,
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
        }),
      });
    } else if (!file && file) {
      const response2 = await fetch(`/api/images?filename=${file2.name}`, {
        method: "POST",
        body: file2,
      });

      const newBlob2 = (await response2.json()) as PutBlobResult;

      await fetch("/api/images", {
        method: "DELETE",
        body: JSON.stringify({ url: prevFatos }),
      });

      await fetch(`/api/produtos/${nomeProduto}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imagemURL: prevImage,
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
        }),
      });
    } else {
      await fetch(`/api/produtos/${prevNomeProduto}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imagemURL: prevImage,
          fatosNutricionaisURL: prevFatos,
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
        }),
      });
    }

    router.push("/dashboard");
  }

  if (!image) return <Spinner />;

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
              <div className="relative mb-5 w-[300px] h-[300px]">
                <Image
                  src={image}
                  alt="produto"
                  layout="fill"
                  className="border-2 border-main-green rounded-md"
                ></Image>
              </div>
              <input
                name="imagemProduto"
                onChange={displayImage}
                ref={inputFileRef}
                type="file"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="fatosNutriciais"
                className="text-main-green font-bold block"
              >
                Fatos Nutriciais
              </label>
              <div className="relative mb-5 w-[300px] h-[300px]">
                <Image
                  src={image2}
                  alt="produto"
                  layout="fill"
                  className="border-2 border-main-green rounded-md"
                ></Image>
              </div>
              <input
                name="fatosNutriciais"
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
                value={nomeProduto}
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
                  value={preco}
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
                  value={precoRiscado}
                  onChange={(e: any) => {
                    return setPrecoRiscado(e.target.value);
                  }}
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
                value={descricao}
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
                      checked={tipos == "Sabor"}
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
                      checked={tipos == "Cor"}
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
                      checked={tipos == "Tamanho"}
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
                      checked={tipos == "Nenhum"}
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
                value={escolhas}
                onChange={(e: any) => setEscolhas(e.target.value)}
                className="block transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full max-w-[500px] rounded p-3 box-border outline-0 border-2 border-black focus:border-main-green"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="nomeProduto"
                className="text-main-green font-bold"
              >
                Tags
              </label>

              <input
                required
                type="text"
                value={tags}
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
                  value={altura}
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
                  value={largura}
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
                  value={comprimento}
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
                  value={peso}
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
                  value={comprados}
                  min={0}
                  onChange={(e: any) => setComprados(e.target.value)}
                  className="block transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full rounded p-3 box-border outline-0 border-2 border-black focus:border-main-green"
                />
              </div>
            </div>
            <button
              type="submit"
              className="transition ease-in-out duration-200 p-2 font-bold rounded my-5 border-2 border-main-green text-main-green hover:text-black hover:bg-main-green"
            >
              Editar Produto
            </button>
          </section>
        </form>
      </PageContainer>
    </main>
  );
}
