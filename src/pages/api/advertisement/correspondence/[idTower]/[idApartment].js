import { AdvertisementToCorrespondenceRouter } from "@/routes/advertisement.router";

export const config = {
  api: {
    externalResolver: true,
  },
};
export default function handler(req, res) {
  new AdvertisementToCorrespondenceRouter(req, res);
}
