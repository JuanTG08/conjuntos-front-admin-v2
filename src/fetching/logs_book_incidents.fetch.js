import Utils from "@/helpers/helpers";
import { env } from "../../next.config";
import { FetchUtils } from "@/utils/fetch.utils";

const URL_API_PRINCIPAL =
  env._API.url + env._API.routes.logs_book_incidents.url;
const URL_API_LOCAL =
  env.server.url_local +
  env.server.api.url +
  env.server.api.routes.logs_book_incidents.url;

export class LogsBookIncidentsFetching {
  static async postApiPrincipalCreateIncident(data, tokenOuth) {
    try {
      const url =
        URL_API_PRINCIPAL + env._API.routes.logs_book_incidents.list_create;
      const res = await FetchUtils.send(url, {
        method: "POST",
        tokenOuth,
        body: data,
      });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async postApiLocalCreateIncident(data) {
    try {
      const url = URL_API_LOCAL;
      const res = await FetchUtils.sendPostAxios(url, data);
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async getApiLocalListMyLogsBookIncidents(tokenOuth) {
    try {
      const url =
        URL_API_PRINCIPAL + env._API.routes.logs_book_incidents.list_create;
      const res = await FetchUtils.send(url, {
        tokenOuth,
      });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async getApiPrincipalListAllLogsBookIncidents(tokenOuth) {
    try {
      const url =
        URL_API_PRINCIPAL + env._API.routes.logs_book_incidents.list_all;
      const res = await FetchUtils.send(url, {
        tokenOuth,
      });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }
}
