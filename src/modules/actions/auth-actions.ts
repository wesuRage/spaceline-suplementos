import * as bcrypt from "bcrypt";
import { redirect } from "next/navigation";

async function createAccount(formData: FormData) {
  "use server";

  const nome = formData.get("nome") as string;
  const email = formData.get("email") as string;
  const senha = formData.get("senha") as string;

  if (!nome || !email || !senha) {
    console.log("Erro: preencha todos os campos");
    return;
  }

  const user = await fetch(`http://localhost:3000/usuarios/${email}`).then(
    (res) => res.json()
  );

  if (user.message != "Usuário não encontrado") {
    console.log("Erro: Usuário já cadastrado");
    return;
  }

  const hashSenha = await bcrypt.hash(senha, 10);

  const data = {
    nome: nome,
    email: email,
    senha: hashSenha,
  };

  await fetch(`http://localhost:3000/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  redirect("/login");
}

async function Login(formData: FormData) {
  "use server";

  const email = formData.get("email") as string;
  const senha = formData.get("senha") as string;

  const user = await fetch(`http://localhost:3000/usuarios/${email}`).then(
    (res) => res.json()
  );

  if (!user) {
    console.log("error: user not found at login");
    redirect("/login");
  }

  const isMatch = await bcrypt.compare(senha, user.senha);

  if (!isMatch) {
    console.log("Usuário ou senha inválidos");
    redirect("/login");
  }

  redirect("/perfil");
}

const AuthActions = {
  createAccount,
  Login,
};

export default AuthActions;
