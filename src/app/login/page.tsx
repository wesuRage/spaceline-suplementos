"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [visibility, setVisibility] = useState("password");
  const { data: session } = useSession();

  if (session) {
    if (session?.user.role != "admin") {
      router.push("/perfil");
    } else {
      router.push("/dashboard");
    }
  }

  function verSenha() {
    if (visibility === "password") {
      setVisibility("text");
    } else {
      setVisibility("password");
    }
  }

  async function loginUser(e: any) {
    e.preventDefault();
    const res = await signIn("credentials", {
      email: email,
      senha: senha,
      redirect: false,
    });

    if (res?.error) {
      setError("Credenciais inválidas");
      return;
    }

    router.replace("/perfil");
  }

  return (
    <main className="flex justify-center">
      <section className="bg-black p-5 m-10 rounded-xl border-2 border-[#333] w-full max-w-[390px]">
        <div className="text-xl text-main-green">
          <h1 className="font-bold">Login</h1>
        </div>
        <div>
          <form onSubmit={loginUser}>
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
            <div className="my-5">
              <label
                htmlFor="senha"
                className="font-bold text-main-green block"
              >
                Senha
              </label>
              <input
                required
                autoComplete="off"
                type={visibility}
                name="senha"
                id="senha"
                onChange={(e: any) => {
                  setSenha(e.target.value);
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
            <div className="mb-5">
              <Link
                href={"/recuperar"}
                className="transition ease-in-out duration-200 text-sm hover:text-[--green-200] "
              >
                Esqueci minha senha
              </Link>
            </div>
            {error && (
              <div className="w-full rounded bg-red-400 text-red-700 mb-5 text-center border-2 border-black">
                {error}
              </div>
            )}
            <div className="flex justify-between">
              <button
                type="submit"
                className="transition ease-in-out duration-200 font-bold border-2 border-main-green bg-black text-main-green hover:bg-main-green hover:text-black p-2 rounded"
              >
                Login
              </button>
              <Link
                href={"/cadastro"}
                className="transition ease-in-out duration-200 p-2 hover:text-main-green"
              >
                Criar conta
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
