import Utils from "@/helpers/helpers";
import { env } from "../../next.config";
import { FetchUtils } from "@/utils/fetch.utils";

const URL_API_PRINCIPAL = env._API.url + env._API.routes.user_to_register.url;
const URL_API_LOCAL =
  env.server.url_local +
  env.server.api.url +
  env.server.api.routes.user_to_register.url;
export class UserToRegisterFetching {
  // Establecemos que deseamos crear un nuevo registro para registrar un nuevo usuario
  static async postApiPrincipalNew(data, tokenOuth) {
    try {
      const url = URL_API_PRINCIPAL + env._API.routes.user_to_register.create;
      const res = await FetchUtils.send(url, {
        method: "POST",
        body: data,
        tokenOuth,
      });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async deleteApiPrincipal(idUserToRegister, tokenOuth) {
    try {
      const url =
        URL_API_PRINCIPAL +
        env._API.routes.user_to_register.delete +
        idUserToRegister;
      const res = await FetchUtils.send(url, {
        method: "DELETE",
        tokenOuth,
      });
      return res;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async deleteApiLocal(idUserToRegister) {
    try {
      const url =
        URL_API_LOCAL +
        env.server.api.routes.user_to_register.urlRUD +
        "/" +
        idUserToRegister;
      const res = await FetchUtils.send(url, { method: "DELETE" });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }
}
