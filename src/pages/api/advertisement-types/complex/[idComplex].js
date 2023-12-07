import { AdvertisementTypesByComplexRouter } from "@/routes/advertisement-types.router";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default function handler(req, res) {
  new AdvertisementTypesByComplexRouter(req, res);
}