import { FetchUtils } from "@/utils/fetch.utils";
import { env } from "../../next.config";
import Utils from "@/helpers/helpers";

const URL_API_PRINCIPAL =
  env._API.url + env._API.routes.advertisement_types.url;
const URL_API_LOCAL =
  env.server.url_local +
  env.server.api.url +
  env.server.api.routes.advertisement_types.url;

export class AdvertisementTypesFetching {
  static async getApiPrincipalListWithComplex(idComplex, tokenOuth) {
    try {
      const url =
        URL_API_PRINCIPAL +
        env._API.routes.advertisement_types.list_with_complex +
        idComplex;
      const res = await FetchUtils.send(url, { tokenOuth });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Error al obtener la información.");
    }
  }

  static async getApiLocalListWithComplex(idComplex) {
    try {
      const url =
        URL_API_LOCAL +
        env.server.api.routes.advertisement_types.list_with_complex +
        "/" +
        idComplex;
      const res = await FetchUtils.send(url);
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Error al obtener la información.");
    }
  }
}
