import { UserRouter } from "@/routes/user.router";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default function handler(req, res) {
  new UserRouter(req, res);
}
