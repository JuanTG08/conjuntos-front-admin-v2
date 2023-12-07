import { UserRolesIdRUDRouter } from "@/routes/user_roles.router";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default function handler(req, res) {
  new UserRolesIdRUDRouter(req, res);
}
