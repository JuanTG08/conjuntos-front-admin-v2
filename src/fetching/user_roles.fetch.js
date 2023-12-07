import { FetchUtils } from "@/utils/fetch.utils";
import { env } from "../../next.config";
import Utils from "@/helpers/helpers";

const URL_API_PRINCIPAL = env._API.url + env._API.routes.user_roles.url;
const URL_API_LOCAL =
  env.server.url_local +
  env.server.api.url +
  env.server.api.routes.user_roles.url;
export class UserRolesFetching {
  static async deleteApiPrincipal(idUserRol, tokenOuth) {
    try {
      const url =
        URL_API_PRINCIPAL + env._API.routes.user_roles.find_upd_del + idUserRol;
      const res = await FetchUtils.send(url, { method: "DELETE", tokenOuth });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async deleteApiLocal(idUserRol) {
    try {
      const url =
        URL_API_LOCAL +
        env.server.api.routes.user_roles.urlRUD +
        "/" +
        idUserRol;
      const res = await FetchUtils.send(url, { method: "DELETE" });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }
}
