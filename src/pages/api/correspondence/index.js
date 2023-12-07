import { CorrespondenceRouter } from "@/routes/correspondence.router";

export const config = {
  api: {
    externalResolver: true,
  },
};
export default function handler(req, res) {
  new CorrespondenceRouter(req, res);
}
