import { AuthLogoutRouter } from "@/routes/auth.router";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default function handler(req, res) {
  new AuthLogoutRouter(req, res);
}
