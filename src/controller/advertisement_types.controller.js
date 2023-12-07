import { AdvertisementTypesFetching } from "@/fetching/advertisement_types.fetch";
import Utils from "@/helpers/helpers";
import { env } from "../../next.config";
import { CONST_SYSTEM_NOT_PARAM_VIEW } from "@/constants/system.constant";

export class AdvertisementTypesByComplexController {
  static async apiListWithComplex(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      let idComplex = parseInt(req.query?.idComplex);
      if (
        !Utils.verifyId(idComplex) &&
        req.query?.idComplex != CONST_SYSTEM_NOT_PARAM_VIEW
      )
        return res.json(Utils.Message(true, 500, "Datos erróneos"));
      idComplex = Utils.verifyId(idComplex)
        ? idComplex
        : CONST_SYSTEM_NOT_PARAM_VIEW;
      const list =
        await AdvertisementTypesFetching.getApiPrincipalListWithComplex(
          idComplex,
          cookie
        );
      return res.json(list);
    } catch (error) {
      console.log(error);
      return res.json(Utils.Message(true, 500, "Error al procesar"));
    }
  }

  static async apiSSRListWithComplex(_idComplex, cookie) {
    try {
      let idComplex = parseInt(_idComplex);
      if (
        !Utils.verifyId(idComplex) &&
        _idComplex != CONST_SYSTEM_NOT_PARAM_VIEW
      )
        return Utils.Message(true, 500, "Datos erróneos");
      idComplex = Utils.verifyId(idComplex)
        ? idComplex
        : CONST_SYSTEM_NOT_PARAM_VIEW;
      const list =
        await AdvertisementTypesFetching.getApiPrincipalListWithComplex(
          idComplex,
          cookie
        );
      return list;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Error al procesar");
    }
  }

  static async viewListWithComplex(id = CONST_SYSTEM_NOT_PARAM_VIEW) {
    try {
      let idComplex = parseInt(id);
      if (!Utils.verifyId(idComplex) && id != CONST_SYSTEM_NOT_PARAM_VIEW)
        return Utils.Message(true, 500, "Datos erróneos");
      idComplex = Utils.verifyId(idComplex)
        ? idComplex
        : CONST_SYSTEM_NOT_PARAM_VIEW;
      const list = await AdvertisementTypesFetching.getApiLocalListWithComplex(
        idComplex
      );
      return list;
    } catch (error) {
      return Utils.Message(true, 500, "Error");
    }
  }
}
