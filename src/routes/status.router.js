import { StatusController } from "@/controller/status.controller";
import { RoutingClass } from "@/lib/Routing";

export class StatusRouter extends RoutingClass {
  constructor(req, res) {
    super(req, res, {
      get: StatusController.apiGetStatusSpecific,
    });
  }
}