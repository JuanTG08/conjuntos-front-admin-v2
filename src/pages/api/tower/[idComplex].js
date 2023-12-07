import { TowerListAllRouter } from "@/routes/tower.router";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default function handler(req, res) {
  new TowerListAllRouter(req, res);
}
