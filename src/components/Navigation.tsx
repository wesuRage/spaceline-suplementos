"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navigation() {
  const Router = useRouter();

  const Pesquisar = (event: any) => {
    if (event.key == "Enter") {
      const input = (document.getElementById("buscar") as HTMLInputElement)
        .value;
      if (input != "") {
        Router.push(`/produtos?search=${input.toLowerCase()}`);
      }
    }
  };

  const PesquisarBotao = () => {
    const input = (document.getElementById("buscar") as HTMLInputElement).value;
    if (input != "") {
      Router.push(`/produtos?search=${input.toLowerCase()}`);
    }
  };

  return (
    <header className="z-10">
      <nav className="bg-black border-b-4 border-[var(--green-200)] fixed min-w-full">
        <div className="p-4 flex justify-between align-middle text-[var(--green-200)]">
          <Link prefetch href={"/"}>
            <Image
              src="/logo.jpeg"
              alt="logo"
              width={30}
              height={30}
              draggable={false}
              className="inline select-none "
            />
            <h1 className="font-bold m-2 select-none hidden md:inline">
              SPACELINE SUPLEMENTOS
            </h1>
          </Link>
          <div className="flex gap-5">
            <input
              type="text"
              id="buscar"
              onKeyDown={Pesquisar}
              placeholder="Pesquisar"
              className="text-white bg-[#333] h-6 w-60 sm:w-48 rounded-xl p-3 box-border outline-0 border-2 border-black focus:border-[var(--green-200)]"
            />
            <button onClick={PesquisarBotao} className="h-0">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <Link href={"/perfil"}>
              <i className="fa-solid fa-user"></i>
            </Link>
            <Link href={"/carrinho"}>
              <i className="fa-solid fa-cart-shopping"></i>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
