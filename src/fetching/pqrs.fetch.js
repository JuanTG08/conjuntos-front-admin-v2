import Utils from "@/helpers/helpers";
import { FetchUtils } from "@/utils/fetch.utils";
import { env } from "../../next.config";

const URL_API_PRINCIPAL = env._API.url + env._API.routes.pqrs.url;
const URL_API_LOCAL =
  env.server.url_local + env.server.api.url + env.server.api.routes.pqrs.url;

export class PQRSFetching {
  static async getApiPrincipalDataToForm(tokenOuth) {
    try {
      const url = URL_API_PRINCIPAL + env._API.routes.pqrs.get_data_form;
      const res = await FetchUtils.send(url, {
        tokenOuth,
      });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async postApiPrincipalNew(tokenOuth, data) {
    try {
      const url = URL_API_PRINCIPAL + env._API.routes.pqrs.list_create;
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

  static async postApiLocalSubmitNew(data) {
    try {
      const url = URL_API_LOCAL;
      const res = await FetchUtils.send(url, { method: "POST", body: data });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async getApiPrincipalListPQRSToApartmentAndUser(tokenOuth) {
    try {
      const url = URL_API_PRINCIPAL + env._API.routes.pqrs.list_create;
      const res = await FetchUtils.send(url, {
        tokenOuth,
      });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async getApiPrincipalOnePQRSToThread(tokenOuth, idPQRS) {
    try {
      const url = URL_API_PRINCIPAL + env._API.routes.pqrs.find_upd + idPQRS;
      const res = await FetchUtils.send(url, {
        tokenOuth,
      });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }
}
