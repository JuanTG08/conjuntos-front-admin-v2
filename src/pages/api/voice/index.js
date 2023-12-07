import { VoiceRouter } from "@/routes/voices.router";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default function handler(req, res) {
  new VoiceRouter(req, res);
}
