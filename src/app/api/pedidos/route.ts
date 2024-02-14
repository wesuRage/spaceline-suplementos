import { connectToDatabase } from "@/helpers/server-helpers";
import prisma from "../../../../prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();

    return NextResponse.json(await prisma.pedido.findMany(), { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
