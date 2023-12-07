import { UserToRegisterController } from "@/controller/user_to_register.controller";
import { RoutingClass } from "@/lib/Routing";

export class UserToRegisterIdRUDRouter extends RoutingClass {
  constructor(req, res) {
    super(req, res, {
      delete: UserToRegisterController.apiDelete,
    });
  }
}
