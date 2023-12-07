import { PathsToFetching } from "@/fetching/paths_to.fetch";
import Utils from "@/helpers/helpers";
import { env } from "../../next.config";

export class PathsToController {
  static async apiPostSetPathsTo(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      const idRole = parseInt(req.body?.idRole);
      const idFromTo = parseInt(req.body?.idFromTo);
      const access_pages = req.body?.access_page;
      if (
        !Utils.verifyArrayNumber(access_pages) ||
        !Utils.verifyId(idRole) ||
        !Utils.verifyId(idFromTo)
      )
        return res.status(Utils.Message(true, 400, "Datos erroneos"));
      const response = await PathsToFetching.postApiPrincipalSetPathsTo(
        { access_pages },
        idRole,
        idFromTo,
        cookie
      );
      return res.json(response);
    } catch (error) {
      return res.json(Utils.Message(true, 500, "Server Error"));
    }
  }
  static async viewPostSetPathsTo(data, _idRole, _idFromTo) {
    try {
      const idRole = parseInt(_idRole);
      const idFromTo = parseInt(_idFromTo);
      const access_page = data;
      if (
        !Utils.verifyArrayNumber(access_page) ||
        !Utils.verifyId(idRole) ||
        !Utils.verifyId(idFromTo)
      )
        return Utils.Message(true, 400, "Datos erroneos");
      const dataSend = {
        access_page,
        idRole,
        idFromTo,
      };
      const response = await PathsToFetching.postApiLocalSetPathsTo(dataSend);
      return response;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }
}
