import { UserController } from "@/controller/user.controller";
import { RoutingClass } from "@/lib/Routing";

export class UserRouter extends RoutingClass {
  constructor(req, res) {
    super(req, res, {
      get: UserController.apiGetUserInfo,
      put: UserController.apiPutEditUserProfile,
    });
  }
}
