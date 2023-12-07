import { FilesGetImagesRouter } from "@/routes/files.router";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default function handler(req, res) {
  new FilesGetImagesRouter(req, res);
}
