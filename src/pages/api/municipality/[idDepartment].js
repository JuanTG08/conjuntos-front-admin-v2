import { MunicipalityRouter } from "@/routes/municipality.router";

export const config = {
  api: {
    externalResolver: true,
  },
};
export default function handler(req, res) {
  new MunicipalityRouter(req, res);
}
