import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex justify-center text-center">
      <div className="bg-black m-4 p-5 border-2 border-[#333] rounded-xl">
        <h1 className="text-xl text-main-green">404</h1>
        <h2>página não encontrada.</h2>
        <p>
          Clique{" "}
          <Link
            href={"/"}
            className="text-main-green hover:underline decoration-main-green"
          >
            aqui
          </Link>{" "}
          para voltar a página inicial.
        </p>
      </div>
    </main>
  );
}
