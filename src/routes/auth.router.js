import { AuthController } from "@/controller/auth.controller";
import { UserController } from "@/controller/user.controller";
import { RoutingClass } from "@/lib/Routing";

export class AuthRegisterRouter extends RoutingClass {
  constructor(req, res) {
    super(req, res, {
      post: UserController.apiPostRegisterUser,
    });
  }
}

export class AuthLoginRouter extends RoutingClass {
  constructor(req, res) {
    super(req, res, {
      get: AuthController.apiIsLogIn,
    });
  }
}

export class AuthLogoutRouter extends RoutingClass {
  constructor(req, res) {
    super(req, res, {
      get: AuthController.apiSubmitLogoutUser,
    });
  }
}
