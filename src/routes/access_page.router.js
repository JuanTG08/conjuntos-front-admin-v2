import { AccessPageController } from "@/controller/access_page.controller";
import { RoutingClass } from "@/lib/Routing";

export class AccessPageMFSRouter extends RoutingClass {
  constructor(req, res) {
    super(req, res, {
      get: AccessPageController.apiGetListMFS,
    });
  }
}

export class AccessPageRouter extends RoutingClass {
  constructor(req, res) {
    super(req, res, {
      get: AccessPageController.apiGetOne,
      post: AccessPageController.apiPostNew,
      put: AccessPageController.apiPutEdit,
      delete: AccessPageController.apiDelete,
    });
  }
}