"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className={`bg-black border-t-4 border-[#333] pb-5 max-w-full`}>
      <div className={`md:flex md:justify-center text-main-green pt-5 text-xl`}>
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

      <div className="flex sm:flex-col sm:justify-center md:flex-row md:justify-around ">
        <section className="my-5 md:ms-0 sm:ms-36">
          <h3 className={`text-main-green font-extrabold`}>Marcas</h3>
          <ul className="text-white">
            <li className={`hover:underline`}>
              <Link prefetch href={"/produtos?search=growth"}>
                Growth
              </Link>
            </li>
            <li className="hover:underline">
              <Link prefetch href={"/produtos?search=max titanium"}>
                Max Titanium
              </Link>
            </li>
            <li className="hover:underline">
              <Link prefetch href={"/produtos?search=black skull"}>
                Black Skull
              </Link>
            </li>
            <li className="hover:underline">
              <Link prefetch href={"/produtos?search=integralmedica"}>
                Integralmedica
              </Link>
            </li>
          </ul>
        </section>
        <section className="my-5 md:ms-0 sm:ms-36">
          <h3 className={`text-main-green font-extrabold`}>Categorias</h3>
          <ul className="text-white">
            <li>
              <Link
                prefetch
                href={"/produtos?search=whey protein"}
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
              <Link prefetch href={"/produtos?search=pre treino"}>
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
          </ul>
        </section>
        <section className="my-5 md:ms-0 sm:ms-36">
          <h3 className={`text-main-green font-extrabold`}>Fale conosco</h3>
          <ul className="text-white">
            <li>
              <Link target="_blank" href={"mailto:contato@spaceline.shop"}>
                <i className={`fa-regular fa-envelope text-main-green`}></i>{" "}
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
                <i className={`fa-brands fa-instagram text-main-green`}></i>{" "}
                <p className={`hover:underline inline`}>@space.line1</p>
              </Link>
            </li>
            <li>
              <Link target="_blank" href={"https://wa.me/554199521909"}>
                <i className={`fa-brands fa-whatsapp text-main-green`}></i>{" "}
                <p className={`hover:underline inline`}>+55 (41) 9 9952-1909</p>
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </footer>
  );
}
