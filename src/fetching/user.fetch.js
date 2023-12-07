import Utils from "@/helpers/helpers";
import { FetchUtils } from "@/utils/fetch.utils";
import { env } from "../../next.config";

const URL_API_PRINCIPAL = env._API.url + env._API.routes.user.url;
const URL_API_LOCAL =
  env.server.url_local + env.server.api.url + env.server.api.routes.user.url;

export class UserFetching {
  static async getApiPrincipalUserInfo(tokenOuth) {
    try {
      const url = URL_API_PRINCIPAL + env._API.routes.user.find_upd;
      const res = await FetchUtils.send(url, {
        method: "GET",
        tokenOuth,
      });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async getApiLocalUserInfo() {
    try {
      const url = URL_API_LOCAL;
      const res = await FetchUtils.send(url);
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async putApiPrincipalUserProfile(data, tokenOuth) {
    try {
      const url = URL_API_PRINCIPAL + env._API.routes.user.find_upd;
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

  static async putApiLocalUserProfile(data) {
    try {
      const url = URL_API_LOCAL;
      const res = await FetchUtils.send(url, {
        method: "PUT",
        body: data,
      });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }
}
