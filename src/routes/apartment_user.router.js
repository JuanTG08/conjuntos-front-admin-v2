import { ApartmentUserController } from "@/controller/apartment_user.controller";
import { RoutingClass } from "@/lib/Routing";

export class ApartmentUserRouting extends RoutingClass {
  constructor(req, res) {
    super(req, res, {
      get: ApartmentUserController.apiGetListAll,
      post: ApartmentUserController.apiPostNew,
    });
  }
}

export class ApartmentUserRUDRouter extends RoutingClass {
  constructor(req, res) {
    super(req, res, {
      get: ApartmentUserController.apiGetOne,
    });
  }
}
