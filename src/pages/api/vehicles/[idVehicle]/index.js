import { VehiclesIDRouter } from "@/routes/vehicles.router";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default function handler(req, res) {
  new VehiclesIDRouter(req, res);
}
