import { ApartmentUserRouting } from "@/routes/apartment_user.router";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default function handler(req, res) {
  new ApartmentUserRouting(req, res);
}
