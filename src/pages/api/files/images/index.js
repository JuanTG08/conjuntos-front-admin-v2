import { createRouter } from "next-connect";
import multer from "multer";
import { FilesImagesRouter } from "@/routes/files.router";

const apiRoute = createRouter();

const storage = multer.memoryStorage();
const upload = multer({ storage });

apiRoute.use(upload.single("file")); // attribute name you are sending the file by

apiRoute.post(async (req, res) => {
  new FilesImagesRouter(req, res);
});

export default apiRoute.handler();

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
