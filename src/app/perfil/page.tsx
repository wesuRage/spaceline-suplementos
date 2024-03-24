"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { GetFirstName } from "@/functions/GetFirstName";
import Spinner from "@/components/Spinner";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Perfil() {
  const router = useRouter();
  const [data, setData] = useState<any>();
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

  if (!data) return <Spinner />;

  return (
    <main className="flex justify-center">
      <div className="w-full max-w-[1250px] bg-black p-5 md:m-4 sm:my-4 md:border-2 sm:border-y-2 border-[#333] md:rounded-3xl ">
        <div>
          <div className="text-center text-xl text-main-green font-bold">
            Olá, {GetFirstName(data.nome)}
          </div>

          <hr className="border-t-2 border-[#333] my-3" />

          <div className="flex justify-center">
            <Link
              href="/comprados"
              className="transition ease-in-out duration-200 p-2 border-2 border-main-green bg-main-green text-black font-bold rounded-sm"
            >
              VER ITENS COMPRADOS
            </Link>
          </div>

          <hr className="border-t-2 border-[#333] my-3" />

          <section className="flex justify-center">
            <div>
              <div className="text-main-green text-xl">
                <i className="fa-solid fa-house"></i>
                <p className="font-bold ms-2 inline">Informações de entrega</p>
              </div>

              <div className="my-5">
                <div className="mb-5">
                  <label
                    htmlFor="nomeCompleto"
                    className="text-main-green font-bold"
                  >
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    name="nomeCompleto"
                    value={data.nome}
                    placeholder="Seu nome completo"
                    readOnly
                    className="block transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full max-w-[500px] rounded p-3 box-border outline-0 border-2 border-black focus:border-main-green"
                  />
                </div>
                <div className="mb-5">
                  <label htmlFor="cpf" className="text-main-green font-bold">
                    CPF
                  </label>
                  <input
                    type="text"
                    name="cpf"
                    value={data.cpf}
                    placeholder="000.000.000-00"
                    readOnly
                    className="block transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full max-w-[500px] rounded p-3 box-border outline-0 border-2 border-black focus:border-main-green"
                  />
                </div>
                <div className="mb-5 flex justify-between">
                  <div>
                    <label
                      htmlFor="telefone"
                      className="text-main-green font-bold"
                    >
                      <i className="fa-brands fa-whatsapp me-2"></i>
                      Telefone
                    </label>
                    <input
                      type="tel"
                      name="telefone"
                      value={data.telefone}
                      placeholder="(00) 00000-0000"
                      readOnly
                      className="block transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full max-w-[500px] rounded p-3 box-border outline-0 border-2 border-black focus:border-main-green"
                    />
                  </div>
                  <div>
                    <label htmlFor="cep" className="text-main-green font-bold">
                      CEP
                    </label>
                    <input
                      type="text"
                      name="cep"
                      value={data.cep}
                      placeholder="00000-000"
                      readOnly
                      className="block transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full max-w-[500px] rounded p-3 box-border outline-0 border-2 border-black focus:border-main-green"
                    />
                  </div>
                </div>
                <div className="mb-5 flex justify-between">
                  <div>
                    <label
                      htmlFor="estado"
                      className="text-main-green font-bold"
                    >
                      Estado
                    </label>
                    <input
                      type="text"
                      name="estado"
                      value={data.estado}
                      placeholder="Seu estado"
                      readOnly
                      className="block transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full max-w-[500px] rounded p-3 box-border outline-0 border-2 border-black focus:border-main-green"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cidade"
                      className="text-main-green font-bold"
                    >
                      Cidade
                    </label>
                    <input
                      type="text"
                      name="cidade"
                      value={data.cidade}
                      placeholder="Sua cidade"
                      readOnly
                      className="block transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full max-w-[500px] rounded p-3 box-border outline-0 border-2 border-black focus:border-main-green"
                    />
                  </div>
                </div>
                <div className="mb-5 flex justify-between">
                  <div>
                    <label
                      htmlFor="bairro"
                      className="text-main-green font-bold"
                    >
                      Bairro
                    </label>
                    <input
                      type="text"
                      name="bairro"
                      value={data.bairro}
                      placeholder="Seu bairro"
                      readOnly
                      className="block transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full max-w-[500px] rounded p-3 box-border outline-0 border-2 border-black focus:border-main-green"
                    />
                  </div>
                  <div>
                    <label htmlFor="rua" className="text-main-green font-bold">
                      Rua
                    </label>
                    <input
                      type="text"
                      name="rua"
                      value={data.rua}
                      placeholder="Sua rua"
                      readOnly
                      className="block transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full max-w-[500px] rounded p-3 box-border outline-0 border-2 border-black focus:border-main-green"
                    />
                  </div>
                </div>
                <div className="mb-5 flex">
                  <div>
                    <label
                      htmlFor="numero"
                      className="text-main-green font-bold"
                    >
                      Número
                    </label>
                    <input
                      type="text"
                      name="numero"
                      value={data.numero}
                      placeholder="000"
                      readOnly
                      className="block transition ease-in-out duration-200 text-white bg-[#333] h-6 max-w-[80px] rounded p-3 box-border outline-0 border-2 border-black focus:border-main-green"
                    />
                  </div>
                  <div className=" w-full">
                    <label
                      htmlFor="complemento"
                      className="text-main-green font-bold"
                    >
                      Complemento
                    </label>
                    <input
                      type="text"
                      name="complemento"
                      value={data.complemento}
                      placeholder="Casa/Apartamento/Condomínio"
                      readOnly
                      className="block transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full rounded p-3 box-border outline-0 border-2 border-black focus:border-main-green"
                    />
                  </div>
                </div>
                <Link
                  href={"/perfil/editar/informacoes-entrega"}
                  className="transition ease-in-out duration-200 p-2 font-bold rounded my-5 border-2 border-main-green text-main-green hover:text-black hover:bg-main-green"
                >
                  Editar
                </Link>
              </div>
            </div>
          </section>

          <hr className="border-t-2 border-[#333] my-3" />

          <section className="flex justify-center">
            <div>
              <div className="text-main-green text-xl">
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
                    required
                    value={data.cpf}
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
                    value={data.cartao}
                    placeholder="0000 0000 0000 0000"
                    readOnly
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
                      value={data.nomeCartao}
                      placeholder="LUIZ H SILVEIRA"
                      readOnly
                      className="block transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full max-w-[500px] rounded p-3 box-border outline-0 border-2 border-black focus:border-main-green"
                    />
                  </div>
                  <div className="mb-5">
                    <label htmlFor="cvv" className="text-main-green font-bold">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={data.cvv}
                      placeholder="000"
                      readOnly
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
                      value={data.validade}
                      placeholder="00/00"
                      readOnly
                      className="block transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full max-w-[100px] rounded p-3 box-border outline-0 border-2 border-black focus:border-main-green"
                    />
                  </div>
                </div>
                <Link
                  href={"/perfil/editar/informacoes-compra"}
                  className="transition ease-in-out duration-200 p-2 font-bold rounded my-5 border-2 border-main-green text-main-green hover:text-black hover:bg-main-green"
                >
                  Editar
                </Link>
              </div>
            </div>
          </section>

          <hr className="border-t-2 border-[#333] my-3" />

          <div className="flex justify-center">
            <button
              className="text-red-500 border-2 border-red-500 p-2 rounded hover:text-black hover:bg-red-500 transiti ease-in-out duration-200 font-bold"
              onClick={() => signOut()}
            >
              Sair da conta
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
