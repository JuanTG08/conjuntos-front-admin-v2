import { UserRolesFetching } from "@/fetching/user_roles.fetch";
import Utils from "@/helpers/helpers";
import { env } from "../../next.config";

export class UserRolesController {
  static async apiDelete(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      const idUserRoles = parseInt(req.query?.idUserRoles);
      if (!Utils.verifyId(idUserRoles))
        return res.json(Utils.Message(true, 500, "Datos erroneos"));
      const resp = await UserRolesFetching.deleteApiPrincipal(
        idUserRoles,
        cookie
      );
      return res.json(resp);
    } catch (error) {
      return res.json(Utils.Message(true, 500, "Error"));
    }
  }

  static async viewDelete(idUserRoles) {
    try {
      idUserRoles = parseInt(idUserRoles);
      if (!Utils.verifyId(idUserRoles))
        return Utils.Message(true, 500, "Datos erroneos");
      const res = await UserRolesFetching.deleteApiLocal(idUserRoles);
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Error");
    }
  }
}
