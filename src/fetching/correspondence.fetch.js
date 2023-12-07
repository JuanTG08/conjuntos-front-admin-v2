import { FetchUtils } from "@/utils/fetch.utils";
import { env } from "../../next.config";

const URL_API_LOCAL =
  env.server.url_local +
  env.server.api.url +
  env.server.api.routes.correspondence.url;
export class CorrespondenceFetching {
  static async postApiLocalChangeStatus(data) {
    try {
      const url = URL_API_LOCAL;
      const res = await FetchUtils.send(url, {
        method: "POST",
        body: data,
      });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Error al obtener la información.");
    }
  }
}
