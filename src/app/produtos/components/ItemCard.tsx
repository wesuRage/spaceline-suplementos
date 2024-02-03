import Image from "next/image";
import Link from "next/link";

export default function ItemCard({
  imagemID,
  nomeProduto,
  preco,
  precoRiscado,
}: {
  imagemID: String;
  nomeProduto: String;
  preco: Number;
  precoRiscado: Number;
}) {
  return (
    <Link
      href={`/produtos/${nomeProduto}`}
      className="text-white border-2 border-[#333] hover:border-[var(--green-200)] max-w-[120px] ms-2 p-2 rounded-md"
    >
      <Image
        src={`http://localhost:3000/images/produtos/${imagemID}.png`}
        alt={`${nomeProduto}`}
        width={120}
        height={120}
        className="rounded-md mb-2"
      />
      <h2 className="text-sm">{nomeProduto}</h2>
      <br />
      <h4 className="text-[#888] text-sm line-through">
        {"R$" + `${precoRiscado}`.replace(".", ",")}
      </h4>
      <h3 className="text-[var(--green-200)]">
        {"R$" + `${preco}`.replace(".", ",")}
      </h3>
    </Link>
  );
}
