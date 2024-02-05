import { FetchUtils } from "@/utils/fetch.utils";
import { env } from "../../next.config";
import Utils from "@/helpers/helpers";

const URL_API_PRINCIPAL = env._API.url + env._API.routes.service_plans.url;
const URL_API_LOCAL =
  env.server.url_local +
  env.server.api.url +
  env.server.api.routes.plan_and_service.url;

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

  static async postApiPrincipalCreateNew(data, tokenOuth) {
    try {
      const url =
        URL_API_PRINCIPAL + env._API.routes.service_plans.create;
      const res = await FetchUtils.send(url, {
        method: "POST",
        body: data,
        tokenOuth,
      });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Error al obtener la información.");
    }
  }

  static async postApiLocalCreateNew(data) {
    try {
      const url = URL_API_LOCAL;
      const res = await FetchUtils.send(url, {
        method: "POST",
        body: data,
      });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Error al obtener la información.");
    }
  }
}
