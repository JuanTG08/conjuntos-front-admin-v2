import Utils from "@/helpers/helpers";
import { ResidencialComplex } from "@/model/ResidencialComplex.model";
import { ComplexFetching } from "@/fetching/complex.fetch";
import { env } from "../../next.config";
import { UserToRegisterFetching } from "@/fetching/user_to_register.fetch";
import { CONST_USER_VIEW_PANEL } from "@/constants/user.constant";
import { UserRolesController } from "./user_roles.controller";
import { UserToRegisterController } from "./user_to_register.controller";
import dayjs from "dayjs";
import { CONST_SYSTEM_NOT_PARAM_VIEW } from "@/constants/system.constant";

export class ComplexController {
  // Obtenemos el listado de todos los conjuntos residenciales
  static async apiGetListAll(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      const list = await ComplexFetching.getApiPrincipalListAll(cookie);
      return res.status(200).json(list);
    } catch (error) {
      return res.status(500).json(Utils.Message(true, 500, "Server Error"));
    }
  }

  // Listamos todos los conjuntos haciendo una petición a nuestra api local
  static async viewListAll() {
    try {
      const data = await ComplexFetching.getApiLocalListAll();
      return data;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Error", error);
    }
  }

  // Obtenemos uno solo mediante su ID
  static async apiGetOne(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      let idComplex = parseInt(req.query?.idComplex);
      if (
        !Utils.verifyId(idComplex) &&
        req.query?.idComplex !== CONST_SYSTEM_NOT_PARAM_VIEW
      )
        return res
          .status(500)
          .json(Utils.Message(true, 500, "Parámetros fuera de rango"));
      idComplex = Utils.verifyId(idComplex)
        ? idComplex
        : CONST_SYSTEM_NOT_PARAM_VIEW;
      const respOne = await ComplexFetching.getApiPrincipalOne(
        idComplex,
        cookie
      );
      return res.status(200).json(respOne);
    } catch (error) {
      console.error(error);
      return res.status(500).json(Utils.Message(true, 500, "Server Error"));
    }
  }

  // Obtenemos uno solo mediante su ID SSR
  static async apiSSRGetOne(cookie, _idComplex = CONST_SYSTEM_NOT_PARAM_VIEW) {
    try {
      let idComplex = parseInt(_idComplex);
      if (
        !Utils.verifyId(idComplex) &&
        _idComplex !== CONST_SYSTEM_NOT_PARAM_VIEW
      )
        return Utils.Message(true, 500, "Parámetros fuera de rango");
      idComplex = Utils.verifyId(idComplex)
        ? idComplex
        : CONST_SYSTEM_NOT_PARAM_VIEW;
      const respOne = await ComplexFetching.getApiPrincipalOne(
        idComplex,
        cookie
      );
      return respOne;
    } catch (error) {
      console.error(error);
      return Utils.Message(true, 500, "Server Error");
    }
  }

  // Listamos uno solo mediante su ID dirigido a la API local
  static async viewOne(id = CONST_SYSTEM_NOT_PARAM_VIEW) {
    try {
      let idComplex = parseInt(id);
      if (!Utils.verifyId(idComplex) && id != CONST_SYSTEM_NOT_PARAM_VIEW)
        return res
          .status(500)
          .json(Utils.Message(true, 500, "Parámetros fuera de rango"));
      idComplex = Utils.verifyId(idComplex)
        ? idComplex
        : CONST_SYSTEM_NOT_PARAM_VIEW;
      const data = await ComplexFetching.getApiLocalOne(idComplex);
      if (data.error || !data.payload)
        return Utils.Message(true, 500, "Error en los datos");
      const modelComplex = new ResidencialComplex(data.payload);
      return Utils.Message(false, 200, "Ok", {
        ...modelComplex.getAllDataForm,
        complex_state: data.payload.complex_state,
        _count_tower: data.payload._count.tower_complex,
        status_residential_complex:
          data.payload.status_residential_complex.status_name,
      });
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Error", error);
    }
  }

  // Validamos y enviamos los datos a la API principal
  static async apiPostNew(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      const model = new ResidencialComplex(req.body);
      const verifyData = model.verifyData([
        model.VAR_ID_COMPLEX,
        model.VAR_WEB_SITE,
        model.VAR_COMPLEX_ZIP,
      ]);
      if (!verifyData)
        return res.json(Utils.Message(true, 500, "Datos erróneos"));
      // Enviamos los datos para crear un nuevo conjunto
      const respApi = await ComplexFetching.postApiPrincipalNew(
        model.getAll,
        cookie
      );
      // Validamos si la respuesta fue correcta
      if (respApi.statusCode != 200)
        return res
          .status(500)
          .json(
            Utils.Message(true, 500, "No fue posible guardar la información")
          );
      return res.json(Utils.Message(false, 200, "Se creo correctamente"));
    } catch (error) {
      console.log(error);
      return res.json(Utils.Message(true, 500, "Error", error));
    }
  }

  // Enviamos desde el formulario de la vista hacia nuestra API LOCAL para que esta reciba y los envié a nuestra API Principal
  static async viewSubmitNew(data) {
    try {
      const model = new ResidencialComplex(data);
      const verifyData = model.verifyData([
        model.VAR_ID_COMPLEX,
        model.VAR_WEB_SITE,
        model.VAR_COMPLEX_ZIP,
      ]);
      if (!verifyData) return Utils.Message(true, 500, "Datos erróneos");
      const respApi = await ComplexFetching.postApiLocalNew(model.getAll);
      if (respApi.statusCode != 200)
        return Utils.Message(
          true,
          500,
          "No fue posible guardar la información"
        );
      return Utils.Message(false, 200, "Se creo correctamente");
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Error");
    }
  }

  // Validamos y enviamos los datos a la API principal
  static async apiPutEdit(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      let idComplex = req.query?.idComplex;
      idComplex = parseInt(idComplex);
      const model = new ResidencialComplex(req.body);
      const strObject = await Utils.structureObject(model.getAll);
      if (!strObject || idComplex != model._id_complex)
        return res.json(Utils.Message(true, 500, "Datos erróneos"));
      const respApi = await ComplexFetching.putApiPrincipalEdit(
        model.getAll,
        cookie
      );
      if (respApi.statusCode != 200)
        return res
          .status(500)
          .json(
            Utils.Message(true, 500, "No fue posible guardar la información")
          );
      return res.json(Utils.Message(false, 200, "Se actualizo correctamente"));
    } catch (error) {
      console.log(error);
      return res.json(Utils.Message(true, 500, "Error", error));
    }
  }

  // Enviamos desde el formulario de la vista hacia nuestra API LOCAL para que esta reciba y los envié a nuestra API Principal
  static async viewSubmitEdit(data, id) {
    try {
      id = parseInt(id);
      const model = new ResidencialComplex(data);
      model._id_complex = id;
      const strObject = await Utils.structureObject(model.getAll);
      if (!strObject) return Utils.Message(true, 500, "Datos erróneos");
      const respApi = await ComplexFetching.putApiLocalEdit(model.getAll);
      if (respApi.statusCode != 200)
        return Utils.Message(
          true,
          500,
          "No fue posible guardar la información"
        );
      return Utils.Message(false, 200, "Se actualizo correctamente");
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Error");
    }
  }

  static async apiPutEditToSettingComplex(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      if (req.body?.id_complex_status) delete req.body.id_complex_status;
      const complexModel = new ResidencialComplex(req.body);
      const verifyData = complexModel.verifyData([
        complexModel.VAR_ID_COMPLEX,
        complexModel.VAR_ID_COMPLEX_STATUS,
        complexModel.VAR_WEB_SITE,
        complexModel.VAR_COMPLEX_ZIP,
      ]);
      if (!verifyData)
        return res.json(Utils.Message(true, 500, "Datos erróneos"));
      complexModel._id_complex = CONST_SYSTEM_NOT_PARAM_VIEW;
      const respApi = await ComplexFetching.putApiPrincipalEdit(
        complexModel.getAll,
        cookie
      );
      if (respApi.statusCode != 200)
        return res
          .status(500)
          .json(
            Utils.Message(true, 500, "No fue posible guardar la información")
          );
      return res.json(Utils.Message(false, 200, "Se actualizo correctamente"));
    } catch (error) {
      return res.json(Utils.Message(true, 500, "Error"));
    }
  }

  static async viewSubmitEditToSettingComplex(data) {
    try {
      if (data?.id_complex_status) delete data.id_complex_status;
      const complexModel = new ResidencialComplex(data);
      const verifyData = complexModel.verifyData([
        complexModel.VAR_ID_COMPLEX,
        complexModel.VAR_ID_COMPLEX_STATUS,
        complexModel.VAR_WEB_SITE,
        complexModel.VAR_COMPLEX_ZIP,
      ]);
      if (!verifyData) return Utils.Message(true, 500, "Datos erróneos");
      const respApi = await ComplexFetching.putApiLocalEditToSettingComplex(
        complexModel.getAll
      );
      if (respApi.statusCode != 200)
        return Utils.Message(
          true,
          500,
          "No fue posible guardar la información"
        );
      return Utils.Message(false, 200, "Se actualizo correctamente");
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Error");
    }
  }

  // Validamos el ID y eliminamos
  static async apiDelete(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      let idComplex = req.query?.idComplex;
      idComplex = parseInt(idComplex);
      if (!Utils.verifyId(idComplex))
        return res.json(Utils.Message(true, 500, "Datos erróneos"));
      const respApi = await ComplexFetching.deleteApiPrincipal(
        idComplex,
        cookie
      );
      if (respApi.statusCode != 200)
        return res
          .status(500)
          .json(
            Utils.Message(true, 500, "No fue posible guardar la información")
          );
      return res.json(Utils.Message(false, 200, "Se elimino correctamente"));
    } catch (error) {
      console.log(error);
      return res.json(Utils.Message(true, 500, "Error", error));
    }
  }

  // Enviamos desde el formulario de la vista hacia nuestra API LOCAL para que esta reciba y los envié a nuestra API Principal
  static async viewSubmitDelete(id) {
    try {
      id = parseInt(id);
      if (!Utils.verifyId) return Utils.Message(true, 500, "Datos erróneos");
      const respApi = await ComplexFetching.deleteApiLocal(id);
      if (respApi.statusCode != 200)
        return Utils.Message(true, 500, "No fue posible eliminar");
      return Utils.Message(false, 200, "Se Elimino correctamente");
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Error");
    }
  }

  // Listado de usuarios administrativos
  static async apiListUserAdmin(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      let idComplex = parseInt(req.query?.idComplex);
      if (
        !Utils.verifyId(idComplex) &&
        req.query?.idComplex !== CONST_SYSTEM_NOT_PARAM_VIEW
      )
        return res.json(Utils.Message(true, 500, "Datos erróneos"));
      idComplex = Utils.verifyId(idComplex)
        ? idComplex
        : CONST_SYSTEM_NOT_PARAM_VIEW;
      const respApi = await ComplexFetching.getApiListUserAdminComplex(
        idComplex,
        cookie
      );
      return res.json(respApi);
    } catch (error) {
      return res.json(Utils.Message(true, 500, "Error", error));
    }
  }

  // Listado de usuarios administrativos mediante SSR
  static async apiSSRListUserAdmin(cookie, _idComplex) {
    try {
      let idComplex = parseInt(_idComplex);
      if (
        !Utils.verifyId(idComplex) &&
        _idComplex !== CONST_SYSTEM_NOT_PARAM_VIEW
      )
        return Utils.Message(true, 500, "Datos erróneos");
      idComplex = Utils.verifyId(idComplex)
        ? idComplex
        : CONST_SYSTEM_NOT_PARAM_VIEW;
      const respApi = await ComplexFetching.getApiListUserAdminComplex(
        idComplex,
        cookie
      );
      return respApi;
    } catch (error) {
      return Utils.Message(true, 500, "Error", error);
    }
  }

  static async viewListUserAdmin(id = CONST_SYSTEM_NOT_PARAM_VIEW) {
    try {
      let idComplex = parseInt(id);
      if (!Utils.verifyId(idComplex) && id != CONST_SYSTEM_NOT_PARAM_VIEW)
        return Utils.Message(true, 500, "Datos erróneos");
      idComplex = Utils.verifyId(idComplex)
        ? idComplex
        : CONST_SYSTEM_NOT_PARAM_VIEW;
      const respApi = await ComplexFetching.getApiLocalListUserAdminComplex(
        idComplex
      );
      return respApi;
    } catch (error) {
      return Utils.Message(true, 500, "Error");
    }
  }

  // Crear usuarios administrador
  static async apiSetUserAdmin(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      let idComplex = parseInt(req.query?.idComplex);
      const idRole = parseInt(req.body?.id_role);
      if (
        (!Utils.verifyId(idComplex) &&
          req.query?.idComplex != CONST_SYSTEM_NOT_PARAM_VIEW) ||
        !Utils.verifyId(idRole)
      )
        return res.json(Utils.Message(true, 500, "Datos erróneos"));
      if (
        !(
          (
            idRole === env.variables.roles.SUAC.id || // Super usuario administrador de conjunto
            idRole === env.variables.roles.UAC.id || // Usuario administrador de conjunto
            idRole === env.variables.roles.UEV.id
          ) // Usuario Encargado de la Vigilancia
        )
      )
        return res.json(Utils.Message(true, 500, "Datos erróneos"));
      idComplex = Utils.verifyId(idComplex)
        ? idComplex
        : CONST_SYSTEM_NOT_PARAM_VIEW;
      const dataToSet = {
        id_residential_complex: idComplex,
        email: Utils.isMail(req.body?.email),
        id_role: idRole,
      };
      if (Utils.verifyDataObject(dataToSet) !== true)
        return res.json(Utils.Message(true, 500, "Datos erróneos"));
      const setUser = await UserToRegisterFetching.postApiPrincipalNew(
        dataToSet,
        cookie
      );
      return res.json(setUser);
    } catch (error) {
      return res.json(Utils.Message(true, 500, "Error", error));
    }
  }

  static async viewSetUserAdmin(data, id = CONST_SYSTEM_NOT_PARAM_VIEW) {
    try {
      let idComplex =
        id === CONST_SYSTEM_NOT_PARAM_VIEW
          ? CONST_SYSTEM_NOT_PARAM_VIEW
          : parseInt(id);
      const idRole = parseInt(data.id_role);
      if (
        (!Utils.verifyId(idComplex) && id != CONST_SYSTEM_NOT_PARAM_VIEW) ||
        !Utils.verifyId(idRole)
      )
        return Utils.Message(true, 500, "Datos erróneos");
      if (
        !(
          (
            idRole === env.variables.roles.SUAC.id || // Super usuario administrador de conjunto
            idRole === env.variables.roles.UAC.id || // Usuario administrador de conjunto
            idRole === env.variables.roles.UEV.id
          ) // Usuario Encargado de la Vigilancia
        )
      )
        return Utils.Message(true, 500, "Datos erróneos");
      const dataToSet = {
        id_residential_complex: idComplex,
        email: Utils.isMail(data.email),
        id_role: idRole,
      };
      if (Utils.verifyDataObject(dataToSet) !== true)
        return Utils.Message(true, 500, "Datos erróneos");
      const sendApi = await ComplexFetching.postApiLocalSetUserAdminComplex(
        idComplex,
        dataToSet
      );
      return sendApi;
    } catch (error) {
      return Utils.Message(true, 500, "Error");
    }
  }

  static async viewSubmitDeleteUserSet(idUser, to) {
    try {
      idUser = parseInt(idUser);
      if (Utils.verifyId(idUser)) Utils.Message(true, 500, "Datos erróneos");
      if (to === CONST_USER_VIEW_PANEL.userRoles) {
        return await UserRolesController.viewDelete(idUser);
      } else if (to === CONST_USER_VIEW_PANEL.userToRegister) {
        return await UserToRegisterController.viewDelete(idUser);
      }
      return Utils.Message(true, 500, "Error en los datos entregados");
    } catch (error) {
      return Utils.Message(true, 500, "Error");
    }
  }

  static viewGetDataToForm(data = null) {
    const valuesForm = {
      complex_name: data?.complex_name ? data.complex_name : "",
      complex_nit: data?.complex_nit ? data.complex_nit : "",
      complex_country: "COLOMBIA",
      complex_state: data?.complex_state ? data.complex_state : "",
      id_complex_city: data?.id_complex_city ? data.id_complex_city : "",
      complex_address: data?.complex_address ? data.complex_address : "",
      complex_neighborhood: data?.complex_neighborhood
        ? data.complex_neighborhood
        : "",
      web_site: data?.web_site ? data.web_site : "",
      complex_zip: data?.complex_zip ? data.complex_zip : "",
      number_buildings: data?.number_buildings ? data.number_buildings : "",
      number_units: data?.number_units ? data.number_units : "",
      construction_date: data?.construction_date
        ? dayjs(new Date(data.construction_date.toString()))
        : "",
      total_area: data?.total_area ? data.total_area : "",
      id_complex_status: data?.id_complex_status
        ? data.id_complex_status.toString()
        : "",
    };
    return valuesForm;
  }
}
