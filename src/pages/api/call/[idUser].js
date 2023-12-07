import { CallRouter } from "@/routes/call.router";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default function handler(req, res) {
  new CallRouter(req, res);
}