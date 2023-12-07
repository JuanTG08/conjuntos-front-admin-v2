import { FileFetching, URL_API_PRINCIPAL_IMAGES } from "@/fetching/file.fetch";
import Utils from "@/helpers/helpers";
import sharp from "sharp";
import { env } from "../../next.config";
import fetch from "node-fetch";
import path from "path";
import fs from "fs";

export class FilesController {
  static async apiFileImageSave(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      const image = req?.file;
      if (!image || !image.mimetype.startsWith("image/"))
        return res
          .status(400)
          .json(Utils.Message(true, 400, "Archivo inválido"));
      let imageBuffer = image.buffer;
      const targetSizeKB = 50; // Tamaño máximo deseado en KB
      let quality = 100; // Calidad inicial al 100%
      while (imageBuffer.length > targetSizeKB * 1000 && quality > 10) {
        // Redefine la calidad para reducir el tamaño de archivo
        quality -= 10;

        // Redimensiona la imagen y ajusta la calidad
        const { width, height } = await sharp(imageBuffer).metadata();
        const newWidth = Math.round((width * quality) / 100);
        const newHeight = Math.round((height * quality) / 100);
        const processedImageBuffer = await sharp(imageBuffer)
          .resize(newWidth, newHeight)
          .jpeg({ quality })
          .toBuffer();

        // Actualiza el búfer de imagen original
        imageBuffer = processedImageBuffer;
      }
      const formImageData = new FormData();
      const imageBlob = new Blob([imageBuffer], { type: "image/jpeg" });
      formImageData.append("file", imageBlob, "bufferImageReducer.jpeg");
      const sendImage = await FileFetching.setFile(formImageData, cookie);
      return res.json(sendImage);
    } catch (error) {
      console.log(error);
      return res.json(Utils.Message(true, 500, "Server Error"));
    }
  }

  static async apiGetFileImage(req, res) {
    const defaultImagePath = path.join(
      process.cwd(),
      "public/images/notFound.png"
    );
    try {
      const allowedExtension = ".jpeg";
      const nameImage = req.query?.nameFile;
      if (!nameImage || nameImage.endsWith(allowedExtension) === false)
        return res.status(200).json(Utils.Message(true, 200, "Error"));
      const getImage = await fetch(URL_API_PRINCIPAL_IMAGES + nameImage);
      if (getImage.status !== 200) {
        throw new Error("No se pudo obtener la imagen");
      }
      const imageBuffer = await getImage.buffer();
      // Configura el encabezado de respuesta para la imagen
      res.setHeader("Content-Type", "image/jpeg");
      return res.status(200).end(imageBuffer);
    } catch (error) {
      console.log(error);
      const defaultImageBuffer = fs.readFileSync(defaultImagePath);
      res.setHeader("Content-Type", "image/png");
      return res.status(200).end(defaultImageBuffer);
    }
  }
}
