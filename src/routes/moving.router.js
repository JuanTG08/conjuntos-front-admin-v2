import { MovingController } from "@/controller/moving.controller";
import { RoutingClass } from "@/lib/Routing";

export class MovingRouter extends RoutingClass {
  constructor(req, res) {
    super(req, res, {
      post: MovingController.apiPostCreate,
    });
  }
}

export class MovingIdRouter extends RoutingClass {
  constructor(req, res) {
    super(req, res, {
      put: MovingController.apiPutSetResponseToMoving,
    });
  }
}
