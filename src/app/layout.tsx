import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Provider } from "@/components/Provider";

export const metadata: Metadata = {
  title: "Spaceline Suplementos",
  description:
    "Suplementos e acessórios de alta qualidade para você ter o seu melhor desempenho em seu treino.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <Provider>
        <body suppressHydrationWarning={true}>
          <Header />
          <div className="h-[65px] w-full bg-black"></div>
          {children}
          <Footer />
        </body>
      </Provider>
    </html>
  );
}
