import { AuthFetching } from "@/fetching/auth.fetch";
import Utils from "@/helpers/helpers";
import { env } from "../../next.config";
import { serialize } from "cookie";
import { TokenUtils } from "@/utils/token.utils";

export class AuthController {
  static async apiPostLoginUser(email) {
    try {
      // Establecemos los datos del formulario
      const dataLogin = {
        email: Utils.isMail(email),
      };
      // Validamos los datos del formulario
      if (Utils.verifyDataObject(dataLogin) !== true)
        return Utils.Message(true, 400, "Datos erróneos");
      // Realizamos la petición a la API Principal para obtener un token mediante el login
      const loginUser = await AuthFetching.postApiLoginWeb(dataLogin);
      // Si hay un error, lo devolvemos
      if (loginUser.error || loginUser.statusCode != 200 || !loginUser.payload)
        return loginUser;
      const combinedCookies = [
        loginUser.payload.mainRoleToken,
        loginUser.payload.userDataToken,
        loginUser.payload.userAccessPathsToken,
      ];
      // Devolvemos el token
      return Utils.Message(false, 200, "Ok", combinedCookies);
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async apiPostPreLoginUser(email) {
    try {
      // Establecemos los datos del formulario
      const dataLogin = {
        email: Utils.isMail(email),
      };
      // Validamos los datos del formulario
      if (Utils.verifyDataObject(dataLogin) !== true)
        return Utils.Message(true, 400, "Datos erróneos");
      // Realizamos la petición a la API Principal para obtener un token mediante el login
      const loginUser = await AuthFetching.postApiPrincipalPreLoginWeb(dataLogin);
      // Si hay un error, lo devolvemos
      if (loginUser.error || loginUser.statusCode != 200 || !loginUser.payload)
        return loginUser;
      return Utils.Message(false, 200, "Ok");
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async apiSubmitLogoutUser(req, res) {
    try {
      const serealizedMainRole = serialize(
        env.server.cookies.main_role.name,
        null,
        TokenUtils.cookieParts
      );
      const serealizedUserAccessPaths = serialize(
        env.server.cookies.user_access_paths.name,
        null,
        TokenUtils.cookieParts
      );
      const serealizedUserData = serialize(
        env.server.cookies.user_information.name,
        null,
        TokenUtils.cookieParts
      );
      const combinedCookies = [
        serealizedMainRole,
        serealizedUserAccessPaths,
        serealizedUserData,
      ];
      res.setHeader("Set-Cookie", combinedCookies);
      return res.status(200).json(Utils.Message(false, 200, "Logout"));
    } catch (error) {
      console.log(error);
      return res.json(Utils.Message(true, 500, "Server Error"));
    }
  }

  static async viewSubmitLogoutUser() {
    try {
      const logout = await AuthFetching.getLocalLogout();
      if (!logout.error && logout.statusCode == 200)
        return (window.location.href = "/");
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async apiIsLogIn(req, res) {
    try {
      const {
        main_role: { name: nameMainRoleCookie },
        user_access_paths: { name: nameUserAccessPathsCookie },
        user_information: { name: nameUserInformationCookie },
      } = env.server.cookies;
      // Obtenemos todas las cookies
      const cookieMainRole = req.cookies[nameMainRoleCookie];
      const cookieUserAccessPaths = req.cookies[nameUserAccessPathsCookie];
      const cookieUserInformation = req.cookies[nameUserInformationCookie];
      const { tokenValidMR, tokenValidUR, tokenValidUA, tokenValidUI } =
        await TokenUtils.destructureTokens(
          cookieMainRole,
          cookieUserAccessPaths,
          cookieUserInformation
        );
      if (
        Utils.validOkMessages(
          tokenValidMR,
          tokenValidUR,
          tokenValidUA,
          tokenValidUI
        )
      )
        return res.json(Utils.Message(false, 200, "Ok"));
      return res.json(Utils.Message(true, 401, "Unauthorized"));
    } catch (error) {
      console.log("error");
      return res.json(Utils.Message(true, 500, "Server Error"));
    }
  }

  static async viewIsLogIn() {
    try {
      const logIn = await AuthFetching.getLocalIsLogIn();
      return logIn;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  // Obtenemos los datos del formulario para enviarlos al API LOCAL para realizar el login
  static viewGetDataToFormLoginUser(data = null) {
    const valuesForm = {
      email: data?.email ? data.email : "",
      password: data?.password ? data.password : "",
    };
    return valuesForm;
  }
}
