import { AdvertisementController } from "@/controller/advertisement.controller";
import { RoutingClass } from "@/lib/Routing";

export class AdvertisementByComplexRouter extends RoutingClass {
  constructor(req, res) {
    super(req, res, {
      get: AdvertisementController.apiListByComplex,
      post: AdvertisementController.apiPostNew,
    });
  }
}

export class AdvertisementIdRouter extends RoutingClass {
  constructor(req, res) {
    super(req, res, {
      get: AdvertisementController.apiGetOneById,
      put: AdvertisementController.apiPutEdit,
      delete: AdvertisementController.apiDelete,
    });
  }
}

export class AdvertisementToCategory extends RoutingClass {
  constructor(req, res) {
    super(req, res, {
      get: AdvertisementController.apiListAdvertisementCategory,
    });
  }
}

export class AdvertisementToCorrespondenceRouter extends RoutingClass {
  constructor(req, res) {
    super(req, res, {
      get: AdvertisementController.apiGetListCorrespondences,
    });
  }
}

export class AdvertisementToDashboardRouter extends RoutingClass {
  constructor(req, res) {
    super(req, res, {
      get: AdvertisementController.apiGetListAdvertisementToDashboard,
    });
  }
}
