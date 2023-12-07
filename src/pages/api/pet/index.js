import { PetRouter } from "@/routes/pet.router";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default function handler(req, res) {
  new PetRouter(req, res);
}
