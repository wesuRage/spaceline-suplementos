"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";
import {
  handleCartao,
  handleNomeCartao,
  handleCpf,
  handleCvv,
  handleValidade,
} from "@/functions/InputHandlers";

export default function InformacoesCompra() {
  const router = useRouter();
  const [data, setData] = useState<any>();
  const [cpf, setCpf] = useState<string>();
  const [cartao, setNumeroCartao] = useState<string>();
  const [nomeCartao, setNomeCartao] = useState<string>();
  const [cvv, setCvv] = useState<string>();
  const [validade, setValidade] = useState<string>();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

  useEffect(() => {
    if (session?.user.role == "admin") {
      router.push("/dashboard");
    }
  }, []);

  useEffect(() => {
    fetch(`/api/usuarios/${session?.user.email}`)
      .then((response) => response.json())
      .then((response: any) => {
        setData(response);
      });
  }, []);

  async function submit(event: any) {
    event.preventDefault();

    await fetch(`/api/usuarios/${session?.user.email}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: data.nome,
        email: session?.user.email,
        senha: data.senha,
        telefone: data.telefone,
        cep: data.cep,
        estado: data.estado,
        cidade: data.cidade,
        bairro: data.bairro,
        rua: data.rua,
        numero: data.numero,
        complemento: data.complemento,
        cpf,
        cartao,
        nomeCartao: nomeCartao?.toUpperCase(),
        cvv,
        validade,
      }),
    });

    router.push("/perfil");
  }

  useEffect(() => {
    if (data) {
      setCpf(data.cpf);
      setNumeroCartao(data.cartao);
      setNomeCartao(data.nomeCartao);
      setCvv(data.cvv);
      setValidade(data.validade);
    }
  }, [data]);

  if (!data) return <Spinner />;

  return (
    <main className="flex justify-center">
      <div className="w-full max-w-[1250px] bg-black p-5 md:m-4 sm:my-4 md:border-2 sm:border-y-2 border-[#333] md:rounded-3xl ">
        <form className="flex justify-center" onSubmit={submit}>
          <div>
            <div className="text-main-green">
              <i className="fa-regular fa-credit-card"></i>
              <p className="font-bold ms-2 inline">Informações de compra</p>
            </div>

            <div className="my-5">
              <div className="mb-5">
                <label htmlFor="cpf" className="text-main-green font-bold">
                  CPF
                </label>
                <input
                  type="text"
                  name="cpf"
                  value={cpf}
                  onKeyUp={handleCpf}
                  onChange={(e: any) => setCpf(e.target.value)}
                  maxLength={14}
                  placeholder="000.000.000-00"
                  className="block transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full max-w-[500px] rounded p-3 box-border outline-0 border-2 border-black focus:border-main-green"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="numeroCartao"
                  className="text-main-green font-bold"
                >
                  Número do cartão
                </label>
                <input
                  type="text"
                  name="numeroCartao"
                  value={cartao}
                  maxLength={20}
                  onKeyUp={handleCartao}
                  onChange={(e: any) => setNumeroCartao(e.target.value)}
                  placeholder="0000 0000 0000 0000"
                  className="block transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full max-w-[500px] rounded p-3 box-border outline-0 border-2 border-black focus:border-main-green"
                />
              </div>
              <div className="flex">
                <div className="mb-5">
                  <label
                    htmlFor="nomeCartao"
                    className="text-main-green font-bold"
                  >
                    Nome do cartão
                  </label>
                  <input
                    type="text"
                    name="nomeCartao"
                    value={nomeCartao}
                    onKeyUp={handleNomeCartao}
                    onChange={(e: any) => setNomeCartao(e.target.value)}
                    placeholder="LUIZ H SILVEIRA"
                    className="uppercase block transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full max-w-[500px] rounded p-3 box-border outline-0 border-2 border-black focus:border-main-green"
                  />
                </div>
                <div className="mb-5">
                  <label htmlFor="cvv" className="text-main-green font-bold">
                    CVV
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    value={cvv}
                    maxLength={3}
                    onKeyUp={handleCvv}
                    onChange={(e: any) => setCvv(e.target.value)}
                    placeholder="000"
                    className="block transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full max-w-[100px] rounded p-3 box-border outline-0 border-2 border-black focus:border-main-green"
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="validade"
                    className="text-main-green font-bold"
                  >
                    Validade
                  </label>
                  <input
                    type="text"
                    name="validade"
                    value={validade}
                    onKeyUp={handleValidade}
                    onChange={(e: any) => setValidade(e.target.value)}
                    maxLength={5}
                    placeholder="00/00"
                    className="block transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full max-w-[100px] rounded p-3 box-border outline-0 border-2 border-black focus:border-main-green"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="transition ease-in-out duration-200 p-2 font-bold rounded my-5 border-2 border-main-green text-main-green hover:text-black hover:bg-main-green"
              >
                Editar
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
