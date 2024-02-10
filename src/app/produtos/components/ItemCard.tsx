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
      className="transition ease-in-out duration-200 text-white border-2 border-[#333] hover:border-[var(--green-200)] max-w-[120px] ms-2 p-2 rounded-md"
    >
      <Image
        src={`${imagemURL}`}
        alt={`${nomeProduto}`}
        width={120}
        height={120}
        className="rounded-md mb-2"
      />
      <h1 className="text-sm truncate w-full">{nomeProduto}</h1>
      <br />
      <h3 className="text-[#888] text-sm line-through">
        {"R$" + `${precoRiscado}`.replace(".", ",")}
      </h3>
      <h2 className="text-[var(--green-200)]">
        {"R$" + `${preco}`.replace(".", ",")}
      </h2>
    </Link>
  );
}
