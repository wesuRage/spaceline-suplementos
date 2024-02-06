import { NextResponse } from "next/server";
import { connectToDatabase } from "@/helpers/server-helpers";
import prisma from "../../../../../prisma";
import bcrypt from "bcrypt";

export async function GET(request: Request, context: any) {
  try {
    const { params } = context;
    const Email = params.email;

    await connectToDatabase();

    return NextResponse.json(
      await prisma.usuario.findUnique({
        where: {
          email: Email,
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
    const Email = params.email;

    let {
      nome,
      email,
      senha,
      telefone,
      cep,
      estado,
      cidade,
      bairro,
      rua,
      numero,
      complemento,
      cpf,
      cartao,
      nomeCartao,
      cvv,
      validade,
    } = await request.json();

    senha = await bcrypt.hash(senha, 10);
    await connectToDatabase();

    await prisma.usuario.update({
      where: {
        email: Email,
      },
      data: {
        nome,
        email,
        senha,
        telefone: telefone || null,
        cep: cep || null,
        estado: estado || null,
        cidade: cidade || null,
        bairro: bairro || null,
        rua: rua || null,
        numero: numero || null,
        complemento: complemento || null,
        cpf: cpf || null,
        cartao: cartao || null,
        nomeCartao: nomeCartao || null,
        cvv: cvv || null,
        validade: validade || null,
      },
    });

    return NextResponse.json(
      {
        nome,
        email,
        senha,
        telefone: telefone || null,
        cep: cep || null,
        estado: estado || null,
        cidade: cidade || null,
        bairro: bairro || null,
        rua: rua || null,
        numero: numero || null,
        complemento: complemento || null,
        cpf: cpf || null,
        cartao: cartao || null,
        nomeCartao: nomeCartao || null,
        cvv: cvv || null,
        validade: validade || null,
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
