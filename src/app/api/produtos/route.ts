import { connectToDatabase } from "@/helpers/server-helpers";
import prisma from "../../../../prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();

    return NextResponse.json(await prisma.produto.findMany(), { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: Request) {
  try {
    const {
      imagemURL,
      nomeProduto,
      preco,
      precoRiscado,
      descricao,
      comprados,
      tags,
      altura,
      largura,
      comprimento,
      peso,
    } = await request.json();

    if (
      !imagemURL ||
      !nomeProduto ||
      !preco ||
      !descricao ||
      !tags ||
      !altura ||
      !largura ||
      !comprimento ||
      !peso
    ) {
      return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
    }

    await connectToDatabase();
    await prisma.produto.create({
      data: {
        imagemURL,
        nomeProduto,
        preco,
        precoRiscado: precoRiscado || null,
        descricao,
        comprados: comprados || 0,
        tags,
        altura,
        largura,
        comprimento,
        peso,
      },
    });

    return NextResponse.json(
      {
        imagemURL,
        nomeProduto,
        preco,
        precoRiscado: precoRiscado || null,
        descricao,
        comprados: comprados || 0,
        tags,
        altura,
        largura,
        comprimento,
        peso,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
