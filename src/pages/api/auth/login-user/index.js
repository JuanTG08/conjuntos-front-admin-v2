import { AuthLoginRouter } from "@/routes/auth.router";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default function handler(req, res) {
  new AuthLoginRouter(req, res);
}
