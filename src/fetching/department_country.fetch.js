import { FetchUtils } from "@/utils/fetch.utils";
import { env } from "../../next.config";
import Utils from "@/helpers/helpers";

const URL_API_PRINCIPAL = env._API.url + env._API.routes.department.url;
const URL_API_LOCAL =
  env.server.url_local +
  env.server.api.url +
  env.server.api.routes.department.url;
export class DepartmentCountryFetching {
  static async getApiPrincipal(idCountry) {
    try {
      const url =
        URL_API_PRINCIPAL + env._API.routes.department.list + idCountry;
      const res = await FetchUtils.send(url);
      return res;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Error al obtener la información.");
    }
  }

  static async getApiLocalListAll(idCountry) {
    try {
      const url = URL_API_LOCAL + "/" + idCountry;
      const res = await FetchUtils.send(url);
      return res;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Error al obtener la información.");
    }
  }
}
