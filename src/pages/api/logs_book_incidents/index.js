import { FilesController } from "@/controller/files.controller";
import { LogsBookIncidentsFetching } from "@/fetching/logs_book_incidents.fetch";
import Utils from "@/helpers/helpers";
import { TokenUtils } from "@/utils/token.utils";
import multer from "multer";
import { createRouter } from "next-connect";

const apiRoute = createRouter();

const storage = multer.memoryStorage();
const upload = multer({ storage });

apiRoute.use(upload.single("file")); // attribute name you are sending the file by
apiRoute.post(async (req, res) => {
  try {
    const cookie = TokenUtils.destructureAllCookiesClient({ req });
    if (!req?.body?.data)
      return res.json(Utils.Message(true, 400, "Datos faltantes"));
    const { id_severity, description, location } = JSON.parse(req?.body?.data);
    const data = {
      id_severity: Utils.isNumeric(id_severity),
      description: Utils._length(description, 700, 1),
      location: Utils._length(location, 255, 1),
      id_image_attachment: null,
    };
    const image = req?.file;
    if (image) {
      // Obtener la extensión del archivo a través del tipo MIME
      if (!image.mimetype.startsWith("image/"))
        return res
          .status(400)
          .json(Utils.Message(true, 400, "Imagen no válida"));
      data.id_image_attachment = true;
    }
    const send = await LogsBookIncidentsFetching.postApiPrincipalCreateIncident(
      data,
      cookie
    );
    if (send.error || send.statusCode != 200) return res.json(send);
    // Guardamos la imagen
    if (image && send.payload?.management_files?.name_file)
      FilesController.apiAsyncSaveImage(
        image,
        send.payload?.management_files?.name_file,
        cookie
      );
    return res.json(Utils.Message(false, 200, "Se guardó correctamente"));
  } catch (error) {
    console.log(error);
    return res.json(Utils.Message(true, 500, "Error al procesar"));
  }
});

export default apiRoute.handler();
export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
