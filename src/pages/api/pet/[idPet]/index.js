import { PetIDRouter } from "@/routes/pet.router";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default function handler(req, res) {
  new PetIDRouter(req, res);
}
