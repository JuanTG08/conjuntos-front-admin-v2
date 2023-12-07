import { CookiesRouter } from "@/routes/cookies.router";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default function handler(req, res) {
  new CookiesRouter(req, res);
}
