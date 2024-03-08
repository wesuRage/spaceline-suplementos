import { connectToDatabase } from "@/helpers/server-helpers";
import prisma from "../../../../../prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request, context: any) {
  try {
    const { params } = context;
    const email = params.email;

    await connectToDatabase();

    return NextResponse.json(
      await prisma.carrinho.findMany({
        where: {
          email: email,
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

export async function POST(request: Request, context: any) {
  try {
    const { nomeProduto } = await request.json();
    const { params } = context;
    const email = params.email;

    if (!nomeProduto || !email) {
      return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
    }

    await connectToDatabase();

    await prisma.carrinho.create({
      data: {
        email,
        nomeProduto,
      },
    });

    return NextResponse.json({ email, nomeProduto }, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(request: Request, context: any) {
  try {
    const { nomeProduto } = await request.json();
    const { params } = context;
    const email = params.email;

    await connectToDatabase();

    await prisma.carrinho.deleteMany({
      where: {
        email: email,
        AND: {
          nomeProduto: nomeProduto,
        },
      },
    });

    return NextResponse.json(
      {
        message: "Produto deletado do carrinho com sucesso!",
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
