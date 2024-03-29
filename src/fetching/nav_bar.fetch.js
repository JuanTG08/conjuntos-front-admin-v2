import { FetchUtils } from "@/utils/fetch.utils";
import { env } from "../../next.config";
import Utils from "@/helpers/helpers";

const URL_API_PRINCIPAL = env._API.url + env._API.routes.nav_bar.url;
const URL_API_LOCAL =
  env.server.url_local + env.server.api.url + env.server.api.routes.nav_bar.url;

export class NavBarFetching {
  static async postApiPrincipalNew(data, tokenOuth) {
    try {
      const url = URL_API_PRINCIPAL + env._API.routes.nav_bar.create;
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

  static async getApiPrincipalListAll(tokenOuth) {
    try {
      const url = URL_API_PRINCIPAL + env._API.routes.nav_bar.list_all;
      const res = await FetchUtils.send(url, {
        tokenOuth,
      });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async getApiPrincipalGetOne(idNavBar, tokenOuth) {
    try {
      const url =
        URL_API_PRINCIPAL + env._API.routes.nav_bar.find_upd_del + idNavBar;
      const res = await FetchUtils.send(url, {
        tokenOuth,
      });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async putApiPrincipalEdit(data, idNavBar, tokenOuth) {
    try {
      const url =
        URL_API_PRINCIPAL + env._API.routes.nav_bar.find_upd_del + idNavBar;
      const res = await FetchUtils.send(url, {
        method: "PUT",
        tokenOuth,
        body: data,
      });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async putApiLocalSubmitEdit(idNavBar, data) {
    try {
      const url = URL_API_LOCAL + "/" + idNavBar;
      const res = await FetchUtils.send(url, { method: "PUT", body: data });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }
}
