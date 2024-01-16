import { FileFetching, URL_API_PRINCIPAL_IMAGES } from "@/fetching/file.fetch";
import Utils from "@/helpers/helpers";
import fetch from "node-fetch";
import path from "path";
import fs from "fs";
import Jimp from "jimp";

export class FilesController {
  static async apiFileImageSave(req, res) {
    try {
      throw new Error("Error, funcionalidad deshabilitada");
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

  static async apiAsyncSaveImage(image, nameImage, cookie) {
    try {
      let imageSend;
      if (image.mimetype != Jimp.MIME_JPEG) {
        const convertToJPEG = await Jimp.read(image.buffer);
        const jpegBuffer = await convertToJPEG
          .quality(90)
          .getBufferAsync(Jimp.MIME_JPEG);
        imageSend = jpegBuffer;
      } else imageSend = image.buffer;
      const formImageData = new FormData();
      const imageBlob = new Blob([imageSend], { type: Jimp.MIME_JPEG });
      formImageData.append("file", imageBlob, nameImage);
      formImageData.append("fileName", nameImage);
      const saveImage =
        await FileFetching.postApiPrincipalSaveImageToAdvertisement(
          formImageData,
          nameImage,
          cookie
        );
      return saveImage;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Error al procesar");
    }
  }
}
