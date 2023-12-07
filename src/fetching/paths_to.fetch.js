import Utils from "@/helpers/helpers";
import { env } from "../../next.config";
import { FetchUtils } from "@/utils/fetch.utils";

const URL_API_PRINCIPAL = env._API.url + env._API.routes.paths_to.url;
const URL_API_LOCAL =
  env.server.url_local +
  env.server.api.url +
  env.server.api.routes.paths_to.url;

export class PathsToFetching {
  static async postApiPrincipalSetPathsTo(data, idRole, idFromTo, tokenOuth) {
    try {
      const url =
        URL_API_PRINCIPAL +
        env._API.routes.paths_to.set_path_to +
        idRole +
        "/" +
        idFromTo;
      const res = await FetchUtils.send(url, { method: "POST", body: data, tokenOuth });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error", error);
    }
  }

  static async postApiLocalSetPathsTo(data) {
    try {
      const url = URL_API_LOCAL;
      const res = await FetchUtils.send(url, { method: "POST", body: data });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error", error);
    }
  }
}
