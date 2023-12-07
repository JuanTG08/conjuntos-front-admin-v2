import { ApartmentIdUserCallRouter } from "@/routes/apartment.router";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default function handler(req, res) {
  new ApartmentIdUserCallRouter(req, res);
}
