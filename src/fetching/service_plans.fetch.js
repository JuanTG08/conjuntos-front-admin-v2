import { FetchUtils } from "@/utils/fetch.utils";
import { env } from "../../next.config";
import Utils from "@/helpers/helpers";

const URL_API_PRINCIPAL = env._API.url + env._API.routes.service_plans.url;

export class ServicePlansFetching {
  static async getApiPrincipalListAll(tokenOuth) {
    try {
      const url = URL_API_PRINCIPAL + env._API.routes.service_plans.list_all;
      const res = await FetchUtils.send(url, {
        tokenOuth,
      });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Error al obtener la información.");
    }
  }
}
