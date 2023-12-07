import { ApartmentRouting } from "@/routes/apartment.router";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default function handler(req, res) {
  new ApartmentRouting(req, res);
}
