import { CallCredentialsRouter } from "@/routes/call.router";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default function handler(req, res) {
  new CallCredentialsRouter(req, res);
}
