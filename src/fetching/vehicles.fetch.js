import Utils from "@/helpers/helpers";
import { FetchUtils } from "@/utils/fetch.utils";
import { env } from "../../next.config";

const URL_API_PRINCIPAL = env._API.url + env._API.routes.vehicles.url;
const URL_API_LOCAL =
  env.server.url_local +
  env.server.api.url +
  env.server.api.routes.vehicles.url;

export class VehiclesFetching {
  static async postApiPrincipalVehicle(tokenOuth, data) {
    try {
      const url = URL_API_PRINCIPAL + env._API.routes.vehicles.create_list;
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

  static async postApiLocalVehicle(data) {
    try {
      const url = URL_API_LOCAL;
      const res = await FetchUtils.send(url, {
        method: "POST",
        body: data,
      });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async getApiPrincipalListAll(tokenOuth) {
    try {
      const url = URL_API_PRINCIPAL + env._API.routes.vehicles.create_list;
      const res = await FetchUtils.send(url, {
        method: "GET",
        tokenOuth,
      });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }
  static async getApiLocalListAll() {
    try {
      const url = URL_API_LOCAL;
      const res = await FetchUtils.send(url);
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async getApiPrincipalOneVehicle(tokenOuth, idVehicle) {
    try {
      const url =
        URL_API_PRINCIPAL + env._API.routes.vehicles.find_upd_del + idVehicle;
      const res = await FetchUtils.send(url, {
        method: "GET",
        tokenOuth,
      });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async putApiPrincipalVehicle(tokenOuth, data, idVehicle) {
    try {
      const url =
        URL_API_PRINCIPAL + env._API.routes.vehicles.find_upd_del + idVehicle;
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

  static async putApiLocalVehicle(data, idVehicle) {
    try {
      const url = URL_API_LOCAL + "/" + idVehicle;
      const res = await FetchUtils.send(url, { method: "PUT", body: data });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async deleteApiPrincipalVehicle(tokenOuth, idVehicle) {
    try {
      const url =
        URL_API_PRINCIPAL + env._API.routes.vehicles.find_upd_del + idVehicle;
      const res = await FetchUtils.send(url, {
        method: "DELETE",
        tokenOuth,
      });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async deleteApiLocalVehicle(idVehicle) {
    try {
      const url = URL_API_LOCAL + "/" + idVehicle;
      const res = await FetchUtils.send(url, { method: "DELETE" });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async getApiPrincipalListConsult(tokenOuth) {
    try {
      const url = URL_API_PRINCIPAL + env._API.routes.vehicles.consult_list;
      const res = await FetchUtils.send(url, {
        tokenOuth,
      });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }
}
