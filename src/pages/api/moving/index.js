import { MovingRouter } from "@/routes/moving.router";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default function handler(req, res) {
  new MovingRouter(req, res);
}