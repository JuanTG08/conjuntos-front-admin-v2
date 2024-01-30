import { NavBarFetching } from "@/fetching/nav_bar.fetch";
import Utils from "@/helpers/helpers";
import { env } from "../../next.config";

export class NavBarController {
  static async apiPostNewNavBar(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      const data = req.body;
      const send = await NavBarFetching.postApiPrincipalNew(data, cookie);
      return res.json(send);
    } catch (error) {
      console.log(error);
      res.json(Utils.Message(true, 500, "Error al procesar la información"));
    }
  }

  static async viewPostNewNavBar(data) {
    try {
      const send = await NavBarFetching.postApiLocalSubmitNew(data);
      return send;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Error al procesar la información");
    }
  }

  static async apiSSRGetAll(cookie) {
    try {
      const send = await NavBarFetching.getApiPrincipalListAll(cookie);
      return send;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Error al procesar la información");
    }
  }
}
