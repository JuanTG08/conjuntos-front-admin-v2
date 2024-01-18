import { ApartmentFetch } from "@/fetching/apartment.fetch";
import Utils from "@/helpers/helpers";
import { ApartmentComplexModel } from "@/model/ApartmentComplex.model";
import { env } from "../../next.config";
import dayjs from "dayjs";
import { CONST_SYSTEM_NOT_PARAM_VIEW } from "@/constants/system.constant";
import { ComplexFetching } from "@/fetching/complex.fetch";

export class ApartmentComplexController {
  static async apiGetListAll(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      const idTower = parseInt(req.query?.idTower);
      if (!Utils.verifyId(idTower))
        return res.json(Utils.Message(true, 500, "Datos erroneos"));
      const list = await ApartmentFetch.getApiPrincipalListAll(idTower, cookie);
      return res.json(list);
    } catch (error) {
      console.log(error);
      return res.status(500).json(Utils.Message(true, 500, "Server Error"));
    }
  }

  static async viewGetListAll(idTower) {
    try {
      idTower = parseInt(idTower);
      if (!Utils.verifyId(idTower))
        return Utils.Message(true, 500, "Datos erroneos");
      const list = await ApartmentFetch.getApiLocalListAll(idTower);
      return list;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async apiPostNew(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      const idTower = parseInt(req.query?.idTower);
      if (!Utils.verifyId(idTower))
        return res.json(Utils.Message(true, 500, "Datos erroneos"));
      const modelApartment = new ApartmentComplexModel(req.body);
      const verifyData = modelApartment.verifyData([
        modelApartment.VAR_ID_APARTMENT,
        modelApartment.VAR_LEVEL_FLOOR,
        modelApartment.VAR_NUMBER_BEDROOMS,
        modelApartment.VAR_NUMBER_BATHROOMS,
        modelApartment.VAR_START_DATE,
        modelApartment.VAR_CONSTRUCTION_DATE,
      ]);
      if (!verifyData)
        return res.json(Utils.Message(true, 500, "Datos erroneos"));
      modelApartment.id_apartment = null;
      const respApi = await ApartmentFetch.postApiPrincipalNew(
        modelApartment.getAll,
        cookie
      );
      if (respApi.statusCode != 200)
        return res
          .status(500)
          .json(
            Utils.Message(true, 500, "No fue posible guardar la información")
          );
      return res.json(Utils.Message(false, 200, "Se creo correctamente"));
    } catch (error) {
      return res.status(500).json(Utils.Message(true, 500, "Server Error"));
    }
  }

  static async viewSubmitNew(data) {
    try {
      const modelApartment = new ApartmentComplexModel(data);
      if (!Utils.verifyId(modelApartment.id_tower))
        return Utils.Message(true, 500, "Datos erroneos");
      const verifyData = modelApartment.verifyData([
        modelApartment.VAR_ID_APARTMENT,
      ]);
      modelApartment.id_apartment = null;
      if (!verifyData) return Utils.Message(true, 500, "Datos erroneos");
      const respApi = await ApartmentFetch.postApiLocalNew(
        modelApartment.getAll,
        modelApartment.id_tower
      );
      if (respApi.statusCode != 200)
        return Utils.Message(
          true,
          500,
          "No fue posible guardar la información"
        );
      return Utils.Message(false, 200, "Se creo correctamente");
    } catch (error) {
      return Utils.Message(true, 500, "Error");
    }
  }

  static async apiGetOne(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      let idApartment = parseInt(req.query?.idApartment);
      if (
        !Utils.verifyId(idApartment) &&
        req.query?.idApartment !== CONST_SYSTEM_NOT_PARAM_VIEW
      )
        res.json(Utils.Message(true, 500, "Datos erroneos"));
      idApartment = Utils.verifyId(idApartment)
        ? idApartment
        : CONST_SYSTEM_NOT_PARAM_VIEW;
      const respOne = await ApartmentFetch.getApiPrincipalOne(
        idApartment,
        cookie
      );
      return res.status(200).json(respOne);
    } catch (error) {
      console.log(error);
      return res.status(500).json(Utils.Message(true, 500, "Server Error"));
    }
  }

  // Obtener una unidad mediante SSR
  static async apiSSRGetOne(
    cookie,
    _idApartment = CONST_SYSTEM_NOT_PARAM_VIEW
  ) {
    try {
      let idApartment = parseInt(_idApartment);
      if (
        !Utils.verifyId(idApartment) &&
        _idApartment !== CONST_SYSTEM_NOT_PARAM_VIEW
      )
        return Utils.Message(true, 500, "Datos erroneos");
      idApartment = Utils.verifyId(idApartment)
        ? idApartment
        : CONST_SYSTEM_NOT_PARAM_VIEW;
      const respOne = await ApartmentFetch.getApiPrincipalOne(
        idApartment,
        cookie
      );
      return respOne;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async viewOne(id = CONST_SYSTEM_NOT_PARAM_VIEW) {
    try {
      let idApartment = parseInt(id);
      if (!Utils.verifyId(idApartment) && id != CONST_SYSTEM_NOT_PARAM_VIEW)
        return Utils.Message(true, 500, "Datos erroneos");
      idApartment = Utils.verifyId(idApartment)
        ? idApartment
        : CONST_SYSTEM_NOT_PARAM_VIEW;
      const respOne = await ApartmentFetch.getApiLocalOne(idApartment);
      return respOne;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Error");
    }
  }

  static async apiPutEdit(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      const idApartment = parseInt(req.query?.idApartment);
      if (!Utils.verifyId(idApartment))
        return res.json(Utils.Message(true, 500, "Datos erroneos"));
      const modelApartment = new ApartmentComplexModel(req.body);
      const strObject = Utils.structureObject(modelApartment.getAll);
      if (!strObject)
        return res.json(Utils.Message(true, 500, "Datos erroneos"));
      const respApi = await ApartmentFetch.putApiPrincipalUpdate(
        modelApartment.getAll,
        cookie
      );
      return res.json(respApi);
    } catch (error) {
      return res.status(500).json(Utils.Message(true, 500, "Server Error"));
    }
  }

  static async viewSubmitEdit(data, id) {
    try {
      id = parseInt(id);
      if (!Utils.verifyId(id))
        return Utils.Message(true, 500, "Datos erroneos");
      const model = new ApartmentComplexModel(data);
      model.id_apartment = id;
      const strObject = await Utils.structureObject(model.getAll);
      if (!strObject) return Utils.Message(true, 500, "Datos erroneos");
      const respApi = await ApartmentFetch.putApiLocalUpdate(model.getAll, id);
      if (respApi.statusCode == 200)
        return Utils.Message(true, 500, "Se editor correctamente");
      return respApi;
    } catch (error) {
      return Utils.Message(true, 500, "Error");
    }
  }

  static async apiDelete(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      const idApartment = parseInt(req.query?.idApartment);
      if (!Utils.verifyId(idApartment))
        return res.json(Utils.Message(true, 500, "Datos erroneos"));
      const respApi = await ApartmentFetch.deleteApiPrincipal(
        idApartment,
        cookie
      );
      if (respApi.statusCode != 200)
        return res
          .status(500)
          .json(
            Utils.Message(true, 500, "No fue posible eliminar la información")
          );
      return res.json(Utils.Message(false, 200, "Se elimino correctamente"));
    } catch (error) {
      return res.json(Utils.Message(true, 500, "Error", error));
    }
  }

  static async apiGetListUserToApartmentCall(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      const idApartment = parseInt(req.query?.idApartment);
      if (!Utils.verifyId(idApartment))
        return res.json(Utils.Message(true, 500, "Datos erroneos"));
      const respApi =
        await ApartmentFetch.getApiPrincipalListApartmentUserToCall(
          idApartment,
          cookie
        );
      return res.json(respApi);
    } catch (error) {
      return res.json(Utils.Message(true, 500, "Error"));
    }
  }

  static async viewGetListUserToApartmentCall(idApartment) {
    try {
      idApartment = parseInt(idApartment);
      if (!Utils.verifyId(idApartment))
        return Utils.Message(true, 500, "Datos erroneos");
      const list = await ApartmentFetch.getApiLocalListApartmentUserToCall(
        idApartment
      );
      return list;
    } catch (error) {
      return Utils.Message(true, 500, "Error");
    }
  }

  static async viewSubmitDelete(id) {
    try {
      id = parseInt(id);
      if (!Utils.verifyId) return Utils.Message(true, 500, "Datos erroneos");
      const respApi = await ApartmentFetch.deleteApiLocal(id);
      if (respApi.statusCode != 200)
        return Utils.Message(true, 500, "No fue posible eliminar");
      return Utils.Message(false, 200, "Se Elimino correctamente");
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Error");
    }
  }

  static viewGetDataToForm(data = null) {
    const valuesForm = {
      apartment_identifier_tower: data?.apartment_identifier_tower
        ? data.apartment_identifier_tower
        : "",
      level_floor: data?.level_floor ? data.level_floor : "",
      number_bedrooms: data?.number_bedrooms ? data.number_bedrooms : "",
      number_bathrooms: data?.number_bathrooms ? data.number_bathrooms : "",
      total_area: data?.total_area ? data.total_area : "",
      number_residents: data?.number_residents ? data.number_residents : "",
      construction_date: data?.construction_date
        ? dayjs(new Date(data?.construction_date.toString()))
        : "",
      start_date: data?.start_date
        ? dayjs(new Date(data?.start_date.toString()))
        : "",
      id_status_apartment: data?.id_status_apartment
        ? data.id_status_apartment
        : "",
    };
    return valuesForm;
  }
}
