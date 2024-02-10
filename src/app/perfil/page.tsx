"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import PageContainer from "./components/PageContainer";
import { GetFirstName } from "@/functions/GetFirstName";
import Spinner from "@/components/Spinner";
import { useEffect, useState } from "react";

export default function Perfil() {
  const router = useRouter();
  const [data, setData] = useState<any>();
  const { data: session } = useSession();

  if (!session?.user) {
    router.push("/login");
    return;
  }

  if (session?.user.role == "admin") {
    router.push("/dashboard");
    return;
  }

  useEffect(() => {
    fetch(`http://localhost/api/usuarios/${session.user.email}`)
      .then((response) => response.json())
      .then((response: any) => {
        setData(response);
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
