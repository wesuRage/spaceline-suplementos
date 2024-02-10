// @ts-nocheck

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import { connectToDatabase } from "@/helpers/server-helpers";
import prisma from "../../../../../prisma";
import bcrypt from "bcrypt";

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, senha } = credentials;

        await connectToDatabase();

        const user = await prisma.usuario.findUnique({
          where: {
            email: email,
          },
        });

        if (!user) {
          return null;
        }

        const match = await bcrypt.compare(senha, user.senha);

        if (!match) {
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email;
        session.user.role = token.role;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
