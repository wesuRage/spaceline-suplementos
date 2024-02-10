"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const txt = "text-[var(--green-200)]";

  return (
    <footer className={`bg-black border-t-4 border-[#333] pb-5 w-full`}>
      <div className={`md:flex md:justify-center ${txt} pt-5 text-xl`}>
        <Image
          src="/logo.jpeg"
          alt="logo"
          width={60}
          height={60}
          draggable={false}
          className="sm:block md:inline ml-auto mr-auto md:ml-0 md:mr-0 select-none"
        />
        <h2 className="font-bold m-4 sm:text-center text-sm select-none">
          SPACELINE SUPLEMENTOS <i className="fa-regular fa-copyright"></i>{" "}
          {new Date().getFullYear()}
        </h2>
      </div>

      <div className={`flex justify-center ${txt} text-xs`}>
        <p>CNPJ: 00.000.000/0000-00</p>
      </div>

      <div className="flex sm:flex-col sm:justify-center md:flex-row md:justify-around ">
        <section className="my-5 md:ms-0 sm:ms-36">
          <h3 className={`${txt} font-extrabold`}>Marcas</h3>
          <ul className="text-white">
            <li className={`hover:underline`}>
              <Link prefetch href={"/produtos?search=growth"}>
                Growth
              </Link>
            </li>
            <li className="hover:underline">
              <Link prefetch href={"/produtos?search=max-titanium"}>
                Max Titanium
              </Link>
            </li>
            <li className="hover:underline">
              <Link prefetch href={"/produtos?search=black-skull"}>
                Black Skull
              </Link>
            </li>
          </ul>
        </section>
        <section className="my-5 md:ms-0 sm:ms-36">
          <h3 className={`${txt} font-extrabold`}>Categorias</h3>
          <ul className="text-white">
            <li>
              <Link
                prefetch
                href={"/produtos?search=whey-protein"}
                className="hover:underline"
              >
                Whey Protein
              </Link>
            </li>
            <li className="hover:underline">
              <Link prefetch href={"/produtos?search=creatina"}>
                Creatinas
              </Link>
            </li>
            <li className="hover:underline">
              <Link prefetch href={"/produtos?search=pre-treino"}>
                Pré Treinos
              </Link>
            </li>
            <li className="hover:underline">
              <Link prefetch href={"/produtos?search=hipercalorico"}>
                Hipercalóricos
              </Link>
            </li>
            <li className="hover:underline">
              <Link prefetch href={"/produtos?search=multivitaminico"}>
                Multivitamínicos
              </Link>
            </li>
            <li className="hover:underline">
              <Link prefetch href={"/produtos?search=acessorio"}>
                Acessórios
              </Link>
            </li>
            <li className="hover:underline">
              <Link prefetch href={"/produtos?search=kit"}>
                Kits
              </Link>
            </li>
          </ul>
        </section>
        <section className="my-5 md:ms-0 sm:ms-36">
          <h3 className={`${txt} font-extrabold`}>Fale conosco</h3>
          <ul className="text-white">
            <li>
              <Link target="_blank" href={"mailto:contato@spaceline.shop"}>
                <i className={`fa-regular fa-envelope ${txt}`}></i>{" "}
                <p className={`hover:underline inline`}>
                  contato@spaceline.shop
                </p>
              </Link>
            </li>
            <li>
              <Link
                target="_blank"
                href={"https://www.instagram.com/space.line1/"}
              >
                <i className={`fa-brands fa-instagram ${txt}`}></i>{" "}
                <p className={`hover:underline inline`}>@space.line1</p>
              </Link>
            </li>
            <li>
              <Link target="_blank" href={"https://wa.me/554199521909"}>
                <i className={`fa-brands fa-whatsapp ${txt}`}></i>{" "}
                <p className={`hover:underline inline`}>+55 (41) 9 9952-1909</p>
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </footer>
  );
}
