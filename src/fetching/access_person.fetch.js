import Utils from "@/helpers/helpers";
import { env } from "../../next.config";
import { FetchUtils } from "@/utils/fetch.utils";

const URL_API_PRINCIPAL = env._API.url + env._API.routes.access_person.url;
const URL_API_LOCAL =
  env.server.url_local +
  env.server.api.url +
  env.server.api.routes.access_person.url;

export class AccessPersonFetching {
  static async postApiPrincipalNew(data, tokenOuth) {
    try {
      const url = URL_API_PRINCIPAL + env._API.routes.access_person.list_create;
      const res = await FetchUtils.send(url, {
        method: "POST",
        body: data,
        tokenOuth,
      });
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

  static async getApiPrincipalListToApartment(tokenOuth) {
    try {
      const url = URL_API_PRINCIPAL + env._API.routes.access_person.list_create;
      const res = await FetchUtils.send(url, {
        tokenOuth,
      });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async getApiLocalListToApartment() {
    try {
      const url = URL_API_LOCAL;
      const res = await FetchUtils.send(url);
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async getApiPrincipalOne(idAccessPerson, tokenOuth) {
    try {
      const url =
        URL_API_PRINCIPAL +
        env._API.routes.access_person.find_upd_del +
        idAccessPerson;
      const res = await FetchUtils.send(url, {
        tokenOuth,
      });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async getApiLocalOne(idAccessPerson) {
    try {
      const url = URL_API_LOCAL + "/" + idAccessPerson;
      const res = await FetchUtils.send(url);
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async deleteApiPrincipal(idAccessPerson, tokenOuth) {
    try {
      const url =
        URL_API_PRINCIPAL +
        env._API.routes.access_person.find_upd_del +
        idAccessPerson;
      const res = await FetchUtils.send(url, {
        method: "DELETE",
        tokenOuth,
      });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async deleteApiLocal(idAccessPerson) {
    try {
      const url = URL_API_LOCAL + "/" + idAccessPerson;
      const res = await FetchUtils.send(url, {
        method: "DELETE",
      });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async getApiPrincipalListToComplex(tokenOuth) {
    try {
      const url =
        URL_API_PRINCIPAL + env._API.routes.access_person.list_complex;
      const res = await FetchUtils.send(url, {
        tokenOuth,
      });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async getApiLocalListToComplex() {
    try {
      const url =
        URL_API_LOCAL + env.server.api.routes.access_person.to_complex;
      const res = await FetchUtils.send(url);
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }
}
