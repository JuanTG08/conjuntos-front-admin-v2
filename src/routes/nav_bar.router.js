import { NavBarController } from "@/controller/nav_bar.controller";
import { RoutingClass } from "@/lib/Routing";

export class NavBarRouter extends RoutingClass {
  constructor(req, res) {
    super(req, res, {
      post: NavBarController.apiPostNewNavBar,
    });
  }
}
