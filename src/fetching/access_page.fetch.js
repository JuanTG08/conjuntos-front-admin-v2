import Utils from "@/helpers/helpers";
import { env } from "../../next.config";
import { FetchUtils } from "@/utils/fetch.utils";

const URL_API_PRINCIPAL = env._API.url + env._API.routes.access_page.url;
const URL_API_LOCAL =
  env.server.url_local +
  env.server.api.url +
  env.server.api.routes.access_page.url;
export class AccessPageFetching {
  static async getApiPrincipalListMFS(tokenOuth) {
    try {
      const url = URL_API_PRINCIPAL + env._API.routes.access_page.list_mfs;
      const res = await FetchUtils.send(url, { tokenOuth });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async getApiLocalListMFS() {
    try {
      const url = URL_API_LOCAL + env.server.api.routes.access_page.mfs;
      const res = await FetchUtils.send(url);
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async postApiPrincipalNew(data, tokenOuth) {
    try {
      const url = URL_API_PRINCIPAL + env._API.routes.access_page.list_create;
      const res = await FetchUtils.send(url, { method: "POST", body: data, tokenOuth });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async postApiLocalNew(data) {
    try {
      const url = URL_API_LOCAL;
      const res = await FetchUtils.send(url, { method: "POST", body: data });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async getApiPrincipalOne(id, tokenOuth) {
    try {
      const url =
        URL_API_PRINCIPAL + env._API.routes.access_page.find_upd_del + id;
      const res = await FetchUtils.send(url, { tokenOuth });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async getApiLocalOne(id) {
    try {
      const url = URL_API_LOCAL + "/" + id;
      const res = await FetchUtils.send(url);
      return res
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async putApiPrincipalEdit(data, tokenOuth) {
    try {
      const url =
        URL_API_PRINCIPAL + env._API.routes.access_page.find_upd_del + data.id;
      const res = await FetchUtils.send(url, { method: "PUT", body: data, tokenOuth });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async putApiLocalEdit(data) {
    try {
      const url = URL_API_LOCAL + "/" + data.id;
      const res = await FetchUtils.send(url, { method: "PUT", body: data });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async deleteApiPrincipal(id, tokenOuth) {
    try {
      const url =
        URL_API_PRINCIPAL + env._API.routes.access_page.find_upd_del + id;
      const res = await FetchUtils.send(url, { method: "DELETE", tokenOuth });
      return res;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async deleteApiLocal(id) {
    try {
      const url = URL_API_LOCAL + "/" + id;
      const res = await FetchUtils.send(url, { method: "DELETE" });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async getApiPrincipalListAllPages(tokenOuth) {
    try {
      const url = URL_API_PRINCIPAL + env._API.routes.access_page.list_pages;
      const res = await FetchUtils.send(url, { tokenOuth });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }
}
