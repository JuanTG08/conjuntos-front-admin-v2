import { RolesRouter } from "@/routes/roles.router";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default function handler(req, res) {
  new RolesRouter(req, res);
}
