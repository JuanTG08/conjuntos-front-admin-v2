import { VoicesRouter } from "@/controller/voices.controller";
import { RoutingClass } from "@/lib/Routing";

export class VoiceRouter extends RoutingClass {
  constructor(req, res) {
    super(req, res, {
      post: VoicesRouter.voiceResponse,
    });
  }
}

export class VoiceStatusRouter extends RoutingClass {
  constructor(req, res) {
    super(req, res, {
      post: VoicesRouter.voiceStatus,
    });
  }
}
