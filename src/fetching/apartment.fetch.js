import Utils from "@/helpers/helpers";
import { env } from "../../next.config";
import { FetchUtils } from "@/utils/fetch.utils";

const URL_API_PRINCIPAL = env._API.url + env._API.routes.apartment.url;
const URL_API_LOCAL =
  env.server.url_local +
  env.server.api.url +
  env.server.api.routes.apartment.url;

export class ApartmentFetch {
  static async getApiPrincipalListAll(idTower, tokenOuth) {
    try {
      const url =
        URL_API_PRINCIPAL + env._API.routes.apartment.list_all + idTower;
      const res = await FetchUtils.send(url, { tokenOuth });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async getApiLocalListAll(idTower) {
    try {
      const url = URL_API_LOCAL + "/" + idTower;
      const res = await FetchUtils.send(url);
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async postApiPrincipalNew(data, tokenOuth) {
    try {
      const url = URL_API_PRINCIPAL + env._API.routes.apartment.create;
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

  static async postApiLocalNew(data, idTower) {
    try {
      const url = URL_API_LOCAL + "/" + idTower;
      const res = await FetchUtils.send(url, { method: "POST", body: data });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async getApiPrincipalOne(idApartment, tokenOuth) {
    try {
      const url =
        URL_API_PRINCIPAL +
        env._API.routes.apartment.find_upd_del +
        idApartment;
      const res = await FetchUtils.send(url, { tokenOuth });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async getApiLocalOne(idApartment) {
    try {
      const url =
        URL_API_LOCAL +
        env.server.api.routes.apartment.urlRUD +
        "/" +
        idApartment;
      const res = await FetchUtils.send(url);
      return res;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async putApiPrincipalUpdate(data, tokenOuth) {
    try {
      const url =
        URL_API_PRINCIPAL +
        env._API.routes.apartment.find_upd_del +
        data.id_apartment;
      const res = await FetchUtils.send(url, {
        tokenOuth,
        method: "PUT",
        body: data,
      });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async putApiLocalUpdate(data, idApartment) {
    try {
      const url =
        URL_API_LOCAL +
        env.server.api.routes.apartment.urlRUD +
        "/" +
        idApartment;
      const res = await FetchUtils.send(url, { body: data, method: "PUT" });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async deleteApiPrincipal(idApartment, tokenOuth) {
    try {
      const url =
        URL_API_PRINCIPAL +
        env._API.routes.apartment.find_upd_del +
        idApartment;
      const res = await FetchUtils.send(url, { method: "DELETE", tokenOuth });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async deleteApiLocal(idApartment) {
    try {
      const url =
        URL_API_LOCAL +
        env.server.api.routes.apartment.urlRUD +
        "/" +
        idApartment;
      const res = await FetchUtils.send(url, { method: "DELETE" });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async getApiPrincipalListApartmentUserToCall(idApartment, tokenOuth) {
    try {
      const url =
        URL_API_PRINCIPAL +
        env._API.routes.apartment.list_user +
        idApartment;
      const res = await FetchUtils.send(url, { tokenOuth });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async getApiLocalListApartmentUserToCall(idApartment) {
    try {
      const url =
        URL_API_LOCAL +
        env.server.api.routes.apartment.urlUser +
        "/" +
        idApartment;
      const res = await FetchUtils.send(url);
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }
}
