import { ApartmentUserFetch } from "@/fetching/apartment_user.fetch";
import Utils from "@/helpers/helpers";
import { env } from "../../next.config";
import { UserToRegisterFetching } from "@/fetching/user_to_register.fetch";
import { UserToRegisterController } from "./user_to_register.controller";
import { UserRolesController } from "./user_roles.controller";
import { CONST_USER_VIEW_PANEL } from "@/constants/user.constant";

export class ApartmentUserController {
  static async apiGetListAll(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      const idApartment = parseInt(req.query?.id_apartment);
      if (!Utils.verifyId(idApartment))
        return res.json(Utils.Message(true, 500, "Datos erróneos"));
      const list = await ApartmentUserFetch.getApiPrincipalListAll(
        idApartment,
        cookie
      );
      return res.json(list);
    } catch (error) {
      return res.json(Utils.Message(true, 500, "Error"));
    }
  }

  // Obtenemos el listado de usuarios para una unidad en modo SSR
  static async apiSSRGetListAll(cookie, idApartment) {
    try {
      idApartment = parseInt(idApartment);
      if (!Utils.verifyId(idApartment))
        return Utils.Message(true, 500, "Datos erróneos");
      const list = await ApartmentUserFetch.getApiPrincipalListAll(
        idApartment,
        cookie
      );
      return list;
    } catch (error) {
      return Utils.Message(true, 500, "Error");
    }
  }

  static async viewGetListAll(idApartment) {
    try {
      idApartment = parseInt(idApartment);
      if (!Utils.verifyId(idApartment))
        return Utils.Message(true, 500, "Datos erróneos");
      const list = await ApartmentUserFetch.getApiLocalListAll(idApartment);
      return list;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Error");
    }
  }

  static async apiPostNew(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      const idApartment = parseInt(req.query?.id_apartment);
      const dataToSet = {
        id_residential_complex: parseInt(req.body?.id_residential_complex),
        email: Utils.isMail(req.body?.email),
        id_role: parseInt(req.body?.id_role),
        id_apartment_complex: parseInt(idApartment),
      };
      if (
        !Utils.verifyId(idApartment) ||
        Utils.verifyDataObject(dataToSet) !== true ||
        !Utils.verifyId(dataToSet.id_residential_complex) ||
        !Utils.verifyId(dataToSet.id_role)
      )
        return res.json(Utils.Message(true, 500, "Datos erróneos"));
      const getSetUser = await UserToRegisterFetching.postApiPrincipalNew(
        dataToSet,
        cookie
      );
      if (getSetUser.error || getSetUser.statusCode !== 200)
        return res.json(getSetUser);
      return res.json(getSetUser);
    } catch (error) {
      console.log(error);
      return res.json(Utils.Message(true, 500, "Error"));
    }
  }
  static async viewSubmitNew(data, idApartment) {
    try {
      idApartment = parseInt(idApartment);
      const dataSend = {
        id_residential_complex: parseInt(data?.id_residential_complex),
        email: Utils.isMail(data?.email),
        id_role: parseInt(data?.id_role),
      };
      if (
        Utils.verifyDataObject(dataSend) !== true ||
        !Utils.verifyId(dataSend.id_residential_complex) ||
        !Utils.verifyId(dataSend.id_role)
      )
        return Utils.Message(true, 500, "Datos erróneos");
      const setApartmentUser = await ApartmentUserFetch.postApiLocalNew(
        dataSend,
        idApartment
      );
      return setApartmentUser;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Error");
    }
  }

  static async apiGetOne(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      const idApartmentUser = parseInt(req.query?.id_apartment_user);
      if (!Utils.verifyId(idApartmentUser))
        return res.json(Utils.Message(true, 500, "Datos erróneos"));
      const response = await ApartmentUserFetch.getApiPrincipalOne(
        idApartmentUser,
        cookie
      );
      return res.json(response);
    } catch (error) {
      return res.json(Utils.Message(true, 500, "Error"));
    }
  }
  static async viewOne(idApartmentUser) {
    try {
      idApartmentUser = parseInt(idApartmentUser);
      if (!Utils.verifyId(idApartmentUser))
        return Utils.Message(true, 500, "Datos erróneos");
      const response = await ApartmentUserFetch.getApiLocalOne(idApartmentUser);
      return response;
    } catch (error) {
      return Utils.Message(true, 500, "Error");
    }
  }

  static async viewSubmitDelete(idApartmentUser, to) {
    try {
      idApartmentUser = parseInt(idApartmentUser);
      if (!Utils.verifyId(idApartmentUser))
        return Utils.Message(true, 500, "Datos erróneos");
      if (to === CONST_USER_VIEW_PANEL.userRoles) {
        return await UserRolesController.viewDelete(idApartmentUser);
      } else if (to === CONST_USER_VIEW_PANEL.userToRegister) {
        return await UserToRegisterController.viewDelete(idApartmentUser);
      }
      return Utils.Message(true, 500, "Error en los datos entregados");
    } catch (error) {
      return Utils.Message(true, 500, "Error");
    }
  }
}
