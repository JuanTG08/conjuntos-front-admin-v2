import { TowerController } from "@/controller/tower.controller";
import { RoutingClass } from "@/lib/Routing";

export class TowerListAllRouter extends RoutingClass {
  constructor(req, res) {
    super(req, res, {
      post: TowerController.apiPostNew,
    });
  }
}

export class TowerIdRUDRouter extends RoutingClass {
  constructor(req, res) {
    super(req, res, {
      get: TowerController.apiGetOne,
      put: TowerController.apiPutEdit,
      delete: TowerController.apiDelete,
    })
  }
}