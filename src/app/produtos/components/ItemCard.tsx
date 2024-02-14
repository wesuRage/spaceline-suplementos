import Image from "next/image";
import Link from "next/link";

interface ItemCardProps {
  imagemURL: String;
  nomeProduto: String;
  preco: Number;
  precoRiscado: Number;
}

export default function ItemCard({
  imagemURL,
  nomeProduto,
  preco,
  precoRiscado,
}: ItemCardProps) {
  return (
    <Link
      href={`/produtos/${nomeProduto}`}
      className="transition ease-in-out duration-200 text-white border-2 border-[#333] hover:border-main-green w-[120px] ms-2 p-2 rounded-md"
    >
      <div className="relative max-w-[100px] h-[100px] mb-2">
        <Image
          src={`${imagemURL}`}
          alt={`${nomeProduto}`}
          layout="fill"
          className="rounded-md mb-2"
        />
      </div>
      <h1 className="text-sm w-full line-clamp-3">{nomeProduto}</h1>
      {precoRiscado != 0 ? (
        <h3 className="text-[#888] text-sm line-through mb-1">
          R${`${precoRiscado}`}
        </h3>
      ) : (
        <h3 className="invisible">R${`${precoRiscado}`}</h3>
      )}
      <h2 className="text-main-green bg-[var(--green-100)] rounded p-[2px] inline">
        R${`${preco}`}
      </h2>
    </Link>
  );
}
