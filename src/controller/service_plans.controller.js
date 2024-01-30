import { ServicePlansFetching } from "@/fetching/service_plans.fetch";
import Utils from "@/helpers/helpers";

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
}
