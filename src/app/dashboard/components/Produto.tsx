"use client";

import Image from "next/image";
import Link from "next/link";
import { Key } from "react";

interface ProdutoProps {
  src: string;
  nome: string;
  preco: number;
  key: Key;
}

export default function Produto({ src, nome, preco, key }: ProdutoProps) {
  return (
    <Link
      href={`/produtos/${nome}`}
      className="z-0 mb-2 transition ease-in-out duration-200 flex justify-between border-2 border-[#333] hover:border-[var(--green-200)] p-2 rounded-xl "
      key={key}
    >
      <div className="relative w-[35px] h-[35px]">
        <Image src={src} alt={nome} layout="fill" className="rounded" />
      </div>
      <div className="hidden md:inline h-[20px] border-[1px] border-[#333] w-0 ms-5 mt-2"></div>
      <p className="hidden md:inline ms-5 truncate w-[250px] mt-2">{nome}</p>
      <div className="hidden md:inline h-[20px] border-[1px] border-[#333] w-0 ms-5 mt-2"></div>
      <p className="hidden md:inline text-[var(--green-200)] ms-5 mt-2">
        R${preco}
      </p>
      <div className="hidden md:inline h-[20px] border-[1px] border-[#333] w-0 ms-5 mt-2"></div>
      <div className="z-2">
        <Link
          href={`/dashboard/editar/${nome}`}
          className="mt-2 transition ease-in-out duration-200 text-[var(--green-200)] border-2 border-[var(--green-200)] p-1 rounded-xl hover:text-black hover:bg-[var(--green-200)]"
        >
          <i className="fa-solid fa-pencil"></i>
        </Link>
        <Link
          href={`/dashboard/deletar/${nome}`}
          className="ms-8 transition ease-in-out duration-200 text-red-500 border-2 border-red-500 p-1 rounded-xl hover:text-black hover:bg-red-500"
        >
          <i className="fa-solid fa-trash"></i>
        </Link>
      </div>
    </Link>
  );
}
