import { CookiesController } from "@/controller/cookies.controller";
import { RoutingClass } from "@/lib/Routing";

export class CookiesRouter extends RoutingClass {
  constructor(req, res) {
    super(req, res, {
      get: CookiesController.apiGetAllCookies,
    });
  }
}
