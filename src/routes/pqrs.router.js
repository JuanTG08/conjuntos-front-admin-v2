import { PQRSController } from "@/controller/pqrs.controller";
import { RoutingClass } from "@/lib/Routing";

export class PQRSRouter extends RoutingClass {
  constructor(req, res) {
    super(req, res, {
      post: PQRSController.apiSubmitNew,
    });
  }
}

export class PQRSThreadIdRouter extends RoutingClass {
  constructor(req, res) {
    super(req, res, {
      post: PQRSController.apiPostSetResponse,
    });
  }
}
