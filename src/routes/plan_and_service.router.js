import { ServicePlansController } from "@/controller/service_plans.controller";
import { RoutingClass } from "@/lib/Routing";

export class PlanAndServiceRouter extends RoutingClass {
  constructor(req, res) {
    super(req, res, {
      post: ServicePlansController.apiPostCreateNew,
    });
  }
}

export class PlanAndServiceIdRouter extends RoutingClass {
  constructor(req, res) {
    super(req, res, {
      put: ServicePlansController.apiPutModify,
    });
  }
}
