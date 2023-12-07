import { VehiclesRouter } from "@/routes/vehicles.router";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default function handler(req, res) {
  new VehiclesRouter(req, res);
}
