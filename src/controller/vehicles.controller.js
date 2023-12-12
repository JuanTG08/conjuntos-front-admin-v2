import { VehiclesFetching } from "@/fetching/vehicles.fetch";
import Utils from "@/helpers/helpers";
import { env } from "../../next.config";
import { VehicleModel } from "@/model/Vehicle.model";

export class VehiclesController {
  static async apiPostVehicle(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      const modelVehicle = new VehicleModel(req.body);
      const verifyData = modelVehicle.verifyData([
        modelVehicle.VAR_ID_APARTMENT,
        modelVehicle.VAR_ID_USER_ROLE,
        modelVehicle.VAR_DESCRIPTION,
        modelVehicle.VAR_ID_STATUS,
      ]);
      if (verifyData !== true)
        return res.json(Utils.Message(true, 500, "Datos erróneos"));
      const send = await VehiclesFetching.postApiPrincipalVehicle(
        cookie,
        modelVehicle.getAll
      );
      return res.json(send);
    } catch (error) {
      console.log(error);
      return res.json(Utils.Message(true, 500, "Error al procesar los datos"));
    }
  }

  static async viewPostVehicle(data) {
    try {
      const modelVehicle = new VehicleModel(data);
      const verifyData = modelVehicle.verifyData([
        modelVehicle.VAR_ID_APARTMENT,
        modelVehicle.VAR_ID_USER_ROLE,
        modelVehicle.VAR_DESCRIPTION,
        modelVehicle.VAR_ID_STATUS,
      ]);
      if (verifyData !== true)
        return Utils.Message(true, 500, "Datos erróneos");
      const send = await VehiclesFetching.postApiLocalVehicle(
        modelVehicle.getAll
      );
      return send;
    } catch (error) {
      return Utils.Message(true, 500, "Error");
    }
  }

  static async apiSSRGetListVehicles(cookie) {
    try {
      const list = await VehiclesFetching.getApiPrincipalListAll(cookie);
      return list;
    } catch (error) {
      return Utils.Message(true, 500, "Error");
    }
  }

  static async apiGetListVehicles(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      const send = await VehiclesFetching.getApiPrincipalListAll(cookie);
      return res.json(send);
    } catch (error) {
      console.log(error);
      return res.json(Utils.Message(true, 500, "Error"));
    }
  }

  static async viewGetListVehicles() {
    try {
      const send = await VehiclesFetching.getApiLocalListAll();
      return send;
    } catch (error) {
      return Utils.Message(true, 500, "Error");
    }
  }

  static async apiSSRGetOneVehicle(cookie, idVehicle) {
    try {
      idVehicle = parseInt(idVehicle);
      if (!Utils.verifyId(idVehicle)) return Utils.Message(true, 500, "Error");
      const vehicle = await VehiclesFetching.getApiPrincipalOneVehicle(
        cookie,
        idVehicle
      );
      return vehicle;
    } catch (error) {
      return Utils.Message(true, 500, "Error");
    }
  }

  static async apiPutVehicle(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      const idVehicle = parseInt(req.query?.idVehicle);
      if (!Utils.verifyId(idVehicle))
        return res.json(Utils.Message(true, 500, "ID invalido"));
      const modelVehicle = new VehicleModel(req.body);
      const verifyData = modelVehicle.verifyData([
        modelVehicle.VAR_ID_APARTMENT,
        modelVehicle.VAR_ID_USER_ROLE,
        modelVehicle.VAR_DESCRIPTION,
        modelVehicle.VAR_ID_STATUS,
      ]);
      if (verifyData !== true)
        return res.json(Utils.Message(true, 500, "Datos erróneos"));
      const send = await VehiclesFetching.putApiPrincipalVehicle(
        cookie,
        modelVehicle.getAll,
        idVehicle
      );
      return res.json(send);
    } catch (error) {
      console.log(error);
      return res.json(Utils.Message(true, 500, "Error"));
    }
  }

  static async viewPutVehicle(data, idVehicle) {
    try {
      idVehicle = parseInt(idVehicle);
      if (!Utils.verifyId(idVehicle))
        return Utils.Message(true, 500, "ID invalido");
      const modelVehicle = new VehicleModel(data);
      const verifyData = modelVehicle.verifyData([
        modelVehicle.VAR_ID_APARTMENT,
        modelVehicle.VAR_ID_USER_ROLE,
        modelVehicle.VAR_DESCRIPTION,
        modelVehicle.VAR_ID_STATUS,
      ]);
      if (verifyData !== true)
        return Utils.Message(true, 500, "Datos erróneos");
      const send = await VehiclesFetching.putApiLocalVehicle(
        modelVehicle.getAll,
        idVehicle
      );
      return send;
    } catch (error) {
      return Utils.Message(true, 500, "Error");
    }
  }

  static async apiDeleteVehicle(req, res) {
    try {
      const idVehicle = parseInt(req.query?.idVehicle);
      if (!Utils.verifyId(idVehicle))
        return res.json(Utils.Message(true, 500, "Error"));
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      const send = await VehiclesFetching.deleteApiPrincipalVehicle(
        cookie,
        idVehicle
      );
      return res.json(send);
    } catch (error) {
      return res.json(Utils.Message(true, 500, "Error"));
    }
  }

  static async viewDeleteVehicle(idVehicle) {
    try {
      idVehicle = parseInt(idVehicle);
      if (!Utils.verifyId(idVehicle)) return Utils.Message(true, 500, "Error");
      const send = await VehiclesFetching.deleteApiLocalVehicle(idVehicle);
      return send;
    } catch (error) {
      return Utils.Message(true, 500, "Error");
    }
  }

  static viewGetDataToForm(data = null) {
    const valuesForm = {
      plate: data?.plate || "",
      id_type_vehicle: data?.id_type_vehicle || "",
      brand: data?.brand || "",
      model_car: data?.model_car || "",
      description: data?.description || "",
    };
    return valuesForm;
  }
}
