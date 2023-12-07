import Utils from "@/helpers/helpers";
import { env } from "../../next.config";
import { FetchUtils } from "@/utils/fetch.utils";

const URL_API_PRINCIPAL = env._API.url + env._API.routes.tower.url;
const URL_API_LOCAL =
  env.server.url_local + env.server.api.url + env.server.api.routes.tower.url;
export class TowerFetching {
  // Obtenemos todos los datos de la API principal que esta conectada a la base de datos
  static async getApiPrincipalListAll(idComplex, tokenOuth) {
    try {
      const url =
        URL_API_PRINCIPAL + env._API.routes.tower.list_all + idComplex;
      const res = await FetchUtils.send(url, { tokenOuth });
      return res;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Server Error");
    }
  }

  // Hacemos la peticion a nuestra API local para que esta haga la peticion a la API principal
  static async getApiLocalListAll(idComplex) {
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
      const url = URL_API_PRINCIPAL + env._API.routes.tower.create;
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

  static async postApiLocalNew(data, idComplex) {
    try {
      const url = URL_API_LOCAL + "/" + idComplex;
      const res = await FetchUtils.send(url, { method: "POST", body: data });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  // Obtenemos un unico objeto de la API principal que esta conectada a la base de datos
  static async getApiPrincipalOne(idTower, tokenOuth) {
    try {
      const url =
        URL_API_PRINCIPAL + env._API.routes.tower.find_upd_del + idTower;
      const res = await FetchUtils.send(url, { tokenOuth });
      return res;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Server Error");
    }
  }

  // Obtenemos un unico objeto de la API local del proyecto
  static async getApiLocalOne(idTower) {
    try {
      const url =
        URL_API_LOCAL + env.server.api.routes.tower.urlRUD + "/" + idTower;
      const res = await FetchUtils.send(url);
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error", error);
    }
  }

  // Hacemos una peticion a la API principal para actualizar los valores
  static async putApiPrincipalEdit(data, tokenOuth) {
    try {
      const url =
        URL_API_PRINCIPAL + env._API.routes.tower.find_upd_del + data.id_tower;
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

  // Hacemo una petición a la API local para actualizar los valores
  static async putApiLocalEdit(data) {
    try {
      const url =
        URL_API_LOCAL +
        env.server.api.routes.tower.urlRUD +
        "/" +
        data.id_tower;
      const res = await FetchUtils.send(url, { method: "PUT", body: data });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  // Hacemos una peticion a la API principal para eliminar
  static async deleteApiPrincipal(id, tokenOuth) {
    try {
      const url = URL_API_PRINCIPAL + env._API.routes.tower.find_upd_del + id;
      const res = await FetchUtils.send(url, { method: "DELETE", tokenOuth });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  // Eliminamos un registro de la API LOCAL
  static async deleteApiLocal(id) {
    try {
      const url = URL_API_LOCAL + env.server.api.routes.tower.urlRUD + "/" + id;
      const res = await FetchUtils.send(url, { method: "DELETE" });
      return res;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async getApiPrincipalListTowerApartment(tokenOuth) {
    try {
      const url = URL_API_PRINCIPAL + env._API.routes.tower.tower_apartment;
      const res = await FetchUtils.send(url, { tokenOuth });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }
}
