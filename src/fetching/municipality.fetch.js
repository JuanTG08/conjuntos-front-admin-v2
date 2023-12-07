import { FetchUtils } from "@/utils/fetch.utils";
import { env } from "../../next.config";
import Utils from "@/helpers/helpers";

const URL_API_PRINCIPAL = env._API.url + env._API.routes.municipality.url;
const URL_API_LOCAL =
  env.server.url_local +
  env.server.api.url +
  env.server.api.routes.municipality.url;
export class MunicipalityFetching {
  static async getApiPrincipalListAll(idDepartment) {
    try {
      const url =
        URL_API_PRINCIPAL + env._API.routes.municipality.list + idDepartment;
      const res = await FetchUtils.send(url);
      return res;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Error al obtener la información.");
    }
  }

  static async getApiLocalListAll(idDepartment) {
    try {
      const url = URL_API_LOCAL + "/" + idDepartment;
      const res = await FetchUtils.send(url);
      return res;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Error al obtener la información.");
    }
  }
}
