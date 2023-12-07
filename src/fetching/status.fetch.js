import { FetchUtils } from "@/utils/fetch.utils";
import { env } from "../../next.config";
import Utils from "@/helpers/helpers";

const URL_API_PRINCIPAL = env._API.url + env._API.routes.status.url;
const URL_API_LOCAL =
  env.server.url_local + env.server.api.url + env.server.api.routes.status.url;
export class StatusFetching {
  // Obtenemos todos los datos de la API principal que esta conectada a la base de datos
  static async getApiPrincipalListAll(data, tokenOuth) {
    try {
      const url = URL_API_PRINCIPAL + env._API.routes.status.list_all;
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

  // Hacemos la peticion a nuestra API local para que esta haga la peticion a la API principal
  static async getApiLocalListAll(statusTo) {
    try {
      const url = URL_API_LOCAL + "/" + statusTo;
      const res = await FetchUtils.send(url);
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error", error);
    }
  }
}
