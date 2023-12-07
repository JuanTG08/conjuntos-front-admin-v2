import { AccessPersonFetching } from "@/fetching/access_person.fetch";
import Utils from "@/helpers/helpers";
import { AccessPersonModel } from "@/model/AccessPerson.model";
import { env } from "../../next.config";

export class AccessPersonController {
  static async apiPostCreateAccessPerson(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      const accessPerson = new AccessPersonModel(req.body);
      const verifyData = accessPerson.verifyData([
        accessPerson.VAR_EMAIL,
        accessPerson.VAR_ID_ACCESS_PEOPLE,
        accessPerson.VAR_ID_OWNER,
        accessPerson.VAR_COMMENTS,
        accessPerson.VAR_PARKING,
        accessPerson.VAR_ID_STATUS_ACCESS_PEOPLE,
      ]);
      if (verifyData !== true)
        return Utils.Message(false, 0, "Campos Vacíos", verifyData);
      const send = await AccessPersonFetching.postApiPrincipalNew(
        accessPerson.getAll,
        cookie
      );
      return res.json(send);
    } catch (error) {
      return res.json(Utils.Message(true, 500, "Error al procesar"));
    }
  }

  static async viewPostCreateAccessPerson(data) {
    try {
      const accessPerson = new AccessPersonModel(data);
      const verifyData = accessPerson.verifyData([
        accessPerson.VAR_EMAIL,
        accessPerson.VAR_ID_ACCESS_PEOPLE,
        accessPerson.VAR_ID_OWNER,
        accessPerson.VAR_COMMENTS,
        accessPerson.VAR_PARKING,
        accessPerson.VAR_ID_STATUS_ACCESS_PEOPLE,
      ]);
      if (verifyData !== true)
        return Utils.Message(false, 0, "Campos Vacíos", verifyData);
      const send = await AccessPersonFetching.postApiLocalNew(
        accessPerson.getAll
      );
      return send;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Error");
    }
  }

  static async apiGetAccessPersonToApartment(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      const send = await AccessPersonFetching.getApiPrincipalListToApartment(
        cookie
      );
      return res.json(send);
    } catch (error) {
      return res.json(Utils.Message(true, 500, "Error al procesar"));
    }
  }

  static async viewGetAccessPersonToApartment() {
    try {
      const send = await AccessPersonFetching.getApiLocalListToApartment();
      /*
      if (send.statusCode == 200)
        send.payload = send.payload.map(({ users, ...data }) => ({
          ...data,
          registeredBy: `${users.name} ${users.last_name}`,
        }));*/
      return send;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Error al procesar");
    }
  }

  static async apiGetOneAccessPerson(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      const idAccessPerson = parseInt(req.query?.idAccessPerson);
      if (!Utils.verifyId(idAccessPerson))
        return res.json(Utils.Message(true, 0, "Datos erróneos"));
      const send = await AccessPersonFetching.getApiPrincipalOne(
        req.query?.idAccessPerson,
        cookie
      );
      return res.json(send);
    } catch (error) {
      console.log(error);
      return res.json(Utils.Message(true, 500, "Error al procesar"));
    }
  }

  static async viewGetOneAccessPerson(idAccessPerson) {
    try {
      idAccessPerson = parseInt(idAccessPerson);
      if (!Utils.verifyId(idAccessPerson))
        return Utils.Message(true, 0, "Datos erróneos");
      const send = await AccessPersonFetching.getApiLocalOne(idAccessPerson);
      return send;
    } catch (error) {
      return Utils.Message(true, 500, "Error al procesar");
    }
  }

  static async apiDeleteAccessPerson(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      const idAccessPerson = parseInt(req.query?.idAccessPerson);
      if (!Utils.verifyId(idAccessPerson))
        return res.json(Utils.Message(true, 0, "Datos erróneos"));
      const send = await AccessPersonFetching.deleteApiPrincipal(
        idAccessPerson,
        cookie
      );
      return res.json(send);
    } catch (error) {
      return res.json(Utils.Message(true, 500, "Error al procesar"));
    }
  }

  static async viewDeleteAccessPerson(idAccessPerson) {
    try {
      idAccessPerson = parseInt(idAccessPerson);
      if (!Utils.verifyId(idAccessPerson))
        return Utils.Message(true, 0, "Datos erróneos");
      const send = await AccessPersonFetching.deleteApiLocal(idAccessPerson);
      return send;
    } catch (error) {
      return Utils.Message(true, 500, "Error al procesar");
    }
  }

  static async apiGetListAccessPersonToComplex(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      const send = await AccessPersonFetching.getApiPrincipalListToComplex(
        cookie
      );
      return res.json(send);
    } catch (error) {
      return res.json(Utils.Message(true, 500, "Error al procesar"));
    }
  }

  static async viewGetListAccessPersonToComplex() {
    try {
      const send = await AccessPersonFetching.getApiLocalListToComplex();
      return send;
    } catch (error) {
      return Utils.Message(true, 500, "Error al procesar");
    }
  }

  static viewGetDataToForm(data = null) {
    let valuesForm = {
      name_person: data?.name_person ? data.name_person : "",
      email: data?.email ? data.email : "",
      dni_person: data?.dni_person ? data.dni_person : "",
      comments: data?.comments ? data.comments : "",
      id_category_access: data?.id_category_access
        ? data.id_category_access
        : "",
      cuantity_people: data?.cuantity_people ? data.cuantity_people : "",
      parking: data?.parking ? data.parking : false,
      start_day_allowed: data?.start_day_allowed ? data.start_day_allowed : "",
      end_day_allowed: data?.end_day_allowed ? data.end_day_allowed : "",
      start_hour_day: data?.start_hour_day ? data.start_hour_day : "",
      end_hour_day: data?.end_hour_day ? data.end_hour_day : "",
    };
    return valuesForm;
  }
}
