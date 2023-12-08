import { PetsController } from "@/controller/pets.controller";
import { RoutingClass } from "@/lib/Routing";

export class PetRouter extends RoutingClass {
  constructor(req, res) {
    super(req, res, {
      post: PetsController.apiSubmitNew,
    });
  }
}

export class PetIDRouter extends RoutingClass {
  constructor(req, res) {
    super(req, res, {
      put: PetsController.apiUpdatePet,
      delete: PetsController.apiDeletePet,
    });
  }
}
