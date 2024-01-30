import { NavBarRouter } from "@/routes/nav_bar.router";

export const config = {
  api: {
    externalResolver: true,
  },
};
export default function handler(req, res) {
  new NavBarRouter(req, res);
}
