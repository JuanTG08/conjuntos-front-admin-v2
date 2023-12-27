import { MovingFetching } from "@/fetching/moving.fecth";
import Utils from "@/helpers/helpers";
import { MovingModel } from "@/model/moving.model";
import { env } from "../../next.config";

export class MovingController {
  static async apiPostCreate(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      const modelMoving = new MovingModel(req.body);
      const verifyData = modelMoving.verifyData([
        modelMoving.VAR_ID_MOVING,
        modelMoving.VAR_ID_APARTMENT,
        modelMoving.VAR_ID_USER_ROLE,
        modelMoving.VAR_ID_STATUS,
        modelMoving.VAR_CREATED_AT,
        modelMoving.VAR_UPDATED_AT,
      ]);
      if (!verifyData)
        return res.json(Utils.Message(true, 400, "Error en los datos"));
      const response = await MovingFetching.postApiPrincipalNew(
        cookie,
        modelMoving.getAll
      );
      return res.json(response);
    } catch (error) {
      return res.json(Utils.Message(true, 500, "Error"));
    }
  }

  static async apiSSRListMovingToApartmentAndUser(cookie) {
    try {
      const list =
        await MovingFetching.getApiPrincipalListMovingToApartmentAndUser(
          cookie
        );
      return list;
    } catch (error) {
      return Utils.Message(true, 500, "Error");
    }
  }

  static async apiSSRGetOneMoving(cookie, idMoving) {
    try {
      idMoving = parseInt(idMoving);
      if (!Utils.verifyId(idMoving))
        return Utils.Message(true, 400, "Error en los datos");
      const getOne = await MovingFetching.getApiPrincipalGetOneMoving(
        cookie,
        idMoving
      );
      return getOne;
    } catch (error) {
      return Utils.Message(true, 500, "Error");
    }
  }

  static async apiSSRGetOneMovingByOwner(cookie, idMoving) {
    try {
      idMoving = parseInt(idMoving);
      if (!Utils.verifyId(idMoving))
        return Utils.Message(true, 400, "Error en los datos");
      const getOne = await MovingFetching.getApiPrincipalGetOneMovingByOwner(
        cookie,
        idMoving
      );
      return getOne;
    } catch (error) {
      return Utils.Message(true, 500, "Error");
    }
  }

  static async apiSSRListMovingByAdminComplex(cookie) {
    try {
      const list = await MovingFetching.getApiPrincipalListMovingToAdminComplex(
        cookie
      );
      return list;
    } catch (error) {
      return Utils.Message(true, 500, "Error");
    }
  }

  static async apiSSRGetOneMovingByAdminToComplex(cookie, idMoving) {
    try {
      idMoving = parseInt(idMoving);
      if (!Utils.verifyId(idMoving))
        return Utils.Message(true, 400, "Error en los datos");
      const getOne =
        await MovingFetching.getApiPrincipalGetOneMovingByAdminToComplex(
          cookie,
          idMoving
        );
      return getOne;
    } catch (error) {
      return Utils.Message(true, 500, "Error");
    }
  }

  static async apiSSRListMovingToComplexAndAuthorized(cookie) {
    try {
      const list =
        await MovingFetching.getApiPrincipalListMovingToComplexAndAuthorized(
          cookie
        );
      return list;
    } catch (error) {
      return Utils.Message(true, 500, "Error");
    }
  }

  static async viewPostCreate(data) {
    try {
      const modelMoving = new MovingModel(data);
      const verifyData = modelMoving.verifyData([
        modelMoving.VAR_ID_MOVING,
        modelMoving.VAR_ID_APARTMENT,
        modelMoving.VAR_ID_USER_ROLE,
        modelMoving.VAR_ID_STATUS,
        modelMoving.VAR_CREATED_AT,
        modelMoving.VAR_UPDATED_AT,
      ]);
      if (!verifyData) return Utils.Message(true, 400, "Error en los datos");
      const response = await MovingFetching.postApiLocalSubmitNew(
        modelMoving.getAll
      );
      return response;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Error");
    }
  }

  static async apiPutSetResponseToMoving(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      const data = {
        response: Utils._length(req.body?.response, 300, 1),
        id_status: Utils.isNumeric(req.body?.id_status),
      };
      const idMoving = Utils.isNumeric(req.query?.idMoving);
      const dataVerify = Utils.verifyDataObject(data);
      if (!dataVerify || !Utils.isNumeric(idMoving))
        return res.json(Utils.Message(true, 400, "Error en los datos"));
      const response = await MovingFetching.putApiPrincipalSetResponseToMoving(
        data,
        idMoving,
        cookie
      );
      return res.json(response);
    } catch (error) {
      return res.json(Utils.Message(true, 500, "Error"));
    }
  }

  static async viewPutSetResponseToMoving(data, idMoving) {
    try {
      const dataSend = {
        response: Utils._length(data.response, 300, 1),
        id_status: Utils.isNumeric(data.id_status),
      };
      const dataVerify = Utils.verifyDataObject(dataSend);
      if (!dataVerify || !Utils.isNumeric(idMoving))
        return Utils.Message(true, 400, "Error en los datos");
      const response = await MovingFetching.putApiLocalSetResponseToMoving(
        dataSend,
        idMoving
      );
      return response;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Error");
    }
  }

  static viewGetDataToForm(data = null) {
    const valuesForm = {
      description: data?.description || "",
      moving_date: data?.id_category_request || "",
    };
    return valuesForm;
  }
}
