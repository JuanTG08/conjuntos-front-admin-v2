import Utils from "@/helpers/helpers";
import { env } from "../../next.config";

export class RoutingClass {
  _req;
  _res;

  constructor(req, res, methods) {
    try {
      // Validamos si los token están en sus cookies
      if (
        req.cookies[env.server.cookies.user_information.name] &&
        req.cookies[env.server.cookies.main_role.name] &&
        req.cookies[env.server.cookies.user_access_paths.name]
      )
        // Establecemos en una cookie global la información
        // Para que los controladores la tomen y la usen
        req.cookies[env.server.cookies.main_cookie.name] = {
          mainRoleToken: req.cookies[env.server.cookies.main_role.name],
          userAccessPathsToken:
            req.cookies[env.server.cookies.user_access_paths.name],
          userDataToken: req.cookies[env.server.cookies.user_information.name],
        };
      switch (req.method) {
        case "GET":
          methods.get(req, res);
          break;
        case "POST":
          methods.post(req, res);
          break;
        case "PUT":
          methods.put(req, res);
          break;
        case "DELETE":
          methods.delete(req, res);
          break;

        default:
          this._notFound(req, res);
          break;
      }
    } catch (err) {
      console.error(err);
      this._notFound(req, res);
    }
  }

  _notFound(req, res) {
    return res.status(404).json(Utils.Message(true, 404, "Not found"));
  }

  _unauthorized(req, res) {
    return res.status(401).json(Utils.Message(true, 401, "Unauthorized"));
  }
}
