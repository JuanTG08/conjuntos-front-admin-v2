import { PlanAndServiceRouter } from "@/routes/plan_and_service.router";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default function handler(req, res) {
  new PlanAndServiceRouter(req, res);
}
