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
      imagemID,
      nomeProduto,
      preco,
      precoRiscado,
      descricao,
      comprados,
      tags,
    } = await request.json();

    if (!imagemID || !nomeProduto || !preco || !descricao || !tags) {
      return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
    }

    await connectToDatabase();
    await prisma.produto.create({
      data: {
        imagemID,
        nomeProduto,
        preco,
        precoRiscado: precoRiscado || null,
        descricao,
        comprados: comprados || 0,
        tags,
      },
    });

    return NextResponse.json(
      {
        imagemID,
        nomeProduto,
        preco,
        precoRiscado: precoRiscado || null,
        descricao,
        comprados: comprados || 0,
        tags,
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
