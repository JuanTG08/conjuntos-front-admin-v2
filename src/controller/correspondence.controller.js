import {
  CONST_ADVERTISEMENT_CATEGORY,
  CONST_ADVERTISEMENT_STATUS,
  CONST_ADVERTISEMENT_TYPES,
} from "@/constants/advertisement.constant";
import { CONST_SYSTEM_NOT_PARAM_VIEW } from "@/constants/system.constant";
import { AdvertisementFetching } from "@/fetching/advertisement.fetch";
import { CorrespondenceFetching } from "@/fetching/correspondence.fetch";
import Utils from "@/helpers/helpers";
import { env } from "../../next.config";

export class CorrespondenceController {
  static async apiChangeCheckCorrespondence(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      const idCorrespondence = parseInt(req.body?.idCorrespondence);
      const status_adv = parseInt(req.body?.status_adv);
      if (!Utils.verifyId(idCorrespondence) || !Utils.verifyId(status_adv))
        return res.json(Utils.Message(true, 500, "Datos erróneos"));
      const sendData = {
        status_adv,
      };
      const send = await AdvertisementFetching.putApiPrincipalUpdate(
        sendData,
        idCorrespondence,
        cookie
      );
      return res.json(send);
    } catch (error) {
      return res.json(Utils.Message(true, 500, "Error al procesar"));
    }
  }

  static async viewChangeCheckCorrespondenceToDelivered(idCorrespondence) {
    try {
      if (!Utils.verifyId(idCorrespondence))
        return Utils.Message(true, 500, "Datos erróneos");
      const sendData = {
        idCorrespondence,
        status_adv: CONST_ADVERTISEMENT_STATUS.DELIVERED.id,
      };
      const send = await CorrespondenceFetching.postApiLocalChangeStatus(
        sendData
      );
      return send;
    } catch (error) {
      return Utils.Message(true, 500, "Error al procesar");
    }
  }

  static async viewSubmitNew(values, image) {
    const logs = [];
    try {
      const data = {
        title: values.title,
        description: values.description,
        status_adv: CONST_ADVERTISEMENT_STATUS.WAITING_DELIVERY.id,
        status_type: values.status_type,
        category_adv: CONST_ADVERTISEMENT_CATEGORY.CORRESPONDENCE.ID,
        date_start: new Date(),
      };
      switch (data.status_type) {
        case CONST_ADVERTISEMENT_TYPES.APARTMENT.id:
          if (!Utils.verifyId(values.arraysIdsApartments))
            return Utils.Message(true, 500, "Datos erróneos");
          data.apartments_ids = [values.arraysIdsApartments];
          break;
        case CONST_ADVERTISEMENT_TYPES.USERS.id:
          const arraysIdsUsers = values.arraysIdsUsers;
          if (
            !Utils.verifyArrayNumber(arraysIdsUsers) ||
            !Utils.verifyId(values.arraysIdsApartments)
          )
            return Utils.Message(true, 500, "Datos erróneos");
          data.idApartment = values.arraysIdsApartments;
          data.users_ids = arraysIdsUsers;
          break;
        default:
          return Utils.Message(true, 500, "Datos erróneos");
      }
      logs.push(
        `viewSubmitNew Establecemos los datos imagen: ${!!image}`,
        `viewSubmitNew Establecemos los datos correspondencia: ${JSON.stringify(
          data
        )}`
      );
      // Enviamos los datos para crear la correspondencia con sus respectiva segmentación
      const formData = new FormData();
      formData.append("file", image);
      formData.append("data", JSON.stringify(data));
      const sendCorrespondence = await AdvertisementFetching.postApiLocalNew(
        formData, // data,
        CONST_SYSTEM_NOT_PARAM_VIEW
      );
      logs.push(
        `viewSubmitNew Enviamos los datos: ${JSON.stringify(
          sendCorrespondence
        )}`,
        `viewSubmitNew Obtenemos los datos del payload: ${JSON.stringify(
          sendCorrespondence.payload
        )}`
      );
      sendCorrespondence.payload = {
        ...sendCorrespondence.payload,
        logs,
      }
      return sendCorrespondence;
    } catch (error) {
      console.log(error);
      logs.push(`viewSubmitNew Catch: ${error}`);
      return Utils.Message(true, 500, "Error al procesar", logs);
    }
  }

  static viewGetDataToForm(data = null) {
    let valuesForm = {
      title: data?.title ? data.title : "",
      description: data?.description ? data.description : "",
      miniature: data?.miniature ? data.miniature : "",
      date_start: data?.date_start
        ? dayjs(new Date(data.date_start.toString()))
        : "",
      status_adv: data?.status_adv ? data.status_adv : "",
      status_type: data?.status_type ? data.status_type : "",
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
