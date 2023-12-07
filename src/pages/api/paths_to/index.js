import { PathsToRouter } from "@/routes/paths_to.router";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default function handler(req, res) {
  new PathsToRouter(req, res);
}
