import { TypeVehicleFetching } from "@/fetching/type_vehicle.fetch";
import Utils from "@/helpers/helpers";

export class TypeVehicleController {
  static async apiSSRGetListTypesVehicles(cookie) {
    try {
      const response = await TypeVehicleFetching.getApiPrincipalListTypes(
        cookie
      );
      return response;
    } catch (error) {
      return Utils.Message(true, 500, "Error al generar esta acción");
    }
  }
}
