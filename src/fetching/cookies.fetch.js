import Utils from "@/helpers/helpers";
import { env } from "../../next.config";
import { FetchUtils } from "@/utils/fetch.utils";

const URL_API_LOCAL =
  env.server.url_local + env.server.api.url + env.server.api.routes.cookies.url;
export class CookiesFetching {
  static async getApiLocalListAllCookies() {
    try {
      const url = URL_API_LOCAL;
      const res = await FetchUtils.send(url);
      return res;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Error");
    }
  }
}
