import { RolesFindUpdDelRouter } from "@/routes/roles.router";

export const config = {
  api: {
    externalResolver: true,
  },
};
export default function handler(req, res) {
  new RolesFindUpdDelRouter(req, res);
}
