import { PetsController } from "@/controller/pets.controller";
import { RoutingClass } from "@/lib/Routing";

export class PetRouter extends RoutingClass {
  constructor(req, res) {
    super(req, res, {
      post: PetsController.apiSubmitNew,
    });
  }
}
