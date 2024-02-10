"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import PageContainer from "./components/PageContainer";
import { Key, useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import { GetFirstName } from "@/functions/GetFirstName";
import { Metadata } from "next";
import ProdutosContainer from "./components/ProdutosContainer";
import Link from "next/link";
import Produto from "./components/Protudo";

export default function Dashboard() {
  const router = useRouter();
  const [data, setData] = useState<any>();
  const [produtos, setProdutos] = useState<any>();
  const { data: session } = useSession();

  if (session?.user.role != "admin") {
    router.push("/perfil");
    return;
  }

  if (!session) {
    router.push("/login");
    return;
  }

  useEffect(() => {
    fetch(`/api/usuarios/${session.user.email}`)
      .then((response) => response.json())
      .then((response: any) => {
        setData(response);
      });
  }, []);

  useEffect(() => {
    fetch("/api/produtos")
      .then((response) => response.json())
      .then((response: any) => {
        setProdutos(response);
      });
  }, []);

  if (!data) return <Spinner />;

  return (
    <main className="flex justify-center">
      <PageContainer>
        <div>
          <div className="text-center text-xl text-[var(--green-200)] font-bold">
            Olá, {GetFirstName(data.nome)}
          </div>

          <section>
            <div className="flex justify-between text-[var(--green-200)]">
              <div>
                <i className="fa-solid fa-house "></i>
                <p className="font-bold ms-2 inline">Estoque</p>
              </div>

              <Link
                className="p-2 border-2 border-[var(--green-200)] rounded hover:bg-[var(--green-200)] hover:text-black font-bold"
                href={"/dashboard/adicionar"}
              >
                Adicionar
              </Link>
            </div>
            <ProdutosContainer>
              {produtos?.length != 0 ? (
                produtos?.map((produto: any, key: Key) => {
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
              Logout
            </button>
          </div>
        </div>
      </PageContainer>
    </main>
  );
}
