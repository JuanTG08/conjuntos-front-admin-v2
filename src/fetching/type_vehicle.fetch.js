import Utils from "@/helpers/helpers";
import { env } from "../../next.config";
import { FetchUtils } from "@/utils/fetch.utils";

const URL_API_PRINCIPAL = env._API.url + env._API.routes.type_vehicle.url;
export class TypeVehicleFetching {
  static async getApiPrincipalListTypes(tokenOuth) {
    try {
      const url = URL_API_PRINCIPAL + env._API.routes.type_vehicle.list;
      const res = await FetchUtils.send(url, { tokenOuth });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }
}
