import Utils from "@/helpers/helpers";
import { FetchUtils } from "@/utils/fetch.utils";
import { env } from "../../next.config";

const URL_API_PRINCIPAL = env._API.url + env._API.routes.call.url;
const URL_API_LOCAL =
  env.server.url_local + env.server.api.url + env.server.api.routes.call.url;
export class CallFetching {
  static async getApiPrincipalNumber(idUser, tokenOuth) {
    try {
      const url = URL_API_PRINCIPAL + env._API.routes.call.find_number + idUser;
      const res = await FetchUtils.send(url, { tokenOuth });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Error al enviarse");
    }
  }

  static async executeApiLocal(idUser) {
    try {
      const url = URL_API_LOCAL + "/" + idUser;
      const res = await FetchUtils.send(url);
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Error al enviarse");
    }
  }
}
