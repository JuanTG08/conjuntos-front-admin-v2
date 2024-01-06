import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";
import { AuthController } from "@/controller/auth.controller";
import { setCookie } from "nookies";
import { env } from "../../../../../next.config";
import { TokenUtils } from "@/utils/token.utils";

export const authOptions = (req, res) => ({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        const getTokens = await AuthController.apiPostPreLoginUser(user.email);
        if (getTokens.error || getTokens.statusCode != 200)
          throw new Error("Usuario no existente");
        return true;
      } catch (error) {
        console.log(error);
        return false; // Indica que el inicio de sesión no fue exitoso
      }
    },
  },
  events: {
    async signOut({ token, session }) {
      try {
        setCookie(
          { res },
          env.server.cookies.main_role.name,
          null,
          TokenUtils.cookieParts
        );
        setCookie(
          { res },
          env.server.cookies.user_access_paths.name,
          null,
          TokenUtils.cookieParts
        );
        setCookie(
          { res },
          env.server.cookies.user_information.name,
          null,
          TokenUtils.cookieParts
        );
      } catch (error) {
        console.log("Error al cerrar sesión");
      }
    },
  },
  pages: {
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export default (req, res) => {
  return NextAuth(req, res, authOptions(req, res));
};
