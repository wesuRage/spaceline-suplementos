"use client";

import Spinner from "@/components/Spinner";
import { handleCepInput, handlePhoneInput } from "@/functions/InputHandlers";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function InformacoesEntrega() {
  const router = useRouter();
  const [data, setData] = useState<any>();

  const [nome, setNome] = useState<string>();
  const [telefone, setTelefone] = useState<string>();
  const [cep, setCep] = useState<string>();
  const [estado, setEstado] = useState<string>();
  const [cidade, setCidade] = useState<string>();
  const [bairro, setBairro] = useState<string>();
  const [rua, setRua] = useState<string>();
  const [numero, setNumero] = useState<string>();
  const [complemento, setComplemento] = useState<string>();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

  if (session?.user.role == "admin") {
    router.push("/dashboard");
  }

  useEffect(() => {
    fetch(`/api/usuarios/${session?.user.email}`)
      .then((res) => res.json())
      .then((res: any) => {
        setData(res);
      });
  }, []);

  async function consultaCep(event: any) {
    event.preventDefault();

    setCep(event.target.value);
    const cep = event.target.value.replace("-", "");

    if (cep.length < 8) {
      return;
    }

    const estado = (document.getElementById("estado") as HTMLInputElement)!;
    const cidade = (document.getElementById("cidade") as HTMLInputElement)!;
    const bairro = (document.getElementById("bairro") as HTMLInputElement)!;
    const rua = (document.getElementById("rua") as HTMLInputElement)!;

    let result;

    await fetch(`https://brasilaberto.com/api/v1/zipcode/${cep}`)
      .then((res) => res.json())
      .then((data) => (result = data.result));

    result = result!;

    estado.value = result.state;
    cidade.value = result.city;
    bairro.value = result.district;
    rua.value = result.street;
    setEstado(result.state);
    setCidade(result.city);
    setBairro(result.district);
    setRua(result.street);
  }

  async function submit(event: any) {
    event.preventDefault();

    await fetch(`/api/usuarios/${session?.user.email}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome,
        email: session?.user.email,
        senha: data.senha,
        telefone,
        cep,
        estado,
        cidade,
        bairro,
        rua,
        numero,
        complemento,
        cpf: data.cpf,
        cartao: data.numeroCartao,
        nomeCartao: data.nomeCartao,
        cvv: data.cvv,
        validade: data.validade,
      }),
    });

    router.push("/perfil");
  }

  useEffect(() => {
    if (data) {
      setNome(data.nome);
      setTelefone(data.telefone);
      setCep(data.cep);
      setEstado(data.estado);
      setCidade(data.cidade);
      setBairro(data.bairro);
      setRua(data.rua);
      setNumero(data.numero);
      setComplemento(data.complemento);
    }
  }, [data]);

  if (!data) return <Spinner />;

  return (
    <main className="flex justify-center">
      <div className="w-full max-w-[1250px] bg-black p-5 md:m-4 sm:my-4 md:border-2 sm:border-y-2 border-[#333] md:rounded-3xl ">
        <form onSubmit={submit} className="flex justify-center">
          <div>
            <div className="text-main-green">
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
                  required
                  value={nome}
                  onChange={(e: any) => setNome(e.target.value)}
                  placeholder="Seu nome completo"
                  className="block transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full max-w-[500px] rounded p-3 box-border outline-0 border-2 border-black focus:border-main-green"
                />
              </div>
              <div className="mb-5 flex justify-between">
                <div>
                  <label
                    htmlFor="telefone"
                    className="text-main-green font-bold"
                  >
                    Telefone
                  </label>
                  <input
                    type="tel"
                    maxLength={15}
                    minLength={15}
                    required
                    onKeyUp={handlePhoneInput}
                    onChange={(e: any) => setTelefone(e.target.value)}
                    name="telefone"
                    value={telefone}
                    placeholder="(00) 00000-0000"
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
                    maxLength={9}
                    minLength={9}
                    required
                    onKeyUp={handleCepInput}
                    onChange={consultaCep}
                    value={cep}
                    placeholder="00000-000"
                    className="block transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full max-w-[500px] rounded p-3 box-border outline-0 border-2 border-black focus:border-main-green"
                  />
                </div>
              </div>
              <div className="mb-5 flex justify-between">
                <div>
                  <label htmlFor="estado" className="text-main-green font-bold">
                    Estado
                  </label>
                  <input
                    type="text"
                    name="estado"
                    id="estado"
                    required
                    onChange={(e: any) => setEstado(e.target.value)}
                    value={estado}
                    placeholder="Seu estado"
                    className="block transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full max-w-[500px] rounded p-3 box-border outline-0 border-2 border-black focus:border-main-green"
                  />
                </div>
                <div>
                  <label htmlFor="cidade" className="text-main-green font-bold">
                    Cidade
                  </label>
                  <input
                    type="text"
                    name="cidade"
                    id="cidade"
                    required
                    value={cidade}
                    onChange={(e: any) => setCidade(e.target.value)}
                    placeholder="Sua cidade"
                    className="block transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full max-w-[500px] rounded p-3 box-border outline-0 border-2 border-black focus:border-main-green"
                  />
                </div>
              </div>
              <div className="mb-5 flex justify-between">
                <div>
                  <label htmlFor="bairro" className="text-main-green font-bold">
                    Bairro
                  </label>
                  <input
                    type="text"
                    name="bairro"
                    id="bairro"
                    required
                    value={bairro}
                    onChange={(e: any) => setBairro(e.target.value)}
                    placeholder="Seu bairro"
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
                    id="rua"
                    required
                    value={rua}
                    onChange={(e: any) => setRua(e.target.value)}
                    placeholder="Sua rua"
                    className="block transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full max-w-[500px] rounded p-3 box-border outline-0 border-2 border-black focus:border-main-green"
                  />
                </div>
              </div>
              <div className="mb-5 flex">
                <div>
                  <label htmlFor="numero" className="text-main-green font-bold">
                    Número
                  </label>
                  <input
                    type="text"
                    name="numero"
                    required
                    value={numero}
                    onChange={(e: any) => setNumero(e.target.value)}
                    placeholder="000"
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
                    maxLength={30}
                    required
                    value={complemento}
                    onChange={(e: any) => setComplemento(e.target.value)}
                    placeholder="Casa/Apartamento/Condomínio"
                    className="block transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full rounded p-3 box-border outline-0 border-2 border-black focus:border-main-green"
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
