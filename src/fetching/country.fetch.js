import { FetchUtils } from "@/utils/fetch.utils";
import { env } from "../../next.config";
import Utils from "@/helpers/helpers";

const URL_API_PRINCIPAL = env._API.url + env._API.routes.country.url;
export class CountryFetching {
  static async getApiPrincipal() {
    try {
      const url = URL_API_PRINCIPAL + env._API.routes.country.list;
      const res = await FetchUtils.send(url);
      return res;
    } catch (error) {
      console.log(error)
      return Utils.Message(true, 500, "Error al obtener la información.");
    }
  }
}
