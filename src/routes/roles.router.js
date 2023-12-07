import { RolesController } from "@/controller/roles.controller";
import { RoutingClass } from "@/lib/Routing";

export class RolesRouter extends RoutingClass {
  constructor(req, res) {
    super(req, res, {
      get: RolesController.apiGetListAll,
    });
  }
}

export class RolesFindUpdDelRouter extends RoutingClass {
  constructor(req, res) {
    super(req, res, {
      get: RolesController.apiGetOne,
    });
  }
}
