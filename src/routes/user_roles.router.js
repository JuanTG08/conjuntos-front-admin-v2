import { UserRolesController } from "@/controller/user_roles.controller";
import { RoutingClass } from "@/lib/Routing";

export class UserRolesIdRUDRouter extends RoutingClass {
  constructor(req, res) {
    super(req, res, {
      delete: UserRolesController.apiDelete,
    });
  }
}
