import { CallController } from "@/controller/call.controller";
import { RoutingClass } from "@/lib/Routing";

export class CallRouter extends RoutingClass {
  constructor(req, res) {
    super(req, res, {
      get: CallController.apiExecuteCall,
    });
  }
}
