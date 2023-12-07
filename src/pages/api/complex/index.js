import { ComplexRouter } from "@/routes/complex.router";

export const config = {
  api: {
    externalResolver: true,
  },
}

export default function handler(req, res) {
  new ComplexRouter(req, res);
}
