import Utils from "@/helpers/helpers";
import { env } from "../../next.config";
import { FetchUtils } from "@/utils/fetch.utils";

const URL_API_PRINCIPAL = env._API.url + env._API.routes.advertisement.url;
const URL_API_LOCAL =
  env.server.url_local +
  env.server.api.url +
  env.server.api.routes.advertisement.url;
export class AdvertisementFetching {
  static async getApiPrincipalListByComplex(idComplex, tokenOuth) {
    try {
      const url =
        URL_API_PRINCIPAL +
        env._API.routes.advertisement.list_complex +
        idComplex;
      const res = await FetchUtils.send(url, { tokenOuth });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Error al obtener la información.");
    }
  }

  static async getApiLocalListByComplex(idComplex) {
    try {
      const url =
        URL_API_LOCAL +
        env.server.api.routes.advertisement.list_complex +
        "/" +
        idComplex;
      const res = await FetchUtils.send(url);
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Error al obtener la información.");
    }
  }

  static async postApiPrincipalNew(data, tokenOuth) {
    try {
      const url = URL_API_PRINCIPAL + env._API.routes.advertisement.list_create;
      const res = await FetchUtils.send(url, {
        method: "POST",
        body: data,
        tokenOuth,
      });
      return res;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Error al obtener la información.");
    }
  }

  static async postApiLocalNew(data, idComplex) {
    try {
      const url =
        URL_API_LOCAL +
        env.server.api.routes.advertisement.list_complex +
        "/" +
        idComplex;
      const res = await FetchUtils.sendPostAxios(url, data);
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Error al obtener la información.");
    }
  }

  static async getApiPrincipalFindOne(idAdvertisement, tokenOuth) {
    try {
      const url =
        URL_API_PRINCIPAL +
        env._API.routes.advertisement.find_upd_del +
        idAdvertisement;
      const res = await FetchUtils.send(url, { tokenOuth });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Error al obtener la información.");
    }
  }

  static async getApiLocalFindOne(idAdvertisement) {
    try {
      const url = URL_API_LOCAL + "/" + idAdvertisement;
      const res = await FetchUtils.send(url);
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Error al obtener la información.");
    }
  }

  static async putApiPrincipalUpdate(data, idAdvertisement, tokenOuth) {
    try {
      const url =
        URL_API_PRINCIPAL +
        env._API.routes.advertisement.find_upd_del +
        idAdvertisement;
      const res = await FetchUtils.send(url, {
        method: "PUT",
        body: data,
        tokenOuth,
      });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Error al obtener la información.");
    }
  }

  static async putApiLocalUpdate(data, idAdvertisement) {
    try {
      const url = URL_API_LOCAL + "/" + idAdvertisement;
      const res = await FetchUtils.send(url, {
        method: "PUT",
        body: data,
      });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Error al obtener la información.");
    }
  }

  static async deleteApiPrincipalDelete(idAdvertisement, tokenOuth) {
    try {
      const url =
        URL_API_PRINCIPAL +
        env._API.routes.advertisement.find_upd_del +
        idAdvertisement;
      const res = await FetchUtils.send(url, {
        method: "DELETE",
        tokenOuth,
      });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Error al obtener la información.");
    }
  }

  static async deleteApiLocalDelete(idAdvertisement) {
    try {
      const url = URL_API_LOCAL + "/" + idAdvertisement;
      const res = await FetchUtils.send(url, {
        method: "DELETE",
      });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Error al obtener la información.");
    }
  }

  static async getApiPrincipalListAdvertisementCategory(idCategory, tokenOuth) {
    try {
      const url =
        URL_API_PRINCIPAL +
        env._API.routes.advertisement.list_categories +
        idCategory;
      const res = await FetchUtils.send(url, {
        tokenOuth,
      });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Error al obtener la información.");
    }
  }

  static async getApiLocalListAdvertisementCategory(idCategory) {
    try {
      const url =
        URL_API_LOCAL +
        env.server.api.routes.advertisement.list_categories +
        "/" +
        idCategory;
      const res = await FetchUtils.send(url);
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Error al obtener la información.");
    }
  }

  static async getApiPrincipalListCorrespondences(
    idTower,
    idApartment,
    tokenOuth
  ) {
    try {
      const url =
        URL_API_PRINCIPAL +
        env._API.routes.advertisement.list_correspondences +
        idTower +
        "/" +
        idApartment;
      const res = await FetchUtils.send(url, {
        tokenOuth,
      });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Error al obtener la información.");
    }
  }

  static async getApiLocalListCorrespondences(idTower, idApartment) {
    try {
      const url =
        URL_API_LOCAL +
        env.server.api.routes.advertisement.correspondence +
        "/" +
        idTower +
        "/" +
        idApartment;
      const res = await FetchUtils.send(url);
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Error al obtener la información.");
    }
  }

  static async getApiPrincipalListAdvertisementToDashboard(tokenOuth) {
    try {
      const url =
        URL_API_PRINCIPAL + env._API.routes.advertisement.list_dashboard;
      const res = await FetchUtils.send(url, { tokenOuth });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Error al obtener la información.");
    }
  }

  static async getApiLocalListAdvertisementToDashboard() {
    try {
      const url =
        URL_API_LOCAL + env.server.api.routes.advertisement.list_dashoboard;
      const res = await FetchUtils.send(url);
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Error al obtener la información.");
    }
  }

  static async getApiPrincipalSendAndNotify(idAdvertisement, tokenOuth) {
    try {
      const url =
        URL_API_PRINCIPAL +
        env._API.routes.advertisement.send_and_notify +
        idAdvertisement;
      const res = await FetchUtils.send(url, { tokenOuth });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Error al obtener la información.");
    }
  }

  static async getApiPrincipalOneAdvertisementToView(
    idAdvertisement,
    tokenOuth
  ) {
    try {
      const url =
        URL_API_PRINCIPAL +
        env._API.routes.advertisement.find_one_to_view +
        idAdvertisement;
      const res = await FetchUtils.send(url, { tokenOuth });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Error al obtener la información.");
    }
  }
}
