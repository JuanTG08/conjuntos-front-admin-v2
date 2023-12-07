import Utils from "@/helpers/helpers";
import { env } from "../../next.config";
import { FetchUtils } from "@/utils/fetch.utils";

const URL_API_PRINCIPAL = env._API.url + env._API.routes.roles.url;
const URL_API_LOCAL =
  env.server.url_local + env.server.api.url + env.server.api.routes.roles.url;

export default class RolesFetching {
  static async getApiPrincipalListAll(tokenOuth) {
    try {
      const url = URL_API_PRINCIPAL + env._API.routes.roles.list_create;
      const res = await FetchUtils.send(url, { tokenOuth });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error", error);
    }
  }

  static async getApiLocalListAll() {
    try {
      const url = URL_API_LOCAL;
      const res = await FetchUtils.send(url);
      return res;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Server Error", error);
    }
  }

  static async getApiPrincipalOne(idRole, tokenOuth) {
    try {
      const url =
        URL_API_PRINCIPAL + env._API.routes.roles.find_upd_del + idRole;
      const res = await FetchUtils.send(url, { tokenOuth });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error", error);
    }
  }

  static async getApiLocalOne(idRole) {
    try {
      const url =
        URL_API_LOCAL + env.server.api.routes.roles.urlRUD + "/" + idRole;
      const res = await FetchUtils.send(url);
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error", error);
    }
  }

  static async getApiPrincipalListToAdminUserComplex(tokenOuth) {
    try {
      const url = URL_API_PRINCIPAL + env._API.routes.roles.find_roles_complex;
      const res = await FetchUtils.send(url, { tokenOuth });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error", error);
    }
  }

  static async getApiPrincipalListToAdminUserApartment(tokenOuth) {
    try {
      const url =
        URL_API_PRINCIPAL + env._API.routes.roles.find_roles_apartment;
      const res = await FetchUtils.send(url, { tokenOuth });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error", error);
    }
  }
}
