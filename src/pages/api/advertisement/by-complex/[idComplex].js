import { AdvertisementByComplexRouterGet } from "@/routes/advertisement.router";
import { createRouter } from "next-connect";
import multer from "multer";
import Utils from "@/helpers/helpers";
import { AdvertisementModel } from "@/model/Advertisement.model";
import { CONST_TYPE_ADVERTISEMENT } from "@/constants/advertisement_types.constant";
import { AdvertisementFetching } from "@/fetching/advertisement.fetch";
import { FilesController } from "@/controller/files.controller";
import { AdvertisementController } from "@/controller/advertisement.controller";
import { CONST_SYSTEM_NOT_PARAM_VIEW } from "@/constants/system.constant";
import { TokenUtils } from "@/utils/token.utils";

const apiRoute = createRouter();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 500 * 1024 * 1024,
  },
});

apiRoute.use(upload.single("file")); // attribute name you are sending the file by

apiRoute.get(async (req, res) => {
  new AdvertisementByComplexRouterGet(req, res);
});
apiRoute.post(async (req, res) => {
  try {
    const cookie = TokenUtils.destructureAllCookiesClient({ req });
    let idComplex = parseInt(req.query?.idComplex);
    if (
      !Utils.verifyId(idComplex) &&
      req.query?.idComplex != CONST_SYSTEM_NOT_PARAM_VIEW
    )
      return res.json(Utils.Message(true, 500, "Id del Conjunto no valido"));
    idComplex = Utils.verifyId(idComplex)
      ? idComplex
      : CONST_SYSTEM_NOT_PARAM_VIEW;
    const advModel = new AdvertisementModel(JSON.parse(req.body?.data));
    advModel.id_complex = idComplex;
    const verifyData = advModel.verifyData([
      advModel.VAR_ID_ADVERTISEMENT,
      advModel.VAR_STATUS_ADV,
      advModel.VAR_TRANSMITTER,
      advModel.VAR_COMPLEX_IDS,
      advModel.VAR_TOWERS_IDS,
      advModel.VAR_APARTMENTS_IDS,
      advModel.VAR_USERS_IDS,
      advModel.VAR_ID_APARTMENT,
      advModel.VAR_MINIATURE,
      advModel.VAR_DATE_END,
    ]);
    if (verifyData !== true)
      return res.json(Utils.Message(true, 500, "Datos erróneos", verifyData));

    // Validamos los datos de la segmentación
    const dataArraysIds = {};
    const dataVerifyArrays = {
      complex_ids: Utils.verifyArrayNumber(advModel.complex_ids),
      towers_ids: Utils.verifyArrayNumber(advModel.towers_ids),
      apartments_ids: Utils.verifyArrayNumber(advModel.apartments_ids),
      users_ids: Utils.verifyArrayNumber(advModel.users_ids),
    };
    switch (advModel.status_type) {
      case CONST_TYPE_ADVERTISEMENT.COMPLEX.id:
        // Validamos los datos del complex
        if (!dataVerifyArrays.complex_ids)
          return res.json(
            Utils.Message(
              false,
              0,
              "Datos erróneos, no se obtuvieron los IDs de los conjuntos"
            )
          );
        dataArraysIds.complex_ids = advModel.complex_ids;
        break;
      case CONST_TYPE_ADVERTISEMENT.TOWERS.id:
        // Validamos los datos de las torres
        if (!dataVerifyArrays.towers_ids)
          return res.json(
            Utils.Message(
              false,
              0,
              "Datos erróneos, no se obtuvieron los IDs de las torres"
            )
          );
        dataArraysIds.towers_ids = advModel.towers_ids;
        break;
      case CONST_TYPE_ADVERTISEMENT.APARTMENT.id:
        // Validamos los datos de la unidad
        if (!dataVerifyArrays.apartments_ids)
          return res.json(
            Utils.Message(
              false,
              0,
              "Datos erróneos, no se obtuvieron los IDs de las unidades"
            )
          );
        dataArraysIds.apartments_ids = advModel.apartments_ids;
        break;
      case CONST_TYPE_ADVERTISEMENT.USERS.id:
        // Validamos los datos del usuario
        if (
          !Utils.verifyId(advModel.idApartment) ||
          !dataVerifyArrays.users_ids
        )
          return res.json(
            Utils.Message(
              false,
              0,
              "Datos erróneos, no se obtuvieron los IDs de los Usuarios"
            )
          );
        dataArraysIds.idApartment = advModel.idApartment;
        dataArraysIds.users_ids = advModel.users_ids;
        break;
      default:
        break;
    }
    // Validamos la existencia del "category_Adv"
    if (!Utils.verifyId(advModel.category_adv))
      return res.json(Utils.Message(false, 0, "Datos erróneos, sin categoría"));
    // Estructuramos los datos para guardar el anuncio
    const dataSendAdvertisement = {
      id_complex: idComplex,
      title: advModel.title,
      description: advModel.description,
      miniature: false,
      status_adv: advModel.status_adv || CONST_ADVERTISEMENT_STATUS.ACTIVE.id,
      status_type: advModel.status_type,
      category_adv: advModel.category_adv,
    };
    const image = req?.file; // Obtenemos la imagen
    if (image) {
      if (!image.mimetype.startsWith("image/"))
        return res
          .status(400)
          .json(Utils.Message(true, 400, "Archivo inválido"));
      dataSendAdvertisement.miniature = true;
    }
    const sendAdvertisement = await AdvertisementFetching.postApiPrincipalNew(
      dataSendAdvertisement,
      cookie
    );
    if (sendAdvertisement.error || sendAdvertisement.statusCode != 200)
      return res.json(sendAdvertisement);
    // Guardamos la imagen
    if (image && sendAdvertisement.payload?.management_files?.name_file)
      FilesController.apiAsyncSaveImage(
        image,
        sendAdvertisement.payload?.management_files?.name_file,
        cookie
      );
    // Guardamos los datos de la segmentación
    AdvertisementController.apiAsyncSegmentationAndNotify(
      dataArraysIds,
      sendAdvertisement.payload.id_advertisement,
      cookie
    );
    return res.json(Utils.Message(false, 200, "Ok"));
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
