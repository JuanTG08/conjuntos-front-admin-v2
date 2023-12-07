import { AccessPersonController } from "@/controller/access_person.controller";
import { RoutingClass } from "@/lib/Routing";

export class AccessPersonRouter extends RoutingClass {
  constructor(req, res) {
    super(req, res, {
      get: AccessPersonController.apiGetAccessPersonToApartment,
      post: AccessPersonController.apiPostCreateAccessPerson,
    });
  }
}

export class AccessPersonIdRouter extends RoutingClass {
  constructor(req, res) {
    super(req, res, {
      get: AccessPersonController.apiGetOneAccessPerson,
      delete: AccessPersonController.apiDeleteAccessPerson,
    });
  }
}

export class AccessPersonToComplexRouter extends RoutingClass {
  constructor(req, res) {
    super(req, res, {
      get: AccessPersonController.apiGetListAccessPersonToComplex,
    });
  }
}
