import Utils from "@/helpers/helpers";
import { env } from "../../next.config";
import { FetchUtils } from "@/utils/fetch.utils";

const URL_API_PRINCIPAL = env._API.url + env._API.routes.token.url;

export class AuthTokenFetching {
  static async getApiPrincipalTokenUA() {
    try {
      const url = URL_API_PRINCIPAL + env._API.routes.token.token_ua;
      const res = await FetchUtils.send(url);
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }
}
