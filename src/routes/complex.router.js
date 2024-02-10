import { ComplexController } from "@/controller/complex.controller";
import { RoutingClass } from "@/lib/Routing";

export class ComplexRouter extends RoutingClass {
  constructor(req, res) {
    super(req, res, {
      post: ComplexController.apiPostNew,
      put: ComplexController.apiPutEditToSettingComplex,
    });
  }
}

export class ComplexIdRouter extends RoutingClass {
  constructor(req, res) {
    super(req, res, {
      get: ComplexController.apiGetOne,
      put: ComplexController.apiPutEdit,
      delete: ComplexController.apiDelete,
    });
  }
}

export class ComplexUserAdminRouter extends RoutingClass {
  constructor(req, res) {
    super(req, res, {
      get: ComplexController.apiListUserAdmin,
      post: ComplexController.apiSetUserAdmin,
    });
  }
}
