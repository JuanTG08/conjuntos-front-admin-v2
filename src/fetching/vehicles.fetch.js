import Utils from "@/helpers/helpers";
import { FetchUtils } from "@/utils/fetch.utils";
import { env } from "../../next.config";

const URL_API_PRINCIPAL = env._API.url + env._API.routes.vehicles.url;
const URL_API_LOCAL =
  env.server.url_local + env.server.api.url + env.server.api.routes.vehicles.url;

export class VehiclesFetching {
  static async getApiPrincipalListAll(tokenOuth) {
    try {
      const url = URL_API_PRINCIPAL + env._API.routes.vehicles.create_list;
      const res = await FetchUtils.send(url, {
        method: "GET",
        tokenOuth,
      });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }
  static async getApiLocalListAll() {
    try {
      const url = URL_API_LOCAL;
      const res = await FetchUtils.send(url);
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }
}
