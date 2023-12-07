import { jwtVerify } from "jose";
import { env } from "../../next.config";
import Utils from "@/helpers/helpers";
import { NextResponse } from "next/server";
import { cookies } from "next/dist/client/components/headers";

export class TokenUtils {
  static async validTokenJOSE(token) {
    try {
      const keyEncrypt = new TextEncoder().encode(
        env._API.encrypt.TOKEN_WEB_ENCRYPT
      );
      const { payload, protectedHeader } = await jwtVerify(token, keyEncrypt);
      return Utils.Message(false, 200, "Ok", payload);
    } catch (error) {
      return Utils.Message(true, 500, "Error");
    }
  }

  static validExpToken(token) {
    try {
      // Si la fecha de expiración es menor o igual a la fecha actual, el token expirá
      return token.exp <= Date.now() / 1000;
    } catch (error) {
      // Si sucede algun problema, indicamos que el token expirá
      return true;
    }
  }

  static getToken() {
    try {
      const mainCookie = NextResponse.next().cookies.getAll();
      return mainCookie;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static cookieParts = {
    httpOnly: true,
    secure: env.server.node_env === "production",
    sameSite: "strict",
    maxAge: 86400,
    path: "/",
  };

  static setCookie(name, value) {
    return {
      name,
      value,
      ...TokenUtils.cookieParts,
    };
  }

  static async destructureTokens(mainRol, userAccess, userInformation) {
    try {
      const tokenValidMR = await TokenUtils.validTokenJOSE(mainRol);
      const tokenValidUA = await TokenUtils.validTokenJOSE(userAccess);
      const tokenValidUI = await TokenUtils.validTokenJOSE(userInformation);
      return { tokenValidMR, tokenValidUR, tokenValidUA, tokenValidUI };
    } catch (error) {
      return false;
    }
  }

  static getAllCookiesClient() {
    try {
      const cookieStorage = cookies();
      const mainRoleToken = cookieStorage.get(
        env.server.cookies.main_role.name
      );
      const userAccessPathsToken = cookieStorage.get(
        env.server.cookies.user_access_paths.name
      );
      const userDataToken = cookieStorage.get(
        env.server.cookies.user_information.name
      );
      if (!mainRoleToken || !userAccessPathsToken) return false;
      return {
        mainRoleToken,
        userAccessPathsToken,
        userDataToken,
      };
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static destructureAllCookiesClient(context) {
    try {
      const cookieRaw = context?.req?.headers["set-cookie"];
      const _getCookies = context.req.cookies;
      if (!cookieRaw && !_getCookies) return false;
      const cookies = _getCookies || {};
      if (cookieRaw)
        cookieRaw
          .join("; ")
          .split("SameSite=strict,")
          .map((_cookie) => {
            const parts = _cookie.split("; ");
            const [name, value] = parts[0].split("=");
            if (value == "") return undefined;
            cookies[name] = value;
          });
      const cookiesSend = {
        mainRoleToken: cookies[env.server.cookies.main_role.name],
        userDataToken: cookies[env.server.cookies.user_information.name],
        userAccessPathsToken:
          cookies[env.server.cookies.user_access_paths.name],
      };
      return cookiesSend;
    } catch (error) {
      return false;
    }
  }
}
