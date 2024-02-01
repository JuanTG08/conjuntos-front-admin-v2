import { NavBarIDRouter } from "@/routes/nav_bar.router";

export const config = {
  api: {
    externalResolver: true,
  },
};
export default function handler(req, res) {
  new NavBarIDRouter(req, res);
}
