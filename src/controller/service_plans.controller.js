import { ServicePlansFetching } from "@/fetching/service_plans.fetch";
import Utils from "@/helpers/helpers";
import { ServiceAndPlanModel } from "@/model/ServiceAndPlan.model";
import { env } from "../../next.config";

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
}
