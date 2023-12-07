import { CorrespondenceController } from "@/controller/correspondence.controller";
import { RoutingClass } from "@/lib/Routing";

export class CorrespondenceRouter extends RoutingClass {
  constructor(req, res) {
    super(req, res, {
      post: CorrespondenceController.apiChangeCheckCorrespondence,
    });
  }
}
