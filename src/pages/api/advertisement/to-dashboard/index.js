import { AdvertisementToDashboardRouter } from "@/routes/advertisement.router";

export const config = {
  api: {
    externalResolver: true,
  },
};
export default function handler(req, res) {
  new AdvertisementToDashboardRouter(req, res);
}
