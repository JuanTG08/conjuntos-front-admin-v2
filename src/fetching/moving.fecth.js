import Utils from "@/helpers/helpers";
import { FetchUtils } from "@/utils/fetch.utils";
import { env } from "../../next.config";

const URL_API_PRINCIPAL = env._API.url + env._API.routes.moving.url;
const URL_API_LOCAL =
  env.server.url_local + env.server.api.url + env.server.api.routes.moving.url;

export class MovingFetching {
  static async postApiPrincipalNew(tokenOuth, data) {
    try {
      const url = URL_API_PRINCIPAL + env._API.routes.moving.list_create;
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

  static async getApiPrincipalListMovingToApartmentAndUser(tokenOuth) {
    try {
      const url = URL_API_PRINCIPAL + env._API.routes.moving.list_create;
      const res = await FetchUtils.send(url, {
        tokenOuth,
      });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async getApiPrincipalGetOneMoving(tokenOuth, idMoving) {
    try {
      const url =
        URL_API_PRINCIPAL + env._API.routes.moving.find_one + idMoving;
      const res = await FetchUtils.send(url, {
        tokenOuth,
      });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async getApiPrincipalGetOneMovingByOwner(tokenOuth, idMoving) {
    try {
      const url =
        URL_API_PRINCIPAL + env._API.routes.moving.find_one_owner + idMoving;
      const res = await FetchUtils.send(url, {
        tokenOuth,
      });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async putApiPrincipalSetResponseToMoving(data, idMoving, tokenOuth) {
    try {
      const url =
        URL_API_PRINCIPAL + env._API.routes.moving.set_response + idMoving;
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

  static async putApiLocalSetResponseToMoving(data, idMoving) {
    try {
      const url = URL_API_LOCAL + "/" + idMoving;
      const res = await FetchUtils.send(url, { method: "PUT", body: data });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async getApiPrincipalListMovingToAdminComplex(tokenOuth) {
    try {
      const url = URL_API_PRINCIPAL + env._API.routes.moving.list_admin;
      const res = await FetchUtils.send(url, {
        tokenOuth,
      });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async getApiPrincipalGetOneMovingByAdminToComplex(
    tokenOuth,
    idMoving
  ) {
    try {
      const url =
        URL_API_PRINCIPAL + env._API.routes.moving.find_one_admin + idMoving;
      const res = await FetchUtils.send(url, {
        tokenOuth,
      });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async getApiPrincipalListMovingToComplexAndAuthorized(tokenOuth) {
    try {
      const url = URL_API_PRINCIPAL + env._API.routes.moving.list_authorized;
      const res = await FetchUtils.send(url, {
        tokenOuth,
      });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }
}
