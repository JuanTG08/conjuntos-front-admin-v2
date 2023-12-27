import { MovingIdRouter } from "@/routes/moving.router";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default function handler(req, res) {
  new MovingIdRouter(req, res);
}