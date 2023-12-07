import { AccessPersonIdRouter } from "@/routes/access-person.router";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default function handler(req, res) {
  new AccessPersonIdRouter(req, res);
}
