import { UserToRegisterIdRUDRouter } from "@/routes/user_to_register.router";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default function handler(req, res) {
  new UserToRegisterIdRUDRouter(req, res);
}
