import { connectToDatabase } from "@/helpers/server-helpers";
import { NextResponse } from "next/server";
import prisma from "../../../../prisma";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    let {
      nome,
      email,
      senha,
      role,
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
    if (!nome || !email || !senha) {
      return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
    }

    senha = await bcrypt.hash(senha, 10);

    await connectToDatabase();

    const exist = await prisma.usuario.findUnique({
      where: {
        email: email,
      },
    });

    if (exist) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const admins = [
      "weslley.nmiranda@gmail.com",
      "weslley@spaceline.shop",
      "kaue@spaceline.shop",
    ];

    if (admins.includes(email)) {
      role = "admin";
    } else {
      role = "user";
    }

    await prisma.usuario.create({
      data: {
        nome,
        email,
        senha,
        role,
        telefone: null,
        cep: null,
        estado: null,
        cidade: null,
        bairro: null,
        rua: null,
        numero: null,
        complemento: null,
        cpf: null,
        cartao: null,
        nomeCartao: null,
        cvv: null,
        validade: null,
      },
    });

    return NextResponse.json(
      {
        nome,
        email,
        senha,
        telefone: null,
        cep: null,
        estado: null,
        cidade: null,
        bairro: null,
        rua: null,
        numero: null,
        complemento: null,
        cpf: null,
        cartao: null,
        nomeCartao: null,
        cvv: null,
        validade: null,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
