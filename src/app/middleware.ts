export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/perfil/:path*",
    "/pedidos/:path*",
    "/carrinho",
    "/dashboard/:path*",
  ],
};
