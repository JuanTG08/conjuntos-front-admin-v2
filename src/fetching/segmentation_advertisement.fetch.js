import { FetchUtils } from "@/utils/fetch.utils";
import { env } from "../../next.config";
import Utils from "@/helpers/helpers";

const URL_API_PRINCIPAL =
  env._API.url + env._API.routes.segmentation_advertisement.url;

export class SegmentationAdvertisementFetching {
  static async setApiPrincipalSegmentation(data, idAdvertisement, tokenOuth) {
    try {
      const url =
        URL_API_PRINCIPAL +
        env._API.routes.segmentation_advertisement.set +
        idAdvertisement;
      const res = await FetchUtils.send(url, {
        method: "POST",
        body: data,
        tokenOuth,
      });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Error al obtener la información.");
    }
  }
}
