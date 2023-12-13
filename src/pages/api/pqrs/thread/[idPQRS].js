import { PQRSThreadIdRouter } from "@/routes/pqrs.router";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default function handler(req, res) {
  new PQRSThreadIdRouter(req, res);
}
