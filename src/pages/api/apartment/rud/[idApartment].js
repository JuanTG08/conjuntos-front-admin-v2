import { ApartmentIdRUDRouter } from "@/routes/apartment.router";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default function handler(req, res) {
  new ApartmentIdRUDRouter(req, res);
}