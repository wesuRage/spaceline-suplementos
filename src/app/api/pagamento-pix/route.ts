import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import https from "https";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const { preco } = await request.json();

    const data = fs.readFileSync(
      path.resolve(__dirname, `../../../../../certs/${process.env.EFI_CERT}`)
    );

    const agent = new https.Agent({
      pfx: data,
      passphrase: "",
    });

    const credentials = Buffer.from(
      `${process.env.EFI_CLIENT_ID}:${process.env.EFI_CLIENT_SECRET}`
    ).toString("base64");

    const response = await axios({
      method: "POST",
      url: `${process.env.EFI_ENDPOINT}/oauth/token/`,
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/json",
      },
      httpsAgent: agent,
      data: {
        grant_type: "client_credentials",
      },
    }).then((response) => {
      return response.data;
    });

    const api_key = response.access_token;
    const dataCob = {
      calendario: {
        expiracao: 3600,
      },
      valor: {
        original: preco,
      },
      chave: process.env.CHAVE_PIX,
      solicitacaoPagador: "Preço total",
    };

    const config = {
      httpsAgent: agent,
      headers: {
        Authorization: `Bearer ${api_key}`,
        "Content-Type": "application/json",
      },
    };

    const cobResponse: any = await axios
      .post(`${process.env.EFI_ENDPOINT}/v2/cob`, dataCob, config)
      .then((response) => {
        return response.data;
      });

    const qrCodeResponse = await axios
      .get(
        `${process.env.EFI_ENDPOINT}/v2/loc/${cobResponse.loc.id}/qrcode`,
        config
      )
      .then((response) => {
        return response.data;
      });

    return NextResponse.json(
      {
        txid: cobResponse.txid,
        pixCopiaECola: qrCodeResponse.qrcode,
        qrCode: qrCodeResponse.imagemQrcode,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
