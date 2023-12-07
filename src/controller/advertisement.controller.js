import { AdvertisementFetching } from "@/fetching/advertisement.fetch";
import Utils from "@/helpers/helpers";
import { env } from "../../next.config";
import { AdvertisementModel } from "@/model/Advertisement.model";
import { CONST_TYPE_ADVERTISEMENT } from "@/constants/advertisement_types.constant";
import { FileFetching } from "@/fetching/file.fetch";
import { SegmentationAdvertisementFetching } from "@/fetching/segmentation_advertisement.fetch";
import { CONST_SYSTEM_NOT_PARAM_VIEW } from "@/constants/system.constant";

export class AdvertisementController {
  static async apiListByComplex(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      const idComplex =
        req.query?.idComplex === CONST_SYSTEM_NOT_PARAM_VIEW
          ? CONST_SYSTEM_NOT_PARAM_VIEW
          : parseInt(req.query?.idComplex);
      if (
        !Utils.verifyId(idComplex) &&
        idComplex != CONST_SYSTEM_NOT_PARAM_VIEW
      )
        return res.json(Utils.Message(true, 500, "Datos erróneos"));
      const list = await AdvertisementFetching.getApiPrincipalListByComplex(
        idComplex,
        cookie
      );
      return res.json(list);
    } catch (error) {
      console.log(error);
      return res.json(Utils.Message(true, 500, "Error al procesar"));
    }
  }

  static async viewListByComplex(idComplex) {
    try {
      idComplex =
        idComplex === CONST_SYSTEM_NOT_PARAM_VIEW
          ? CONST_SYSTEM_NOT_PARAM_VIEW
          : parseInt(idComplex);
      if (
        !Utils.verifyId(idComplex) &&
        idComplex != CONST_SYSTEM_NOT_PARAM_VIEW
      )
        return Utils.Message(true, 500, "Datos erróneos");
      const list = await AdvertisementFetching.getApiLocalListByComplex(
        idComplex
      );
      return list;
    } catch (error) {
      return Utils.Message(true, 500, "Error");
    }
  }

  static async apiPostNew(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      let idComplex = parseInt(req.query?.idComplex);
      if (
        !Utils.verifyId(idComplex) &&
        req.query?.idComplex != CONST_SYSTEM_NOT_PARAM_VIEW
      )
        return res.json(Utils.Message(true, 500, "Datos erróneos"));
      idComplex = Utils.verifyId(idComplex)
        ? idComplex
        : CONST_SYSTEM_NOT_PARAM_VIEW;
      const advModel = new AdvertisementModel(req.body);
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
            return res.json(Utils.Message(false, 0, "Datos erróneos"));
          dataArraysIds.complex_ids = advModel.complex_ids;
          break;
        case CONST_TYPE_ADVERTISEMENT.TOWERS.id:
          // Validamos los datos de las torres
          if (!dataVerifyArrays.towers_ids)
            return res.json(Utils.Message(false, 0, "Datos erróneos"));
          dataArraysIds.towers_ids = advModel.towers_ids;
          break;
        case CONST_TYPE_ADVERTISEMENT.APARTMENT.id:
          // Validamos los datos del apartamento
          if (!dataVerifyArrays.apartments_ids)
            return res.json(Utils.Message(false, 0, "Datos erróneos"));
          dataArraysIds.apartments_ids = advModel.apartments_ids;
          break;
        case CONST_TYPE_ADVERTISEMENT.USERS.id:
          // Validamos los datos del usuario
          if (
            !Utils.verifyId(advModel.idApartment) ||
            !dataVerifyArrays.users_ids
          )
            return res.json(Utils.Message(false, 0, "Datos erróneos"));
          dataArraysIds.idApartment = advModel.idApartment;
          dataArraysIds.users_ids = advModel.users_ids;
          break;
        default:
          break;
      }
      // Validamos la existencia del "category_Adv"
      if (!Utils.verifyId(advModel.category_adv))
        return res.json(Utils.Message(false, 0, "Datos erróneos"));
      // Estructuramos los datos para guardar el anuncio
      const dataSendAdvertisement = {
        id_complex: idComplex,
        title: advModel.title,
        description: advModel.description,
        miniature: advModel.miniature,
        status_adv: advModel.status_adv || CONST_ADVERTISEMENT_STATUS.ACTIVE.id,
        status_type: advModel.status_type,
        category_adv: advModel.category_adv,
      };
      const sendAdvertisement = await AdvertisementFetching.postApiPrincipalNew(
        dataSendAdvertisement,
        cookie
      );
      if (sendAdvertisement.error || sendAdvertisement.statusCode != 200)
        return res.json(sendAdvertisement);
      // Guardamos los datos de la segmentación
      const sendSegmentation =
        await SegmentationAdvertisementFetching.setApiPrincipalSegmentation(
          dataArraysIds,
          sendAdvertisement.payload.id_advertisement,
          cookie
        );
      if (sendSegmentation.error || sendSegmentation.statusCode != 200)
        return res.json(
          Utils.Message(
            false,
            200,
            "Anuncio creado, pero no se guardo sus elecciones"
          )
        );
      const sendAndNotify =
        await AdvertisementFetching.getApiPrincipalSendAndNotify(
          sendAdvertisement.payload.id_advertisement,
          cookie
        );
      return res.json(Utils.Message(false, 200, "Ok"));
    } catch (error) {
      console.log(error);
      return res.json(Utils.Message(true, 500, "Error al procesar"));
    }
  }

  static async viewSubmitNew(getData, image, idComplex, _idComplex = null) {
    try {
      idComplex =
        idComplex === CONST_SYSTEM_NOT_PARAM_VIEW
          ? CONST_SYSTEM_NOT_PARAM_VIEW
          : parseInt(idComplex);
      if (
        !Utils.verifyId(idComplex) &&
        idComplex != CONST_SYSTEM_NOT_PARAM_VIEW
      )
        return Utils.Message(true, 500, "Datos erróneos");
      const advModel = new AdvertisementModel(getData);
      advModel.id_complex = idComplex;
      const verifyData = advModel.verifyData([
        advModel.VAR_ID_ADVERTISEMENT,
        advModel.VAR_TRANSMITTER,
        advModel.VAR_COMPLEX_IDS,
        advModel.VAR_TOWERS_IDS,
        advModel.VAR_APARTMENTS_IDS,
        advModel.VAR_USERS_IDS,
        advModel.VAR_ID_APARTMENT,
        advModel.VAR_MINIATURE,
      ]);
      if (!verifyData)
        return Utils.Message(false, 0, "Campos Vacíos", verifyData);
      switch (advModel.status_type) {
        case CONST_TYPE_ADVERTISEMENT.COMPLEX.id:
          advModel.complex_ids =
            idComplex === CONST_SYSTEM_NOT_PARAM_VIEW
              ? [_idComplex]
              : [idComplex];
          break;
        case CONST_TYPE_ADVERTISEMENT.TOWERS.id:
          const extractIds = getData.arraysIdsTowers;
          if (!Utils.verifyArrayNumber(extractIds))
            return Utils.Message(false, 0, "Datos erróneos");
          advModel.towers_ids = extractIds;
          break;
        case CONST_TYPE_ADVERTISEMENT.APARTMENT.id:
          const extractIdsApartment = getData.arraysIdsApartments;
          if (!Utils.verifyArrayNumber(extractIdsApartment))
            return Utils.Message(false, 0, "Datos erróneos");
          advModel.apartments_ids = extractIdsApartment;
          break;
        case CONST_TYPE_ADVERTISEMENT.USERS.id:
          const extractIdsUser = getData.arraysIdsUsers;
          advModel.users_ids = extractIdsUser;
          advModel.idApartment = getData.type_apartment;
          break;
        default:
          break;
      }
      // Sí obtenemos una Imagen
      if (image) {
        // Enviamos la imagen para que se cree la miniatura de la misma
        const formData = new FormData();
        formData.append("file", image);
        // Obtenemos el ID de la miniatura
        const sendImage = await FileFetching.setLocalFile(formData);
        if (!sendImage.error && sendImage.statusCode === 200) {
          advModel.miniature = sendImage.payload.id_file;
        }
      } else {
        advModel.miniature = null;
      }
      // Enviamos los datos para crear un anuncio con sus respectiva segmentación
      const sendAdvertisement = await AdvertisementFetching.postApiLocalNew(
        advModel.getAll,
        idComplex
      );
      return sendAdvertisement;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Error al procesar");
    }
  }

  static async apiGetOneById(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      const idAdvertisement = parseInt(req.query.idAdvertisement);
      if (!Utils.verifyId(idAdvertisement))
        return res.json(Utils.Message(true, 500, "Datos erróneos"));
      const getAdvertisement =
        await AdvertisementFetching.getApiPrincipalFindOne(
          idAdvertisement,
          cookie
        );
      return res.json(getAdvertisement);
    } catch (error) {
      return res.json(Utils.Message(true, 500, "Error al procesar"));
    }
  }

  static async viewGetOneById(idAdvertisement) {
    try {
      idAdvertisement = parseInt(idAdvertisement);
      if (!Utils.verifyId(idAdvertisement))
        return Utils.Message(true, 500, "Datos erróneos");
      const getAdvertisement = await AdvertisementFetching.getApiLocalFindOne(
        idAdvertisement
      );
      if (getAdvertisement.error || getAdvertisement.statusCode !== 200)
        return getAdvertisement;
      const { status_type, segmentation_advertisement, id_complex } =
        getAdvertisement.payload;
      const arraysIds = {
        arraysIdsTowers: [],
        arraysIdsApartments: [],
        arraysIdsUsers: [],
      };
      segmentation_advertisement.map((segAdv) => {
        switch (status_type) {
          case CONST_TYPE_ADVERTISEMENT.TOWERS.id:
            arraysIds.arraysIdsTowers.push(segAdv.id_tower);
            break;
          case CONST_TYPE_ADVERTISEMENT.APARTMENT.id:
            if (!getAdvertisement.payload.type_tower_apart)
              getAdvertisement.payload.type_tower_apart = segAdv.id_tower;
            arraysIds.arraysIdsApartments.push(segAdv.id_apartment);
            break;
          case CONST_TYPE_ADVERTISEMENT.USERS.id:
            if (!getAdvertisement.payload.type_tower_apart)
              getAdvertisement.payload.type_tower_apart = segAdv.id_tower;
            if (!getAdvertisement.payload.type_apartment)
              getAdvertisement.payload.type_apartment = segAdv.id_apartment;
            arraysIds.arraysIdsUsers.push(segAdv.id_user);
            break;
          default:
            break;
        }
      });
      getAdvertisement.payload = {
        ...getAdvertisement.payload,
        ...arraysIds,
      };
      return getAdvertisement;
    } catch (error) {
      return Utils.Message(true, 500, "Error al procesar");
    }
  }

  static async apiPutEdit(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      const idAdvertisement = parseInt(req.query?.idAdvertisement);
      const idComplex = req.body?.id_complex;
      if (!Utils.verifyId(idAdvertisement))
        return res.json(Utils.Message(true, 500, "Datos erróneos"));
      const advModel = new AdvertisementModel(req.body);
      const strObject = Utils.structureObject(advModel.getAll);
      if (!strObject)
        return res.json(Utils.Message(true, 500, "Datos erróneos"));
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
          if (
            !dataVerifyArrays.complex_ids &&
            idComplex != CONST_SYSTEM_NOT_PARAM_VIEW
          )
            return res.json(Utils.Message(false, 0, "Datos erróneos"));
          dataArraysIds.complex_ids = advModel.complex_ids;
          break;
        case CONST_TYPE_ADVERTISEMENT.TOWERS.id:
          // Validamos los datos de las torres
          if (!dataVerifyArrays.towers_ids)
            return res.json(Utils.Message(false, 0, "Datos erróneos"));
          dataArraysIds.towers_ids = advModel.towers_ids;
          break;
        case CONST_TYPE_ADVERTISEMENT.APARTMENT.id:
          // Validamos los datos del apartamento
          if (!dataVerifyArrays.apartments_ids)
            return res.json(Utils.Message(false, 0, "Datos erróneos"));
          dataArraysIds.apartments_ids = advModel.apartments_ids;
          break;
        case CONST_TYPE_ADVERTISEMENT.USERS.id:
          // Validamos los datos del usuario
          if (
            !Utils.verifyId(advModel.idApartment) ||
            !dataVerifyArrays.users_ids
          )
            return res.json(Utils.Message(false, 0, "Datos erróneos"));
          dataArraysIds.idApartment = advModel.idApartment;
          dataArraysIds.users_ids = advModel.users_ids;
          break;
        default:
          break;
      }
      // Validamos la existencia del "category_Adv"
      if (!Utils.verifyId(advModel.category_adv))
        return res.json(Utils.Message(false, 0, "Datos erróneos"));
      // Estructuramos los datos para guardar el anuncio
      const dataSendAdvertisement = {
        id_complex: advModel.id_complex,
        title: advModel.title,
        description: advModel.description,
        miniature: advModel.miniature,
        status_adv: advModel.status_adv,
        status_type: advModel.status_type,
        category_adv: advModel.category_adv,
      };
      const sendAdvertisement =
        await AdvertisementFetching.putApiPrincipalUpdate(
          dataSendAdvertisement,
          idAdvertisement,
          cookie
        );
      if (sendAdvertisement.error || sendAdvertisement.statusCode != 200)
        return res.json(sendAdvertisement);
      // Guardamos los datos de la segmentación
      const sendSegmentation =
        await SegmentationAdvertisementFetching.setApiPrincipalSegmentation(
          dataArraysIds,
          idAdvertisement,
          cookie
        );
      if (sendSegmentation.error || sendSegmentation.statusCode != 200)
        return res.json(
          Utils.Message(
            false,
            200,
            "Anuncio creado, pero no se guardo sus elecciones"
          )
        );
      return res.json(Utils.Message(false, 200, "Ok"));
    } catch (error) {
      console.log(error);
      return res.json(Utils.Message(true, 500, "Error al procesar"));
    }
  }

  static async viewPutEdit(getData, image, idComplex, idAdvertisement) {
    try {
      idComplex =
        idComplex === CONST_SYSTEM_NOT_PARAM_VIEW
          ? CONST_SYSTEM_NOT_PARAM_VIEW
          : parseInt(idComplex);
      idAdvertisement = parseInt(idAdvertisement);
      if (
        (!Utils.verifyId(idComplex) &&
          idComplex != CONST_SYSTEM_NOT_PARAM_VIEW) ||
        !Utils.verifyId(idAdvertisement)
      )
        return Utils.Message(true, 500, "Datos erróneos");
      const advModel = new AdvertisementModel(getData);
      advModel.id_complex = idComplex;
      advModel.id_advertisement = idAdvertisement;
      const verifyData = advModel.verifyData([
        advModel.VAR_STATUS_ADV,
        advModel.VAR_TRANSMITTER,
        advModel.VAR_COMPLEX_IDS,
        advModel.VAR_TOWERS_IDS,
        advModel.VAR_APARTMENTS_IDS,
        advModel.VAR_USERS_IDS,
        advModel.VAR_ID_APARTMENT,
        advModel.VAR_MINIATURE,
      ]);
      if (!verifyData)
        return Utils.Message(false, 0, "Campos Vacíos", verifyData);
      switch (advModel.status_type) {
        case CONST_TYPE_ADVERTISEMENT.COMPLEX.id:
          advModel.complex_ids = [idComplex];
          break;
        case CONST_TYPE_ADVERTISEMENT.TOWERS.id:
          const extractIds = getData.arraysIdsTowers;
          if (!Utils.verifyArrayNumber(extractIds))
            return Utils.Message(false, 0, "Datos erróneos");
          advModel.towers_ids = extractIds;
          break;
        case CONST_TYPE_ADVERTISEMENT.APARTMENT.id:
          const extractIdsApartment = getData.arraysIdsApartments;
          if (!Utils.verifyArrayNumber(extractIdsApartment))
            return Utils.Message(false, 0, "Datos erróneos");
          advModel.apartments_ids = extractIdsApartment;
          break;
        case CONST_TYPE_ADVERTISEMENT.USERS.id:
          const extractIdsUser = getData.arraysIdsUsers;
          advModel.users_ids = extractIdsUser;
          advModel.idApartment = getData.type_apartment;
          break;
        default:
          break;
      }
      // Sí obtenemos una Imagen
      // Debemos VALIDAR que la imagen en verdad cambio de la que se ha elegido
      if (image) {
        // Enviamos la imagen para que se cree la miniatura de la misma
        const formData = new FormData();
        formData.append("file", image);
        // Obtenemos el ID de la miniatura
        const sendImage = await FileFetching.setLocalFile(formData);
        if (!sendImage.error && sendImage.statusCode === 200) {
          advModel.miniature = sendImage.payload.id_file;
        }
      } else {
        advModel.miniature = undefined;
      }
      // Enviamos los datos para crear un anuncio con sus respectiva segmentación
      const sendAdvertisement = await AdvertisementFetching.putApiLocalUpdate(
        advModel.getAll,
        idAdvertisement
      );
      return sendAdvertisement;
    } catch (error) {
      return Utils.Message(true, 500, "Error al procesar");
    }
  }

  static async apiDelete(req, res) {
    try {
      const idAdvertisement = parseInt(req.query?.idAdvertisement);
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      if (!Utils.verifyId(idAdvertisement))
        return res.json(Utils.Message(true, 0, "Datos erróneos"));
      const send = await AdvertisementFetching.deleteApiPrincipalDelete(
        idAdvertisement,
        cookie
      );
      return res.json(send);
    } catch (error) {
      console.log(error);
      return res.json(Utils.Message(true, 0, "Datos erróneos"));
    }
  }

  static async viewDelete(idAdvertisement) {
    try {
      idAdvertisement = parseInt(idAdvertisement);
      if (!Utils.verifyId(idAdvertisement))
        return Utils.Message(true, 500, "Datos erróneos");
      const send = await AdvertisementFetching.deleteApiLocalDelete(
        idAdvertisement
      );
      return send;
    } catch (error) {
      return Utils.Message(true, 500, "Error al procesar");
    }
  }

  static async apiListAdvertisementCategory(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      const idToCategory = parseInt(req.query?.idToCategory);
      if (!Utils.verifyId(idToCategory))
        return res.json(Utils.Message(true, 0, "Datos erróneos"));
      const send =
        await AdvertisementFetching.getApiPrincipalListAdvertisementCategory(
          idToCategory,
          cookie
        );
      return res.json(send);
    } catch (error) {
      return res.json(Utils.Message(true, 500, "Datos erróneos"));
    }
  }

  static async viewListAdvertisement(typeAdvertisement) {
    try {
      const send =
        await AdvertisementFetching.getApiLocalListAdvertisementCategory(
          typeAdvertisement
        );
      return send;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Error al procesar");
    }
  }

  static async apiGetListCorrespondences(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      const idTower = parseInt(req.query?.idTower);
      const idApartment = parseInt(req.query?.idApartment);
      if (!Utils.verifyId(idTower) || !Utils.verifyId(idApartment))
        return res.json(Utils.Message(true, 0, "Datos erróneos"));
      const send =
        await AdvertisementFetching.getApiPrincipalListCorrespondences(
          idTower,
          idApartment,
          cookie
        );
      return res.json(send);
    } catch (error) {
      console.log(error);
      return res.json(Utils.Message(true, 500, "Error"));
    }
  }

  static async viewGetListCorrespondences(values) {
    try {
      const idTower = parseInt(values.tower_id);
      const idApartment = parseInt(values.apartment_id);
      if (!Utils.verifyId(idTower) || !Utils.verifyId(idApartment))
        return Utils.Message(true, 0, "Datos erróneos");
      const listCorrespondences =
        await AdvertisementFetching.getApiLocalListCorrespondences(
          idTower,
          idApartment
        );
      return listCorrespondences;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Error");
    }
  }

  static async apiGetListAdvertisementToDashboard(cookie) {
    try {
      // const cookie = req.cookies[env.server.cookies.main_cookie.name];
      const send =
        await AdvertisementFetching.getApiPrincipalListAdvertisementToDashboard(
          cookie
        );
      return send;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Error");
    }
  }

  static async viewGetListAdvertisementToDashboard() {
    try {
      const list =
        await AdvertisementFetching.getApiLocalListAdvertisementToDashboard();
      return list;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Error");
    }
  }

  static async apiSSRGetOneAdvertisementToView(cookie, idAdvertisement) {
    try {
      const send =
        await AdvertisementFetching.getApiPrincipalOneAdvertisementToView(
          idAdvertisement,
          cookie
        );
      return send;
    } catch (error) {
      return Utils.Message(true, 500, "Error");
    }
  }

  static viewGetDataToForm(data = null) {
    let valuesForm = {
      title: data?.title ? data.title : "",
      description: data?.description ? data.description : "",
      miniature: data?.miniature ? data.miniature : "",
      status_type: data?.status_type ? data.status_type : "",
      status_adv: data?.status_adv ? data.status_adv : "",
      type_tower_apart: data?.type_tower_apart ? data.type_tower_apart : "",
      type_apartment: data?.type_apartment ? data.type_apartment : "",
      arraysIdsTowers: data?.arraysIdsTowers ? data.arraysIdsTowers : [],
      arraysIdsApartments: data?.arraysIdsApartments
        ? data.arraysIdsApartments
        : [],
      arraysIdsUsers: data?.arraysIdsUsers ? data.arraysIdsUsers : [],
      status_advertisement: data?.status_advertisement
        ? data.status_advertisement
        : null,
      type_advertisement: data?.type_advertisement
        ? data.type_advertisement
        : null,
      management_files: data?.management_files ? data.management_files : null,
      type_complex: data?.residential_complex
        ? data.residential_complex.complex_name
        : "",
    };
    return valuesForm;
  }
}
