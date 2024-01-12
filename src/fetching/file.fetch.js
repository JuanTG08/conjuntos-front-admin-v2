import Utils from "@/helpers/helpers";
import { env } from "../../next.config";
import { FetchUtils } from "@/utils/fetch.utils";

const URL_API_PRINCIPAL = env._API.url + env._API.routes.files.url;
export const URL_API_PRINCIPAL_IMAGES =
  env._API.url + env._API.routes.images.url;
const URL_API_LOCAL =
  env.server.url_local + env.server.api.url + env.server.api.routes.files.url;
export class FileFetching {
  static async setFile(data, tokenOuth) {
    try {
      const url = URL_API_PRINCIPAL + env._API.routes.files.list_create;
      const res = await FetchUtils.sendPostAxios(url, data, tokenOuth);
      return res;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Error al obtener la información.");
    }
  }

  static async setLocalFile(data) {
    try {
      const url = URL_API_LOCAL + env.server.api.routes.files.images;
      const res = await FetchUtils.sendPostAxios(url, data);
      return res;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Error al obtener la información.");
    }
  }

  static async postApiPrincipalSaveImageToAdvertisement(
    data,
    nameImage,
    tokenOuth
  ) {
    try {
      const url =
        URL_API_PRINCIPAL +
        env._API.routes.files.create_img_advertisement +
        nameImage;
      const res = await FetchUtils.sendPostAxios(url, data, tokenOuth);
      return res;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Error al obtener la información.");
    }
  }
}
