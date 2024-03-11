"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpForm() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [repsenha, setRepsenha] = useState("");
  const [error, setError] = useState("");
  const [errorSenha, setErrorSenha] = useState("");
  const [visibility, setVisibility] = useState("password");

  function verSenha() {
    if (visibility === "password") {
      setVisibility("text");
    } else {
      setVisibility("password");
    }
  }

  async function createAccount(e: any) {
    e.preventDefault();

    if (senha !== repsenha) {
      setErrorSenha("Senha inválida, verifique novamente");
      return;
    }

    const result = await fetch("/api/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: nome,
        email: email,
        senha: senha,
      }),
    });

    if (!result.ok) {
      setError("Email já registrado");
      return;
    }

    router.push("/login");
  }

  return (
    <main className="flex justify-center">
      <section className="bg-black p-5 m-10 rounded-xl border-2 border-[#333] w-full max-w-[390px]">
        <div className="text-xl text-main-green">
          <h1 className="font-bold">Cadastro</h1>
        </div>
        <div>
          <form onSubmit={createAccount}>
            <div className="my-5">
              <label htmlFor="nome" className="font-bold text-main-green block">
                Nome
              </label>
              <input
                required
                onChange={(e) => {
                  setNome(e.target.value);
                }}
                type="text"
                name="nome"
                className="transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full rounded p-3 box-border outline-0 border-2 border-black focus:border-main-green"
              />
            </div>
            <div className="my-5">
              <label
                htmlFor="email"
                className="font-bold text-main-green block"
              >
                Email
              </label>
              <input
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                name="email"
                className="transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full rounded p-3 box-border outline-0 border-2 border-black focus:border-main-green"
              />
            </div>
            {error && (
              <div className="w-full rounded bg-red-400 text-red-700 mb-5 text-center border-2 border-black">
                {error}
              </div>
            )}
            <div className="my-5">
              <label
                htmlFor="senha"
                className="font-bold text-main-green block"
              >
                Senha
              </label>
              <input
                required
                onChange={(e) => {
                  setSenha(e.target.value);
                }}
                autoComplete="off"
                type={visibility}
                name="senha"
                id="senha"
                minLength={8}
                className="transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full rounded p-3 box-border outline-0 border-2 border-black focus:border-main-green"
              />
            </div>
            <div className="my-5">
              <label
                htmlFor="senha"
                className="font-bold text-main-green block"
              >
                Repita a senha
              </label>
              <input
                required
                onChange={(e) => {
                  setRepsenha(e.target.value);
                }}
                autoComplete="off"
                type={visibility}
                name="senha"
                id="repsenha"
                minLength={8}
                className="transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full rounded p-3 box-border outline-0 border-2 border-black focus:border-main-green"
              />
            </div>
            {errorSenha && (
              <div className="w-full rounded bg-red-400 text-red-700 mb-5 text-center border-2 border-black">
                {errorSenha}
              </div>
            )}
            <div className="mb-5">
              <input
                type="checkbox"
                onClick={verSenha}
                className="w-4 h-4 cursor-pointer"
              />{" "}
              Ver senha
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="transition ease-in-out duration-200 font-bold border-2 border-main-green bg-black text-main-green hover:bg-main-green hover:text-black p-2 rounded"
              >
                Criar
              </button>
              <Link
                href={"/login"}
                className="transition ease-in-out duration-200 p-2 hover:text-main-green"
              >
                Já tenho conta
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
