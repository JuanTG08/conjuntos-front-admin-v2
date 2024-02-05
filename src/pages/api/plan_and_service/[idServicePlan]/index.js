import { PlanAndServiceIdRouter } from "@/routes/plan_and_service.router";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default function handler(req, res) {
  new PlanAndServiceIdRouter(req, res);
}
