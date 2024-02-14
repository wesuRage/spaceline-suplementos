import { connectToDatabase } from "@/helpers/server-helpers";
import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";

export async function GET(request: Request, context: any) {
  try {
    const { params } = context;
    const produto = params.produto;

    await connectToDatabase();
    return NextResponse.json(
      await prisma.produto.findFirst({
        where: {
          nomeProduto: produto,
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(request: Request, context: any) {
  try {
    const { params } = context;
    const produto = params.produto;

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
      avaliacoes: novasAvaliacoes,
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

    const produtoAtual = await prisma.produto.findFirst({
      where: {
        nomeProduto: produto,
      },
    });

    const avaliacoesCombinadas =
      produtoAtual?.avaliacoes.concat(novasAvaliacoes);

    await prisma.produto.update({
      where: {
        nomeProduto: produto,
      },
      data: {
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
        avaliacoes: avaliacoesCombinadas,
      },
    });

    return NextResponse.json(
      {
        message: "Produto atualizado com sucesso!",
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

export async function DELETE(request: Request, context: any) {
  try {
    const { params } = context;
    const produto = params.produto;

    await connectToDatabase();

    await prisma.produto.delete({
      where: {
        nomeProduto: produto,
      },
    });

    return NextResponse.json(
      {
        message: "Produto deletado com sucesso!",
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
