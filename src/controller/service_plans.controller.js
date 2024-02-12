import { ServicePlansFetching } from "@/fetching/service_plans.fetch";
import Utils from "@/helpers/helpers";
import { ServiceAndPlanModel } from "@/model/ServiceAndPlan.model";
import { env } from "../../next.config";
import { ComplexPlanAndServiceModel } from "@/model/ComplexPlanAndService.model";

export class ServicePlansController {
  static async apiSSRGetListAll(token) {
    try {
      const getListAll = await ServicePlansFetching.getApiPrincipalListAll(
        token
      );
      return getListAll;
    } catch (error) {
      Utils.Message(true, 500, "Error al procesar");
    }
  }

  static async apiPostCreateNew(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      const modelServicePlan = new ServiceAndPlanModel(req.body);
      const verifyData = modelServicePlan.verifyData([
        modelServicePlan.VAR_ID_PLAN_AND_SERVICE,
        modelServicePlan.VAR_CREATEDAT,
      ]);
      if (!verifyData)
        return res.json(Utils.Message(true, 400, "Error en los datos"));
      const response = await ServicePlansFetching.postApiPrincipalCreateNew(
        modelServicePlan.getAll,
        cookie
      );
      return res.json(response);
    } catch (error) {
      return res.json(Utils.Message(true, 500, "Error al procesar"));
    }
  }

  static async viewPostCreateNew(data) {
    try {
      const modelServicePlan = new ServiceAndPlanModel(data);
      const verifyData = modelServicePlan.verifyData([
        modelServicePlan.VAR_ID_PLAN_AND_SERVICE,
        modelServicePlan.VAR_CREATEDAT,
      ]);
      if (!verifyData) return Utils.Message(true, 400, "Error en los datos");
      const response = await ServicePlansFetching.postApiLocalCreateNew(
        modelServicePlan.getAll
      );
      return response;
    } catch (error) {
      return Utils.Message(true, 500, "Error al procesar");
    }
  }

  static async apiSSRGetOne(idServicePlans, token) {
    try {
      idServicePlans = parseInt(idServicePlans);
      if (isNaN(idServicePlans))
        return Utils.Message(true, 400, "Error en los datos");
      const getOne = await ServicePlansFetching.getApiPrincipalOne(
        idServicePlans,
        token
      );
      return getOne;
    } catch (error) {
      return Utils.Message(true, 500, "Error al procesar");
    }
  }

  static async apiPutModify(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      const idServicePlan = parseInt(req.query.idServicePlan);
      if (isNaN(idServicePlan))
        return res.json(Utils.Message(true, 400, "Error en los datos"));
      const modelServicePlan = new ServiceAndPlanModel(req.body);
      const strObject = await Utils.structureObject(modelServicePlan.getAll);
      if (!strObject)
        return res.json(Utils.Message(true, 400, "Error en los datos"));
      const response = await ServicePlansFetching.putApiPrincipalModify(
        idServicePlan,
        modelServicePlan.getAll,
        cookie
      );
      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.json(Utils.Message(true, 500, "Error al procesar"));
    }
  }

  static async viewPutModify(idServicePlan, data) {
    try {
      idServicePlan = parseInt(idServicePlan);
      if (isNaN(idServicePlan))
        return Utils.Message(true, 400, "Error en los datos");
      const modelServicePlan = new ServiceAndPlanModel(data);
      const strObject = await Utils.structureObject(modelServicePlan.getAll);
      if (!strObject) return Utils.Message(true, 400, "Error en los datos");
      const response = await ServicePlansFetching.putApiLocalModify(
        idServicePlan,
        data
      );
      return response;
    } catch (error) {
      return Utils.Message(true, 500, "Error al procesar");
    }
  }

  static async apiSSRGetDataToSetComplex(token) {
    try {
      const getData =
        await ServicePlansFetching.getApiPrincipalDataToSetComplex(token);
      return getData;
    } catch (error) {
      return Utils.Message(true, 500, "Error al procesar");
    }
  }

  static async apiPostSetToComplex(req, res) {
    try {
      const modelServicePlan = new ComplexPlanAndServiceModel(req.body);
      const verifyData = modelServicePlan.verifyData([
        modelServicePlan.VAR_ID_RESIDENTIAL_PLAN_SERVICES,
      ]);
      if (!verifyData)
        return res.json(Utils.Message(true, 400, "Error en los datos"));
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      const response = await ServicePlansFetching.postApiPrincipalSetToComplex(
        modelServicePlan.getAll,
        cookie
      );
      return res.json(response);
    } catch (error) {
      return res.json(Utils.Message(true, 500, "Error al procesar"));
    }
  }

  static async viewPostSetToComplex(data) {
    try {
      const modelServicePlan = new ComplexPlanAndServiceModel(data);
      const verifyData = modelServicePlan.verifyData([
        modelServicePlan.VAR_ID_RESIDENTIAL_PLAN_SERVICES,
      ]);
      if (!verifyData) return Utils.Message(true, 400, "Error en los datos");
      const send = await ServicePlansFetching.postApiLocalSetToComplex(
        modelServicePlan.getAll
      );
      return send;
    } catch (error) {
      return Utils.Message(true, 500, "Error al procesar");
    }
  }
}
