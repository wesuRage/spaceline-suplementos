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
      fatosNutricionaisURL,
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
      tipo,
      escolhas,
    } = await request.json();

    if (
      !imagemURL ||
      !nomeProduto ||
      !preco ||
      !precoRiscado ||
      !descricao ||
      !tags ||
      !altura ||
      !largura ||
      !comprimento ||
      !comprados ||
      !peso ||
      !tipo
    ) {
      return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
    }

    await connectToDatabase();
    await prisma.produto.create({
      data: {
        imagemURL,
        fatosNutricionaisURL: fatosNutricionaisURL || "",
        nomeProduto,
        preco,
        precoRiscado,
        descricao,
        comprados,
        tags,
        altura,
        largura,
        comprimento,
        tipo,
        escolhas,
        peso,
        avaliacoes: [],
      },
    });

    return NextResponse.json(
      {
        imagemURL,
        fatosNutricionaisURL: fatosNutricionaisURL || "",
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
        avaliacoes: [],
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
