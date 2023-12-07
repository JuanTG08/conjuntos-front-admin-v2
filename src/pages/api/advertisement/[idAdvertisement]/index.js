import { AdvertisementIdRouter } from "@/routes/advertisement.router";

export const config = {
  api: {
    externalResolver: true,
  },
};
export default function handler(req, res) {
  new AdvertisementIdRouter(req, res);
}
