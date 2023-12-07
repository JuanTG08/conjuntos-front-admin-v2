import { MunicipalityController } from "@/controller/municipality.controller";
import { RoutingClass } from "@/lib/Routing";

export class MunicipalityRouter extends RoutingClass {
  constructor(req, res) {
    super(req, res, {
      get: MunicipalityController.apiListAll,
    });
  }
}