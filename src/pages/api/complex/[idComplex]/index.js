import { ComplexIdRouter } from "@/routes/complex.router";

export const config = {
  api: {
    externalResolver: true,
  },
}

export default function handler(req, res) {
  new ComplexIdRouter(req, res);
}