import Utils from "@/helpers/helpers";
import { env } from "../../next.config";
import { FetchUtils } from "@/utils/fetch.utils";

const URL_API_PRINCIPAL = env._API.url + env._API.routes.apartment_user.url;
const URL_API_LOCAL =
  env.server.url_local +
  env.server.api.url +
  env.server.api.routes.apartment_user.url;
export class ApartmentUserFetch {
  static async getApiPrincipalListAll(idApartment, tokenOuth) {
    try {
      const url =
        URL_API_PRINCIPAL +
        env._API.routes.apartment_user.list_create +
        idApartment;
      const res = await FetchUtils.send(url, { tokenOuth });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Error al obtener la información.");
    }
  }
  static async getApiLocalListAll(idApartment) {
    try {
      const url = URL_API_LOCAL + "/" + idApartment;
      const res = await FetchUtils.send(url);
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Error al obtener la información.");
    }
  }

  static async postApiPrincipalNew(data, idApartment, tokenOuth) {
    try {
      const url =
        URL_API_PRINCIPAL +
        env._API.routes.apartment_user.list_create +
        idApartment;
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
  static async postApiLocalNew(data, idApartment) {
    try {
      const url = URL_API_LOCAL + "/" + idApartment;
      const res = await FetchUtils.send(url, { method: "POST", body: data });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Error al obtener la información.");
    }
  }

  static async getApiPrincipalOne(idApartmentUser, tokenOuth) {
    try {
      const url =
        URL_API_PRINCIPAL +
        env._API.routes.apartment_user.find_upd_del +
        idApartmentUser;
      const res = await FetchUtils.send(url, { tokenOuth });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Error al obtener la información.");
    }
  }
  static async getApiLocalOne(idApartmentUser) {
    try {
      const url =
        URL_API_LOCAL +
        env.server.api.routes.apartment_user.urlRUD +
        "/" +
        idApartmentUser;
      const res = await FetchUtils.send(url);
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Error al obtener la información.");
    }
  }
}
