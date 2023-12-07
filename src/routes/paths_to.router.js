import { PathsToController } from "@/controller/paths_to.controller";
import { RoutingClass } from "@/lib/Routing";

export class PathsToRouter extends RoutingClass {
  constructor(req, res) {
    super(req, res, {
      post: PathsToController.apiPostSetPathsTo,
    });
  }
}
