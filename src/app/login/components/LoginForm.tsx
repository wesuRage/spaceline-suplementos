import Link from "next/link";

export default function LoginForm() {
  return (
    <main className="flex justify-center">
      <section className="bg-black p-5 m-10 rounded-xl border-2 border-[var(--green-200)] w-full max-w-[390px]">
        <div className="text-xl text-[var(--green-200)]">
          <h1 className="font-bold">Login</h1>
        </div>
        <div>
          <form>
            <div className="my-5">
              <label
                htmlFor="email"
                className="font-bold text-[var(--green-200)] block"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                className="text-white bg-[#333] h-6 w-full rounded p-3 box-border outline-0 border-2 border-black focus:border-[var(--green-200)]"
              />
            </div>
            <div className="my-5">
              <label
                htmlFor="senha"
                className="font-bold text-[var(--green-200)] block"
              >
                Senha
              </label>
              <input
                type="password"
                name="senha"
                className="text-white bg-[#333] h-6 w-full rounded p-3 box-border outline-0 border-2 border-black focus:border-[var(--green-200)]"
              />
            </div>
            <div className="mb-5">
              <Link
                href={"/recuperar"}
                className="text-sm hover:text-[--green-200] "
              >
                Esqueci minha senha
              </Link>
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="font-bold border-2 border-[var(--green-200)] bg-black text-[var(--green-200)] hover:bg-[var(--green-200)] hover:text-black p-2 rounded"
              >
                Login
              </button>
              <Link
                href={"/cadastro"}
                className="p-2 hover:text-[var(--green-200)]"
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
