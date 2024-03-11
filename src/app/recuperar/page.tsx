"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import emailjs from "@emailjs/browser";

export default function LoginForm() {
  const router = useRouter();
  const [inputCode, setInputCode] = useState<string>();
  const [code, setCode] = useState<number>();
  const [codeNotSent, setCodeNotSent] = useState(true);
  const [password, setPassword] = useState("");
  const [resPassword, setResPassword] = useState("");

  const [validCode, setValidCode] = useState(false);
  const [codeVerify, setCodeVerify] = useState(false);

  const [visibility, setVisibility] = useState("password");

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [errorSenha, setErrorSenha] = useState("");

  async function resetPassword(e: any) {
    e.preventDefault();

    const res = await fetch(`/api/usuarios/${email}`).then((res) => res.json());

    if (!res) {
      setError("Email não cadastrado");
      return;
    }

    const random = Math.floor(Math.random() * (999999 - 100000) + 100000);
    setCode(random);

    emailjs
      .send(
        "service_m4gqgkh",
        "template_nhi8kef",
        {
          to_email: email,
          message: `${random}`,
        },
        "DtfBlLqe2kOg5TQ3P"
      )
      .then(() => {
        setCodeNotSent(false);
        setCodeVerify(true);
      })
      .catch((error) => console.log(error));
  }

  async function verifyCode(e: any) {
    e.preventDefault();

    if (code !== parseInt(inputCode!)) {
      setError("Código inválido");
      return;
    }

    setValidCode(true);
    setCodeVerify(false);
  }

  async function handleSubmit(e: any) {
    e.preventDefault();

    if (password !== resPassword) {
      setErrorSenha("Senha inválida, verifique novamente.");
      return;
    }

    const data = await fetch(`/api/usuarios/${email}`).then((res) =>
      res.json()
    );

    await fetch(`/api/usuarios/${email}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        senha: password,
      }),
    });

    router.replace("/login");
  }

  function verSenha() {
    if (visibility === "password") {
      setVisibility("text");
    } else {
      setVisibility("password");
    }
  }

  return (
    <main className="flex justify-center">
      <section className="bg-black p-5 m-10 rounded-xl border-2 border-[#333] w-full max-w-[390px]">
        <div className="text-xl text-main-green">
          <h1 className="font-bold">Recuperar</h1>
        </div>
        <div>
          {codeNotSent && (
            <form onSubmit={resetPassword}>
              <div className="my-5">
                <label
                  htmlFor="email"
                  className="font-bold text-main-green block"
                >
                  Email
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  onChange={(e: any) => {
                    setEmail(e.target.value);
                  }}
                  className="transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full rounded p-3 box-border outline-0 border-2 border-black focus:border-main-green"
                />
              </div>

              {error && (
                <div className="w-full rounded bg-red-400 text-red-700 mb-5 text-center border-2 border-black">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="transition ease-in-out duration-200 font-bold border-2 border-main-green bg-black text-main-green hover:bg-main-green hover:text-black p-2 rounded"
              >
                Enviar Código
              </button>
            </form>
          )}

          {codeVerify && (
            <form onSubmit={verifyCode}>
              <div className="my-5">
                <p className="mb-5">
                  Enviamos um código de verificação para seu email. Insira-o
                  abaixo.
                </p>
                <label
                  htmlFor="codigo"
                  className="font-bold text-main-green block"
                >
                  Código
                </label>
                <input
                  required
                  type="codigo"
                  name="codigo"
                  minLength={6}
                  maxLength={6}
                  value={inputCode}
                  onChange={(e: any) => {
                    setInputCode(e.target.value);
                  }}
                  className="transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full rounded p-3 box-border outline-0 border-2 border-black focus:border-main-green"
                />
              </div>

              {error && (
                <div className="w-full rounded bg-red-400 text-red-700 mb-5 text-center border-2 border-black">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="transition ease-in-out duration-200 font-bold border-2 border-main-green bg-black text-main-green hover:bg-main-green hover:text-black p-2 rounded"
              >
                Verificar Código
              </button>
            </form>
          )}

          {validCode && (
            <form onSubmit={handleSubmit}>
              <div className="my-5">
                <label
                  htmlFor="senha"
                  className="font-bold text-main-green block"
                >
                  Nova senha
                </label>
                <input
                  required
                  type={visibility}
                  name="senha"
                  minLength={8}
                  onChange={(e: any) => {
                    setPassword(e.target.value);
                  }}
                  className="transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full rounded p-3 box-border outline-0 border-2 border-black focus:border-main-green"
                />
              </div>
              <div className="my-5">
                <label
                  htmlFor="repsenha"
                  className="font-bold text-main-green block"
                >
                  Repita a senha
                </label>
                <input
                  required
                  type={visibility}
                  name="repsenha"
                  minLength={8}
                  onChange={(e: any) => {
                    setResPassword(e.target.value);
                  }}
                  className="transition ease-in-out duration-200 text-white bg-[#333] h-6 w-full rounded p-3 box-border outline-0 border-2 border-black focus:border-main-green"
                />
              </div>

              <div className="mb-5">
                <input
                  type="checkbox"
                  onClick={verSenha}
                  className="w-4 h-4 cursor-pointer"
                />{" "}
                Ver senha
              </div>

              {errorSenha && (
                <div className="w-full rounded bg-red-400 text-red-700 mb-5 text-center border-2 border-black">
                  {errorSenha}
                </div>
              )}

              <button
                type="submit"
                className="transition ease-in-out duration-200 font-bold border-2 border-main-green bg-black text-main-green hover:bg-main-green hover:text-black p-2 rounded"
              >
                Alterar senha
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
