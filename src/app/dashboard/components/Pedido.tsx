"use client";

import Image from "next/image";
import Link from "next/link";
import { Key } from "react";

interface ProdutoProps {
  src: string;
  pedido: string;
  key: Key;
}

export default function Produto({ src, pedido, key }: ProdutoProps) {
  return (
    <Link
      href={`/pedidos/${pedido}`}
      className="z-0 mb-2 transition ease-in-out duration-200 flex justify-between border-2 border-[#333] hover:border-main-green p-2 rounded-xl "
      key={key}
    >
      <div className="relative w-[35px] h-[35px]">
        <Image src={src} alt={pedido} layout="fill" className="rounded" />
      </div>
      <p className="w-[100px] inline ms-5 truncate md:w-[280px] mt-2">
        {pedido}
      </p>
    </Link>
  );
}
