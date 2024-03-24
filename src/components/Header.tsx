"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const Router = useRouter();
  const { data: session } = useSession();

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
    <header className="fixed z-20">
      <nav className="bg-black border-b-4 border-[#333] fixed min-w-full">
        <div className="p-4 flex justify-between align-middle text-main-green">
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
              autoComplete="off"
              type="text"
              id="buscar"
              onKeyDown={Pesquisar}
              placeholder="Pesquisar"
              className="transition ease-in-out duration-200 text-white bg-[#333] h-6 w-60 sm:w-48 rounded-xl p-3 box-border outline-0 border-2 border-black focus:border-main-green"
            />
            <button onClick={PesquisarBotao} className="h-0">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>

            {(session?.user.role == "user" || !session) && (
              <>
                <Link href={"/perfil"}>
                  <i className="fa-solid fa-user"></i>
                </Link>
                <Link href={"/carrinho"}>
                  <i className="fa-solid fa-cart-shopping"></i>
                </Link>
              </>
            )}
            {session?.user.role == "admin" && (
              <Link href={"/dashboard"}>
                <i className="fa-solid fa-gear"></i>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
