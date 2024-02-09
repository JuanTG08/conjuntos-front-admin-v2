import { TowerFetching } from "@/fetching/tower.fetch";
import Utils from "@/helpers/helpers";
import { TowerComplexModel } from "@/model/TowerComplex.model";
import { env } from "../../next.config";
import dayjs from "dayjs";
import { CONST_SYSTEM_NOT_PARAM_VIEW } from "@/constants/system.constant";

export class TowerController {
  // Backend API Functionality
  static async apiGetListAll(req, res) {
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
      const list = await TowerFetching.getApiPrincipalListAll(
        idComplex,
        cookie
      );
      list.payload.complex._count_apartment = 0;
      list.payload.complex._count_apartment_by_tower = 0;
      list.payload.complex.total = list.payload?.towers.length;
      list.payload?.towers.map((tower) => {
        list.payload.complex._count_apartment += tower._count.apartment_complex;
        list.payload.complex._count_apartment_by_tower +=
          tower.number_apartments;
      });
      return res.status(200).json(list);
    } catch (error) {
      console.error(error);
      return res.status(500).json(Utils.Message(true, 500, "Server Error"));
    }
  }

  static async apiSSRGetListAll(cookie, id = CONST_SYSTEM_NOT_PARAM_VIEW) {
    try {
      let idComplex = parseInt(id);
      if (
        !Utils.verifyId(idComplex) &&
        id !== CONST_SYSTEM_NOT_PARAM_VIEW
      )
        return Utils.Message(true, 500, "Datos erróneos");

      idComplex = Utils.verifyId(idComplex)
        ? idComplex
        : CONST_SYSTEM_NOT_PARAM_VIEW;
      const list = await TowerFetching.getApiPrincipalListAll(
        idComplex,
        cookie
      );
      list.payload.complex._count_apartment = 0;
      list.payload.complex._count_apartment_by_tower = 0;
      list.payload.complex.total = list.payload?.towers.length;
      list.payload?.towers.map((tower) => {
        list.payload.complex._count_apartment += tower._count.apartment_complex;
        list.payload.complex._count_apartment_by_tower +=
          tower.number_apartments;
      });
      return list;
    } catch (error) {
      console.error(error);
      return Utils.Message(true, 500, "Server Error");
    }
  }

  // Call Backend API Local
  static async viewGetListAll(id = CONST_SYSTEM_NOT_PARAM_VIEW) {
    try {
      let idComplex = parseInt(id);
      if (!Utils.verifyId(idComplex) && id != CONST_SYSTEM_NOT_PARAM_VIEW)
        return Utils.Message(true, 500, "Datos erróneos");

      idComplex = Utils.verifyId(idComplex)
        ? idComplex
        : CONST_SYSTEM_NOT_PARAM_VIEW;
      const list = await TowerFetching.getApiLocalListAll(idComplex);
      return list;
    } catch (error) {
      console.error(error);
      return Utils.Message(true, 500, "Server Error");
    }
  }

  // Validamos y enviamos los datos a la API principal
  static async apiPostNew(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      let idComplex = req.query?.idComplex;
      const model = new TowerComplexModel(req.body);
      if (
        !Utils.verifyId(idComplex) &&
        req.query?.idComplex !== CONST_SYSTEM_NOT_PARAM_VIEW
      )
        return res.json(Utils.Message(true, 500, "Datos erróneos"));
      idComplex = Utils.verifyId(idComplex)
        ? idComplex
        : CONST_SYSTEM_NOT_PARAM_VIEW;
      const verifyData = model.verifyData([model.VAR_ID_TOWER]);
      if (!verifyData)
        return res.json(Utils.Message(true, 500, "Datos erróneos"));
      model.id_tower = null;
      const respApi = await TowerFetching.postApiPrincipalNew(
        model.getAll,
        cookie
      );
      return res.json(respApi);
    } catch (error) {
      console.log(error);
      return res.json(Utils.Message(true, 500, "Error"));
    }
  }

  // Enviamos desde el formulario de la vista hacia nuestra API LOCAL para que esta reciba y los envié a nuestra API Principal
  static async viewSubmitNew(data, id = CONST_SYSTEM_NOT_PARAM_VIEW) {
    try {
      const model = new TowerComplexModel(data);
      let idComplex = parseInt(id);
      if (!Utils.verifyId(idComplex) && id != CONST_SYSTEM_NOT_PARAM_VIEW)
        return Utils.Message(true, 500, "Datos erróneos");
      idComplex = Utils.verifyId(idComplex)
        ? idComplex
        : CONST_SYSTEM_NOT_PARAM_VIEW;
      const verifyData = model.verifyData([model.VAR_ID_TOWER]);
      model.id_tower = null;
      if (!verifyData) return Utils.Message(true, 500, "Datos erróneos");
      const respApi = await TowerFetching.postApiLocalNew(
        model.getAll,
        idComplex
      );
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

  // Obtenemos uno solo mediante su ID hacia la API principal
  static async apiGetOne(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      let idTower = parseInt(req.query?.idTower);
      if (
        !Utils.verifyId(idTower) &&
        req.query?.idTower !== CONST_SYSTEM_NOT_PARAM_VIEW
      )
        return res
          .status(500)
          .json(Utils.Message(true, 500, "Parámetros fuera de rango"));
      idTower = Utils.verifyId(idTower) ? idTower : CONST_SYSTEM_NOT_PARAM_VIEW;
      const respOne = await TowerFetching.getApiPrincipalOne(idTower, cookie);
      if (respOne.statusCode != 200)
        return res
          .status(500)
          .json(Utils.Message(true, 500, "Error en los datos"));
      respOne.payload.residential_complex._count_apartment =
        respOne.payload.tower_complex._count.apartment_complex;
      respOne.payload.residential_complex._count_apartment_by_tower = 0;
      respOne.payload.residential_complex.total =
        respOne.payload.residential_complex.tower_complex.length;
      respOne.payload.residential_complex.tower_complex.map((tower) => {
        respOne.payload.residential_complex._count_apartment_by_tower +=
          tower.number_apartments;
      });
      return res.status(200).json(respOne);
    } catch (error) {
      console.error(error);
      return res.status(500).json(Utils.Message(true, 500, "Server Error"));
    }
  }

  // Obtenemos uno solo mediante su ID hacia la API LOCAL
  static async viewOne(idTower) {
    try {
      idTower = parseInt(idTower);
      if (Number.isNaN(idTower))
        return Utils.Message(true, 500, "Parámetros fuera de rango");
      const data = await TowerFetching.getApiLocalOne(idTower);
      if (data.error || !data.payload)
        return Utils.Message(true, 500, "Error en los datos");
      const model = new TowerComplexModel(data.payload.tower_complex);
      return Utils.Message(false, 200, "Ok", {
        tower: model.getAllDataForm,
        complex: data.payload.residential_complex,
      });
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Error de conexión Local", error);
    }
  }

  // Validamos y enviamos los datos a la API principal
  static async apiPutEdit(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      let idTower = parseInt(req.query?.idTower);
      const model = new TowerComplexModel(req.body);
      const strObject = await Utils.structureObject(model.getAll);
      if (!strObject || idTower != model.id_tower)
        return res.json(Utils.Message(true, 500, "Datos erróneos"));
      const respApi = await TowerFetching.putApiPrincipalEdit(
        model.getAll,
        cookie
      );
      return res.json(respApi);
    } catch (error) {
      console.log(error);
      return res.json(Utils.Message(true, 500, "Error", error));
    }
  }

  // Enviamos desde el formulario de la vista hacia nuestra API LOCAL para que esta reciba y los envié a nuestra API Principal
  static async viewSubmitEdit(data, id) {
    try {
      id = parseInt(id);
      if (!Utils.verifyId(id))
        return Utils.Message(true, 500, "Datos erróneos");
      const model = new TowerComplexModel(data);
      model.id_tower = id;
      const strObject = await Utils.structureObject(model.getAll);
      if (!strObject) return Utils.Message(true, 500, "Datos erróneos");
      const respApi = await TowerFetching.putApiLocalEdit(model.getAll);
      if (respApi.statusCode == 200)
        return Utils.Message(true, 200, "Se editor correctamente");
      return Utils.Message(respApi);
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Error");
    }
  }

  // Validamos el ID y eliminamos
  static async apiDelete(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      let idTower = parseInt(req.query?.idTower);
      if (!Utils.verifyId(idTower))
        return res.json(Utils.Message(true, 500, "Datos erróneos"));
      const respApi = await TowerFetching.deleteApiPrincipal(idTower, cookie);
      if (respApi.statusCode != 200)
        return res
          .status(500)
          .json(
            Utils.Message(true, 500, "No fue posible eliminar la información")
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
      const respApi = await TowerFetching.deleteApiLocal(id);
      if (respApi.statusCode != 200)
        return Utils.Message(true, 500, "No fue posible eliminar");
      return Utils.Message(false, 200, "Se Elimino correctamente");
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Error");
    }
  }

  static async apiListTowerApartment(cookie) {
    try {
      const respApi = await TowerFetching.getApiPrincipalListTowerApartment(cookie);
      return respApi;
    } catch (error) {
      return Utils.Message(true, 500, "Error");
    }
  }

  // Datos para el formulario de crear
  static viewGetDataToForm(data = null) {
    const valuesForm = {
      id_complex: data?.id_complex ? data.id_complex : "",
      tower_name: data?.tower_name ? data.tower_name : "",
      number_floors: data?.number_floors ? data.number_floors : "",
      number_apartments: data?.number_apartments ? data.number_apartments : "",
      construction_date: data?.construction_date
        ? dayjs(new Date(data?.construction_date.toString()))
        : "",
      id_status_tower: data?.id_status_tower ? data.id_status_tower : "",
    };
    return valuesForm;
  }
}
