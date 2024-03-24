"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import PageContainer from "./components/PageContainer";
import { Key, useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import { GetFirstName } from "@/functions/GetFirstName";
import ProdutosContainer from "./components/ProdutosContainer";
import Link from "next/link";
import Produto from "./components/Produto";
import PedidosContainer from "./components/PedidosContainer";
import Pedido from "./components/Pedido";

export default function Dashboard() {
  const router = useRouter();
  const [data, setData] = useState<any>();
  const [produtos, setProdutos] = useState<any>();
  const [pedidos, setPedidos] = useState<any>();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

  useEffect(() => {
    if (session?.user.role != "admin") {
      router.push("/perfil");
      return;
    }
  }, []);

  useEffect(() => {
    fetch(`/api/usuarios/${session?.user.email}`)
      .then((response) => response.json())
      .then((response: any) => {
        setData(response);
      });

    fetch("/api/produtos")
      .then((response) => response.json())
      .then((response: any) => {
        setProdutos(response);
      });

    fetch("/api/pedidos")
      .then((response) => response.json())
      .then((response: any) => {
        setPedidos(response);
      });
  }, []);

  if (!data) return <Spinner />;

  let produtosOrdemAlfabetica: Array<string> = [];

  produtos.map((produto: any) => {
    produtosOrdemAlfabetica.push(produto);
    produtosOrdemAlfabetica.sort(function (a: any, b: any) {
      if (a.nomeProduto < b.nomeProduto) {
        return -1;
      }
      if (a.nomeProduto > b.nomeProduto) {
        return 1;
      }
      return 0;
    });
  });

  return (
    <main className="flex justify-center">
      <PageContainer>
        <div>
          <div className="text-center text-xl text-main-green font-bold">
            Olá, {GetFirstName(data.nome)}
          </div>

          <section>
            <div className="text-main-green">
              <div>
                <i className="fa-solid fa-pen-to-square"></i>
                <p className="font-bold ms-2 inline">Pedidos</p>
              </div>
            </div>
            <PedidosContainer>
              {pedidos?.length != 0 ? (
                pedidos?.map((pedido: any, key: Key) => {
                  return (
                    <Pedido
                      src={pedido.imagemURL}
                      pedido={pedido.pedido}
                      key={key}
                    />
                  );
                })
              ) : (
                <h1 className="text-center">Ainda não há pedidos.</h1>
              )}
            </PedidosContainer>
          </section>

          <hr className="border-t-2 border-[#333] my-3" />

          <section>
            <div className="flex justify-between items-center text-main-green">
              <div>
                <i className="fa-solid fa-house"></i>
                <p className="font-bold ms-2 inline">Estoque</p>
              </div>

              <Link
                className="transition ease-in-out duration-200 p-2 border-2 border-main-green rounded hover:bg-main-green hover:text-black font-bold"
                href={"/dashboard/adicionar"}
              >
                Adicionar
              </Link>
            </div>
            <ProdutosContainer>
              {produtosOrdemAlfabetica?.length != 0 ? (
                produtosOrdemAlfabetica?.map((produto: any, key: Key) => {
                  return (
                    <Produto
                      src={produto.imagemURL}
                      nome={produto.nomeProduto}
                      preco={produto.preco}
                      key={key}
                    />
                  );
                })
              ) : (
                <h1 className="text-center">
                  Ainda não há produtos no estoque.
                </h1>
              )}
            </ProdutosContainer>
          </section>

          <hr className="border-t-2 border-[#333] my-3" />
          <div className="flex justify-center">
            <button
              className="text-red-500 border-2 border-red-500 p-2 rounded hover:text-black hover:bg-red-500 transiti ease-in-out duration-200 font-bold"
              onClick={() => signOut()}
            >
              Sair da conta
            </button>
          </div>
        </div>
      </PageContainer>
    </main>
  );
}
