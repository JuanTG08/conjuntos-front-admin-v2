import { AuthFetching } from "@/fetching/auth.fetch";
import Utils from "@/helpers/helpers";
import { UserModel } from "@/model/User.model";
import { env } from "../../next.config";
import { UserFetching } from "@/fetching/user.fetch";
import { DateUtils } from "@/utils/date.utils";
import dayjs from "dayjs";
import { serialize } from "cookie";
import { TokenUtils } from "@/utils/token.utils";

export class UserController {
  // Directamente se conecta a la API Principal obteniendo los datos del Registro por el token dado
  static async apiGetUserToRegisterValidByToken(token) {
    try {
      const getUserToRegister = await AuthFetching.getApiPrincipalFindByToken(
        token
      );
      return getUserToRegister;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Server Error");
    }
  }

  // Registramos al usuario en la API Principal
  static async apiPostRegisterUser(req, res) {
    try {
      // Obtenemos el token del registro
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      const token = Utils._length(req.query?.tokenToRegister, 36, 1);
      if (!token) return res.json(Utils.Message(true, 400, "Token not found"));
      // Obtenemos los datos del registro
      const model = new UserModel(req.body);
      const verifyData = model.verifyData([
        model.VAR_USER_ID,
        model.VAR_USER_EMAIL,
        model.VAR_USER_PARENT_USER,
        model.VAR_USER_STATUS,
        model.VAR_USER_ID_PROFILE_PICTURE,
        model.VAR_USER_HOME_PHONE,
      ]);
      if (!verifyData)
        return res.json(Utils.Message(true, 500, "Datos erróneos"));
      const registerUser = await AuthFetching.postApiRegisterWeb(
        model.getAll,
        token,
        cookie
      );
      return res.json(registerUser);
    } catch (error) {
      return res.json(Utils.Message(true, 500, "Error"));
    }
  }

  // Obtenemos los datos del usuario a registrar y enviamos a nuestra api local
  static async viewSubmitRegisterUser(data, token) {
    try {
      token = Utils._length(token, 36, 1);
      if (!token) return Utils.Message(true, 400, "Token not found");
      const model = new UserModel(data);
      const verifyData = model.verifyData([
        model.VAR_USER_ID,
        model.VAR_USER_EMAIL,
        model.VAR_USER_PARENT_USER,
        model.VAR_USER_STATUS,
        model.VAR_USER_ID_PROFILE_PICTURE,
        model.VAR_USER_HOME_PHONE,
      ]);
      if (verifyData !== true)
        return Utils.Message(true, 500, "Datos erróneos");
      const registerUser = await AuthFetching.postLocalRegisterWeb(
        model.getAll,
        token
      );
      return registerUser;
    } catch (error) {
      console.error(error);
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async apiPutEditUserProfile(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      const model = new UserModel(req.body);
      model.email = null;
      model.id = null;
      const verifyData = model.verifyData([
        model.VAR_USER_ID,
        model.VAR_USER_EMAIL,
        model.VAR_USER_PARENT_USER,
        model.VAR_USER_STATUS,
        model.VAR_USER_ID_PROFILE_PICTURE,
        model.VAR_USER_HOME_PHONE,
      ]);
      if (verifyData !== true)
        return Utils.Message(true, 500, "Datos erróneos");
      const sendData = await UserFetching.putApiPrincipalUserProfile(
        model.getAll,
        cookie
      );
      if (sendData.error || sendData.statusCode !== 200 || !sendData.payload)
        return res.json(sendData);
      const serializedUserData = serialize(
        env.server.cookies.user_information.name,
        sendData.payload.userDataToken,
        TokenUtils.cookieParts
      );
      res.setHeader("Set-Cookie", serializedUserData);
      return res.json(
        Utils.Message(false, 200, "Datos actualizados", sendData.payload.user)
      );
    } catch (error) {
      console.log(error);
      return res.json(Utils.Message(true, 500, "Server Error"));
    }
  }

  static async viewPutEdit(data) {
    try {
      const model = new UserModel(data);
      model.email = null;
      model.id = null;
      const verifyData = model.verifyData([
        model.VAR_USER_ID,
        model.VAR_USER_EMAIL,
        model.VAR_USER_PARENT_USER,
        model.VAR_USER_STATUS,
        model.VAR_USER_ID_PROFILE_PICTURE,
        model.VAR_USER_HOME_PHONE,
      ]);
      if (verifyData !== true)
        return Utils.Message(true, 500, "Datos erróneos");
      /*
        LA FUNCIONALIDAD DE LA IMAGEN ESTARA DESHABILITADA HASTA NUEVO AVISO
      */
      // Validamos la imagen
      /*
      if (image) {
        // Enviamos la imagen para que se cree la miniatura de la misma
        const formData = new FormData();
        formData.append("file", image);
        // Obtenemos el ID de la miniatura
        const sendImage = await FileFetching.setLocalFile(formData);
        if (!sendImage.error && sendImage.statusCode === 200) {
          model.id_profile_picture = sendImage.payload.id_file;
        }
      }
      */
      const sendData = await UserFetching.putApiLocalUserProfile(model.getAll);
      return sendData;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async apiGetUserInfo(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      const getUser = await UserFetching.getApiPrincipalUserInfo(cookie);
      return res.json(getUser);
    } catch (error) {
      return res.json(Utils.Message(true, 500, "Server Error"));
    }
  }

  static async viewGetUserInfo() {
    try {
      const getUserInfo = await UserFetching.getApiLocalUserInfo();
      return getUserInfo;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  // Establecemos los datos de usuario a registrar
  static viewGetDataToFormUserToRegister(data = null, listCountry = []) {
    const valuesForm = {
      email: data?.email ? data.email : "",
      name: data?.name ? data.name : "",
      last_name: data?.last_name ? data.last_name : "",
      id_profile_picture: data?.id_profile_picture
        ? data.id_profile_picture
        : "",
      id_type_identification: data?.id_type_identification
        ? data.id_type_identification
        : "",
      number_identification: data?.number_identification
        ? data.number_identification
        : "",
      mobile_phone: data?.mobile_phone ? data.mobile_phone : "",
      home_phone: data?.home_phone ? data.home_phone : "",
      residence_address: data?.residence_address ? data.residence_address : "",
      id_country: listCountry.length > 0 ? listCountry[0].id_country : "",
      id_city: data?.id_city ? data.id_city : "",
      id_state: data?.municipality ? data?.municipality?.department_country?.id_department : "",
      id_gender: data?.id_gender ? data.id_gender : "",
      birthdate: data?.birthdate
        ? dayjs(new Date(DateUtils.formatDateToDB(data.birthdate)))
        : "",
      management_files:
        data?.management_files_users_id_profile_pictureTomanagement_files,
    };
    return valuesForm;
  }

  // Establecemos los datos del usuario
  static viewGetDataToFormUser(data = null) {
    const valuesForm = {
      email: data?.email ? data.email : "",
      name: data?.name ? data.name : "",
      last_name: data?.last_name ? data.last_name : "",
    };
    return valuesForm;
  }
}
