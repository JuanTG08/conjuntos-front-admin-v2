import { AdvertisementTypesByComplexController } from "@/controller/advertisement_types.controller";
import { RoutingClass } from "@/lib/Routing";

export class AdvertisementTypesByComplexRouter extends RoutingClass {
  constructor(req, res) {
    super(req, res, {
      get: AdvertisementTypesByComplexController.apiListWithComplex,
    });
  }
}
