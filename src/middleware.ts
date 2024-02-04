import { NextRequest, NextResponse } from "next/server";
import AuthService from "./modules/services/auth-service";

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};

const rotasPublicas = ["/cadastro", "/login", "/produtos", "/carrinho"];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (rotasPublicas.includes(pathname)) {
    return NextResponse.next();
  }

  const session = AuthService.isSessionValid();

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
