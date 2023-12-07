import { StatusRouter } from "@/routes/status.router";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default function handler(req, res) {
  new StatusRouter(req, res);
}
