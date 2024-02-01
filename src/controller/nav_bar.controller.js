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

  static async apiPutEditNavBar(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      const data = req.body;
      const idNavBar = parseInt(req.query.idNavBar);
      if (!Utils.verifyId(idNavBar)) throw new Error("Id no válido");
      const send = await NavBarFetching.putApiPrincipalEdit(
        data,
        idNavBar,
        cookie
      );
      return res.json(send);
    } catch (error) {
      console.log(error);
      res.json(Utils.Message(true, 500, "Error al procesar la información"));
    }
  }

  static async viewPutEditNavBar(idNavBar, data) {
    try {
      const send = await NavBarFetching.putApiLocalSubmitEdit(idNavBar, data);
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

  static async apiSSRGetOne(idNavBar, cookie) {
    try {
      idNavBar = parseInt(idNavBar);
      if (!Utils.verifyId(idNavBar)) throw new Error("Id no válido");
      const send = await NavBarFetching.getApiPrincipalGetOne(idNavBar, cookie);
      return send;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Error al procesar la información");
    }
  }

  static viewGetDataToForm(data = null) {
    const valuesForm = {
      name: data?.name || "",
      roles: data?.role_plan_navigation
        ? data?.role_plan_navigation.map((role) => role.id_role)
        : [],
      service_plans: data?.role_plan_navigation
        ? data?.role_plan_navigation.map((service) => service.id_plan_services)
        : [],
      mainItems: data?.navigation_bar_main
        ? data.navigation_bar_main.map((main) => ({
            id_navigation_bar_main: main.id_navigation_bar_main,
            mainLabel: main.label,
            mainCaption: main.caption,
            mainLink: main.link,
            subItems: main?.navigation_bar_sub
              ? main.navigation_bar_sub.map((sub) => ({
                  id_navigation_bar_sub: sub.id_navigation_bar_sub,
                  subLabel: sub.label,
                  subCaption: sub.caption,
                  subLink: sub.link,
                  subIcon: sub.icon,
                }))
              : [],
          }))
        : [],
    };
    return valuesForm;
  }
}
