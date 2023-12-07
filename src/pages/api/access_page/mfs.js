import { AccessPageMFSRouter } from "@/routes/access_page.router";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default function handler(req, res) {
  new AccessPageMFSRouter(req, res);
}
