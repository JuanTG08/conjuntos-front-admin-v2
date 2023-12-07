import { UserToRegisterFetching } from "@/fetching/user_to_register.fetch";
import Utils from "@/helpers/helpers";
import { env } from "../../next.config";

export class UserToRegisterController {
  static async apiDelete(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      const idUserToRegister = parseInt(req.query?.idUserToRegister);
      if (!Utils.verifyId(idUserToRegister))
        return res.json(Utils.Message(true, 500, "Datos erroneos"));
      const resp = await UserToRegisterFetching.deleteApiPrincipal(idUserToRegister, cookie);
      return res.json(resp);
    } catch (error) {
      return res.json(Utils.Message(true, 500, "Error", error));
    }
  }

  static async viewDelete(idUserToRegister) {
    try {
      idUserToRegister = parseInt(idUserToRegister);
      if (!Utils.verifyId(idUserToRegister))
        return Utils.Message(true, 500, "Datos erroneos");
      const res = await UserToRegisterFetching.deleteApiLocal(idUserToRegister);
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Error");
    }
  }

  static viewGetDataToFormUserToRegister(data = null) {
    const valuesForm = {
      email: data?.email ? data.email : "",
      id_role: data?.id_role ? data.id_role : "",
    };
    return valuesForm;
  }
}
