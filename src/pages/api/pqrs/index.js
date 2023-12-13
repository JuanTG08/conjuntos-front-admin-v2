import { PQRSRouter } from "@/routes/pqrs.router";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default function handler(req, res) {
  new PQRSRouter(req, res);
}
