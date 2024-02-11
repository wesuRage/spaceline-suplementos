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
      className="transition ease-in-out duration-200 text-white border-2 border-[#333] hover:border-[var(--green-200)] w-[120px] ms-2 p-2 rounded-md"
    >
      <div className="relative max-w-[100px] h-[100px] mb-2">
        <Image
          src={`${imagemURL}`}
          alt={`${nomeProduto}`}
          layout="fill"
          className="rounded-md mb-2"
        />
      </div>
      <h1 className="text-sm w-full">{nomeProduto}</h1>
      <br />
      {precoRiscado != 0 ? (
        <h3 className="text-[#888] text-sm line-through">
          {"R$" + `${precoRiscado}`.replace(".", ",")}
        </h3>
      ) : (
        <h3></h3>
      )}
      <h2 className="text-[var(--green-200)]">
        {"R$" + `${preco}`.replace(".", ",")}
      </h2>
    </Link>
  );
}
