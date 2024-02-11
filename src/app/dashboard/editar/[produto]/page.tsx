"use client";
import PageContainer from "./components/PageContainer";
import type { PutBlobResult } from "@vercel/blob";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";

export default function Editar({ params }: { params: any }) {
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
  const [prevImage, setPrevImage] = useState<any>();
  const [prevNomeProduto, setPrevNomeProduto] = useState<any>();

  useEffect(() => {
    fetch(`/api/produtos/${params.produto}`)
      .then((res) => res.json())
      .then((res: any) => {
        setImage(res.imagemURL);
        setPrevImage(res.imagemURL);
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
        setPeso(res.peso);
      });
  }, []);

  const displayImage = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  async function submit(event: any) {
    event.preventDefault();

    if (!inputFileRef.current?.files) {
      console.log("error, no file selected");
      throw new Error("No file selected");
    }

    const file = inputFileRef.current.files[0];

    if (file) {
      const response = await fetch(`/api/images?filename=${file.name}`, {
        method: "POST",
        body: file,
      });

      const newBlob = (await response.json()) as PutBlobResult;

      fetch("/api/images", {
        method: "DELETE",
        body: JSON.stringify({ url: prevImage }),
      });

      fetch(`/api/produtos/${nomeProduto}`, {
        method: "PUT",
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
      console.log("com imagem");
    } else {
      fetch(`/api/produtos/${prevNomeProduto}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imagemURL: prevImage,
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
      console.log("sem imagem");
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
                className="text-[var(--green-200)] font-bold block"
              >
                Imagem *
              </label>
              <div className="relative mb-5 w-[300px] h-[300px]">
                <Image
                  src={image}
                  alt="produto"
                  layout="fill"
                  className="border-2 border-[var(--green-200)] rounded-md"
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
                htmlFor="nomeProduto"
                className="text-[var(--green-200)] font-bold"
              >
                Nome *
              </label>

              <input
                required
                type="text"
                value={nomeProduto}
                onChange={(e: any) => setNomeProduto(e.target.value)}
                className="block transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full max-w-[500px] rounded p-3 box-border outline-0 border-2 border-black focus:border-[var(--green-200)]"
              />
            </div>
            <div className="flex justify-between mb-5">
              <div>
                <label
                  htmlFor="preco"
                  className="text-[var(--green-200)] font-bold"
                >
                  Preço *
                </label>

                <input
                  required
                  value={preco}
                  onChange={(e: any) => setPreco(parseFloat(e.target.value))}
                  type="text"
                  name="preco"
                  className="block transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full max-w-[240px] rounded p-3 box-border outline-0 border-2 border-black focus:border-[var(--green-200)]"
                />
              </div>
              <div>
                <label
                  htmlFor="preco"
                  className="text-[var(--green-200)] font-bold"
                >
                  Preço Riscado
                </label>

                <input
                  required
                  value={precoRiscado}
                  onChange={(e: any) =>
                    setPrecoRiscado(parseFloat(e.target.value))
                  }
                  type="text"
                  name="preco"
                  className="block transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full max-w-[240px] rounded p-3 box-border outline-0 border-2 border-black focus:border-[var(--green-200)]"
                />
              </div>
            </div>
            <div className="mb-5">
              <label
                htmlFor="descricao"
                className="text-[var(--green-200)] font-bold"
              >
                Descrição *
              </label>

              <textarea
                name="descricao"
                required
                value={descricao}
                onChange={(e: any) => setDescricao(e.target.value)}
                rows={5}
                className="block transition ease-in-out duration-200 text-white bg-[#333] h-auto w-full rounded p-3 box-border outline-0 border-2 border-black focus:border-[var(--green-200)]"
              ></textarea>
            </div>
            <div className="mb-5">
              <label
                htmlFor="nomeProduto"
                className="text-[var(--green-200)] font-bold"
              >
                Tags *
              </label>

              <input
                required
                type="text"
                value={tags}
                onChange={(e: any) => setTags(e.target.value)}
                className="block transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full max-w-[500px] rounded p-3 box-border outline-0 border-2 border-black focus:border-[var(--green-200)]"
              />
            </div>
            <div className="flex justify-between">
              <div>
                <label
                  htmlFor="descricao"
                  className="text-[var(--green-200)] font-bold text-[10px]"
                >
                  Altura (cm) *
                </label>
                <input
                  type="text"
                  required
                  value={altura}
                  onChange={(e: any) => setAltura(parseFloat(e.target.value))}
                  className="block transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full rounded p-3 box-border outline-0 border-2 border-black focus:border-[var(--green-200)]"
                />
              </div>
              <div>
                <label
                  htmlFor="descricao"
                  className="text-[var(--green-200)] font-bold text-[10px]"
                >
                  Largura (cm) *
                </label>
                <input
                  type="text"
                  required
                  value={largura}
                  onChange={(e: any) => setLargura(parseFloat(e.target.value))}
                  className="block transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full rounded p-3 box-border outline-0 border-2 border-black focus:border-[var(--green-200)]"
                />
              </div>
              <div>
                <label
                  htmlFor="descricao"
                  className="text-[var(--green-200)] font-bold text-[10px]"
                >
                  Comprimento (cm) *
                </label>
                <input
                  type="text"
                  required
                  value={comprimento}
                  onChange={(e: any) =>
                    setComprimento(parseFloat(e.target.value))
                  }
                  className="block transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full rounded p-3 box-border outline-0 border-2 border-black focus:border-[var(--green-200)]"
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <label
                  htmlFor="descricao"
                  className="text-[var(--green-200)] font-bold"
                >
                  Peso (kg) *
                </label>
                <input
                  type="text"
                  required
                  value={peso}
                  onChange={(e: any) => setPeso(parseFloat(e.target.value))}
                  className="block transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full rounded p-3 box-border outline-0 border-2 border-black focus:border-[var(--green-200)]"
                />
              </div>
              <div>
                <label
                  htmlFor="descricao"
                  className="text-[var(--green-200)] font-bold"
                >
                  Comprados
                </label>
                <input
                  type="number"
                  required
                  value={comprados}
                  min={0}
                  onChange={(e: any) => setComprados(parseInt(e.target.value))}
                  className="block transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full rounded p-3 box-border outline-0 border-2 border-black focus:border-[var(--green-200)]"
                />
              </div>
            </div>
            <button
              type="submit"
              className="p-2 font-bold rounded my-5 border-2 border-[var(--green-200)] text-[var(--green-200)] hover:text-black hover:bg-[var(--green-200)]"
            >
              Editar Produto
            </button>
          </section>
        </form>
      </PageContainer>
    </main>
  );
}
