import RolesFetching from "@/fetching/roles.fetch";
import Utils from "@/helpers/helpers";
import { env } from "../../next.config";

export class RolesController {
  static async apiGetListAll(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      const roles = await RolesFetching.getApiPrincipalListAll(cookie);
      return res.json(roles);
    } catch (error) {
      return res.json(Utils.Message(true, 500, "Server Error"));
    }
  }

  static async viewGetListAll() {
    try {
      const list = await RolesFetching.getApiLocalListAll();
      return list;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async apiGetOne(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      const idRole = parseInt(req.query?.idRole);
      if (!Utils.verifyId(idRole))
        return res.json(Utils.Message(true, 500, "Datos erroneos"));
      const role = await RolesFetching.getApiPrincipalOne(idRole, cookie);
      return res.json(role);
    } catch (error) {
      console.log(error);
      return res.json(Utils.Message(true, 500, "Server Error"));
    }
  }

  static async viewGetOne(idRole) {
    try {
      idRole = parseInt(idRole);
      if (!Utils.verifyId(idRole))
        return Utils.Message(true, 500, "Datos erroneos");
      const role = await RolesFetching.getApiLocalOne(idRole);
      if (role.statusCode != 200 || role.error || !role.payload) return role;
      const froms_to = role.payload?.from_to.map((from_to) => {
        return {
          ...from_to,
          access_page: from_to.access_page.map((acc_p) => {
            acc_p.checked = !!role.payload?.role.paths_to.find(
              (_path) => _path.access_page.id == acc_p.id
            );
            return acc_p;
          }),
        };
      });
      const response = Utils.Message(false, 200, "OK", {
        role: role.payload.role,
        froms_to,
      });
      return response;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async apiGetListToAdminUserComplex(cookie) {
    try {
      const list = await RolesFetching.getApiPrincipalListToAdminUserComplex(
        cookie
      );
      return list;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async apiSSRGetListToAdminUserApartment(cookie) {
    try {
      const list = await RolesFetching.getApiPrincipalListToAdminUserApartment(
        cookie
      );
      return list;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }
}
