import { PQRSFetching } from "@/fetching/pqrs.fetch";
import Utils from "@/helpers/helpers";
import { PQRSModel } from "@/model/PQRS.model";
import { env } from "../../next.config";

export class PQRSController {
  static async apiSSRGetDataToForm(cookie) {
    try {
      const response = await PQRSFetching.getApiPrincipalDataToForm(cookie);
      return response;
    } catch (error) {
      return Utils.Message(true, 500, "Error");
    }
  }

  static async apiSubmitNew(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      const modelPQRS = new PQRSModel(req.body);
      const verifyData = await modelPQRS.verifyData([
        modelPQRS.VAR_ID_APARTMENT,
        modelPQRS.VAR_ID_USER_ROLE,
        modelPQRS.VAR_TRACKING_NUMBER,
        modelPQRS.VAR_DESCRIPTION,
        modelPQRS.VAR_ID_STATUS,
        modelPQRS.VAR_CREATED_AT,
        modelPQRS.VAR_UPDATED_AT,
      ]);
      if (!verifyData)
        return res.json(Utils.Message(true, 400, "Error en los datos"));
      const response = await PQRSFetching.postApiPrincipalNew(
        cookie,
        modelPQRS.getAll
      );
      return res.json(response);
    } catch (error) {
      return res.json(Utils.Message(true, 500, "Error"));
    }
  }

  static async viewSubmitNew(data) {
    try {
      const modelPQRS = new PQRSModel(data);
      const verifyData = await modelPQRS.verifyData([
        modelPQRS.VAR_ID_APARTMENT,
        modelPQRS.VAR_ID_USER_ROLE,
        modelPQRS.VAR_TRACKING_NUMBER,
        modelPQRS.VAR_DESCRIPTION,
        modelPQRS.VAR_ID_STATUS,
        modelPQRS.VAR_CREATED_AT,
        modelPQRS.VAR_UPDATED_AT,
      ]);
      if (!verifyData) return Utils.Message(true, 400, "Error en los datos");
      const response = await PQRSFetching.postApiLocalSubmitNew(
        modelPQRS.getAll
      );
      return response;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Error");
    }
  }

  static async apiSSRGetListPQRSToApartmentAndUser(cookie) {
    try {
      const send = await PQRSFetching.getApiPrincipalListPQRSToApartmentAndUser(
        cookie
      );
      return send;
    } catch (error) {
      return Utils.Message(true, 500, "Error");
    }
  }

  static async apiSSRGetOnePQRS(cookie, idPQRS) {
    try {
      idPQRS = parseInt(idPQRS);
      if (!Utils.verifyId(idPQRS)) return Utils.Message(true, 400, "Error");
      const send = await PQRSFetching.getApiPrincipalOnePQRSToThread(
        cookie,
        idPQRS
      );
      return send;
    } catch (error) {
      return Utils.Message(true, 500, "Error");
    }
  }

  static async apiPostSetResponse(req, res) {
    try {
    } catch (error) {}
  }

  static viewGetDataToForm(data = null) {
    const valuesForm = {
      id_type_request: data?.id_type_request || "",
      id_category_request: data?.id_category_request || "",
      id_priority: data?.id_priority || "",
      title: data?.title || "",
      description: data?.description || "",
    };
    return valuesForm;
  }
}
