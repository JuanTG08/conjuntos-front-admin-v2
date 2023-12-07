import Utils from "@/helpers/helpers";
import { env } from "../../next.config";

export class CookiesController {
  static async apiGetAllCookies(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      return res.json(Utils.Message(false, 200, "Ok", cookie));
    } catch (error) {
      console.log(error);
      return res.json(Utils.Message(true, 500, "Error al procesar"));
    }
  }
}
