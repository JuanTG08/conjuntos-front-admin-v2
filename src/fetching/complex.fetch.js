import Utils from "@/helpers/helpers";
import { env } from "../../next.config";
import { FetchUtils } from "@/utils/fetch.utils";

const URL_API_PRINCIPAL = env._API.url + env._API.routes.complex.url;
const URL_API_LOCAL =
  env.server.url_local + env.server.api.url + env.server.api.routes.complex.url;
export class ComplexFetching {
  // Obtenemos todos los datos de la API principal que esta conectada a la base de datos
  static async getApiPrincipalListAll(tokenOuth) {
    try {
      const url = URL_API_PRINCIPAL + env._API.routes.complex.list_create;
      const res = await FetchUtils.send(url, { tokenOuth });
      return res;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Server Error");
    }
  }

  // Obtenemos un unico conjunto residencial de la API principal que esta conectada a la base de datos
  static async getApiPrincipalOne(idComplex, tokenOuth) {
    try {
      const url =
        URL_API_PRINCIPAL + env._API.routes.complex.find_upd_del + idComplex;
      const res = await FetchUtils.send(url, { tokenOuth });
      return res;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Server Error");
    }
  }

  // Obtenemos un unico conjunto residencial de la API local del proyecto
  static async getApiLocalOne(idComplex) {
    try {
      const url = URL_API_LOCAL + "/" + idComplex;
      const res = await FetchUtils.send(url);
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error", error);
    }
  }

  // Hacemos una peticion a la API principal para almacenar un nuevo conjunto residencial
  static async postApiPrincipalNew(data, tokenOuth) {
    try {
      const url = URL_API_PRINCIPAL + env._API.routes.complex.list_create;
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

  // Hacemos una peticion a la API principal para actualizar los valores
  static async putApiPrincipalEdit(data, tokenOuth) {
    try {
      const url =
        URL_API_PRINCIPAL +
        env._API.routes.complex.find_upd_del +
        data.id_complex;
      const res = await FetchUtils.send(url, {
        method: "PUT",
        body: data,
        tokenOuth,
      });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  // Hacemos una peticion a la API principal para eliminar
  static async deleteApiPrincipal(idComplex, tokenOuth) {
    try {
      const url =
        URL_API_PRINCIPAL + env._API.routes.complex.find_upd_del + idComplex;
      const res = await FetchUtils.send(url, { method: "DELETE", tokenOuth });
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

  // Hacemo una petición a la API local para actualizar los valore
  static async putApiLocalEdit(data) {
    try {
      const url = URL_API_LOCAL + "/" + data.id_complex;
      const res = await FetchUtils.send(url, { method: "PUT", body: data });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  // Hacemo una petición a la API local para actualizar los valores
  static async putApiLocalEditToSettingComplex(data) {
    try {
      const url = URL_API_LOCAL;
      const res = await FetchUtils.send(url, { method: "PUT", body: data });
      return res;
    } catch (error) {
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

  static async getApiListUserAdminComplex(idComplex, tokenOuth) {
    try {
      const url =
        URL_API_PRINCIPAL + env._API.routes.complex.list_user + idComplex;
      const res = await FetchUtils.send(url, { tokenOuth });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async getApiLocalListUserAdminComplex(idComplex) {
    try {
      const url =
        URL_API_LOCAL +
        "/" +
        idComplex +
        "/" +
        env.server.api.routes.complex.list_user;
      const res = await FetchUtils.send(url);
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async postApiLocalSetUserAdminComplex(idComplex, data) {
    try {
      const url =
        URL_API_LOCAL +
        "/" +
        idComplex +
        "/" +
        env.server.api.routes.complex.list_user;
      const res = await FetchUtils.send(url, { method: "POST", body: data });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async getApiPrincipalListTowersApartments(tokenOuth) {
    try {
      const url =
        URL_API_PRINCIPAL + env._API.routes.complex.find_towers_apartments;
      const res = await FetchUtils.send(url, { tokenOuth });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Error al obtener la información.");
    }
  }

  static async getApiPrincipalListPlanAndService(idComplex, tokenOuth) {
    try {
      const url =
        URL_API_PRINCIPAL +
        env._API.routes.complex.crud_plan_and_service +
        idComplex;
      const res = await FetchUtils.send(url, { tokenOuth });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Error al obtener la información.");
    }
  }
}
