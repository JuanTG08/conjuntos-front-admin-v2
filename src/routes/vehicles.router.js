import { VehiclesController } from "@/controller/vehicles.controller";
import { RoutingClass } from "@/lib/Routing";

export class VehiclesRouter extends RoutingClass {
  constructor(req, res) {
    super(req, res, {
      get: VehiclesController.apiGetListVehicles,
      post: VehiclesController.apiPostVehicle,
    });
  }
}
export class VehiclesIDRouter extends RoutingClass {
  constructor(req, res) {
    super(req, res, {
      put: VehiclesController.apiPutVehicle,
      delete: VehiclesController.apiDeleteVehicle,
    });
  }
}
