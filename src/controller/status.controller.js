import { StatusFetching } from "@/fetching/status.fetch";
import Utils from "@/helpers/helpers";
import { env } from "../../next.config";

export class StatusController {
  static async apiGetStatusSpecific(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      const { statusTo } = req.query;
      if (!Utils.verifyId(statusTo))
        return res.json(Utils.Message(true, 500, "Datos erróneos"));
      const listStatus = await StatusFetching.getApiPrincipalListAll(
        { statusTo },
        cookie
      );
      return res.status(200).json(listStatus);
    } catch (error) {
      console.error(error);
      return res.status(500).json(Utils.Message(true, 500, "Server Error"));
    }
  }

  static async apiSSRGetStatusSpecific(statusTo, cookie) {
    try {
      if (!Utils.verifyId(statusTo))
        return Utils.Message(true, 500, "Datos erróneos");
      const listStatus = await StatusFetching.getApiPrincipalListAll(
        { statusTo },
        cookie
      );
      return listStatus;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static apiGetStatusPlanAndService() {
    return env._API.routes.status.types.VAR_STATUS_TO_PLAN_AND_SERVICE;
  }

  static async viewGetStatusStatus() {
    try {
      const list = await StatusFetching.getApiLocalListAll(
        env._API.routes.status.types.VAR_STATUS_TO_STATUS
      );
      return list;
    } catch (error) {}
  }

  static async viewGetStatusTowerComplex() {
    try {
      const list = await StatusFetching.getApiLocalListAll(
        env._API.routes.status.types.VAR_STATUS_TO_TOWER_COMPLEX
      );
      return list;
    } catch (error) {
      console.error(error);
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async viewGetStatusApartmentComplex() {
    try {
      const list = await StatusFetching.getApiLocalListAll(
        env._API.routes.status.types.VAR_STATUS_TO_APARMENT_COMPLEX
      );
      return list;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async viewGetStatusAdvertisement() {
    try {
      const list = await StatusFetching.getApiLocalListAll(
        env._API.routes.status.types.VAR_STATUS_TO_ADVERTISEMENT
      );
      return list;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }
}
