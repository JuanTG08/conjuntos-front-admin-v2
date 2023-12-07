import { AdvertisementToCategory } from "@/routes/advertisement.router";

export const config = {
  api: {
    externalResolver: true,
  },
};
export default function handler(req, res) {
  new AdvertisementToCategory(req, res);
}
