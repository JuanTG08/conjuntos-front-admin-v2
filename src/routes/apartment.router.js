import { ApartmentComplexController } from "@/controller/apartment.controller";
import { RoutingClass } from "@/lib/Routing";

export class ApartmentRouting extends RoutingClass {
  constructor(req, res) {
    super(req, res, {
      get: ApartmentComplexController.apiGetListAll,
      post: ApartmentComplexController.apiPostNew,
    });
  }
}

export class ApartmentIdRUDRouter extends RoutingClass {
  constructor(req, res) {
    super(req, res, {
      get: ApartmentComplexController.apiGetOne,
      put: ApartmentComplexController.apiPutEdit,
      delete: ApartmentComplexController.apiDelete,
    });
  }
}

export class ApartmentIdUserCallRouter extends RoutingClass {
  constructor(req, res) {
    super(req, res, {
      get: ApartmentComplexController.apiGetListUserToApartmentCall,
    });
  }
}
