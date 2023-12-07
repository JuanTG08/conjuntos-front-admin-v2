import { AuthRegisterRouter } from "@/routes/auth.router";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default function handler(req, res) {
  new AuthRegisterRouter(req, res);
}