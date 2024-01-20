import Utils from "@/helpers/helpers";
import { env } from "../../next.config";
import { FetchUtils } from "@/utils/fetch.utils";

const URL_API_PRINCIPAL = env._API.url + env._API.routes.auth.url;
const URL_API_LOCAL =
  env.server.url_local + env.server.api.url + env.server.api.routes.auth.url;
export class AuthFetching {
  // Realizamos la petición para que se registre el usuario
  static async postApiRegisterWeb(data, token, tokenOuth) {
    try {
      const url =
        URL_API_PRINCIPAL + env._API.routes.auth.find_register + token;
      const res = await FetchUtils.send(url, {
        method: "POST",
        body: data,
        tokenOuth,
      });
      return res;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Server Error");
    }
  }

  // Realizamos la petición para que se registre el usuario a nuestra API local
  static async postLocalRegisterWeb(data, token) {
    try {
      const url =
        URL_API_LOCAL + env.server.api.routes.auth.register + "/" + token;
      const res = await FetchUtils.send(url, { method: "POST", body: data });
      return res;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async postApiLoginWeb(data, tokenOuth) {
    try {
      const url = URL_API_PRINCIPAL + env._API.routes.auth.login;
      const res = await FetchUtils.send(url, {
        method: "POST",
        body: data,
        tokenOuth,
      });
      return res;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async postApiPrincipalPreLoginWeb(data) {
    try {
      const url = URL_API_PRINCIPAL + env._API.routes.auth.pre_login;
      const res = await FetchUtils.send(url, {
        method: "POST",
        body: data,
      });
      return res;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Server Error");
    }
  }

  // Cerrar Sesión
  static async getLocalLogout() {
    try {
      const url = URL_API_LOCAL + env.server.api.routes.auth.logout;
      const res = await FetchUtils.send(url);
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  // Comprobamos sí ha iniciado sesión
  static async getLocalIsLogIn() {
    try {
      const url = URL_API_LOCAL + env.server.api.routes.auth.login;
      const res = await FetchUtils.send(url);
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  // Buscamos el usuario para registro mediante su token
  static async getApiPrincipalFindByToken(token) {
    try {
      const url =
        URL_API_PRINCIPAL + env._API.routes.auth.find_register + token;
      const res = await FetchUtils.send(url);
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }
}
