import PetsFetching from "@/fetching/pets.fetch";
import Utils from "@/helpers/helpers";
import { PetModel } from "@/model/Pets.model";
import { env } from "../../next.config";
import dayjs from "dayjs";
import { DateUtils } from "@/utils/date.utils";

export class PetsController {
  static async apiSSRGetDataForm(cookie) {
    try {
      const getData = await PetsFetching.getApiPrincipalDataToForm(cookie);
      return getData;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async apiSSRGetPetsToApartment(cookie) {
    try {
      const getPets = await PetsFetching.getApiPrincipalPetsToApartment(cookie);
      return getPets;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async apiSubmitNew(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      const modelPet = new PetModel(req.body);
      const verifyData = await modelPet.verifyData([
        modelPet.VAR_ID_PET,
        modelPet.VAR_BIRTH_DAY,
        modelPet.VAR_LAST_VACCINE,
        modelPet.VAR_PHOTOGRAPHY,
        modelPet.VAR_BEHAVIOR,
        modelPet.VAR_CREATEDAT,
        modelPet.VAR_UPDATEDAT,
      ]);
      if (!verifyData)
        return res.json(Utils.Message(true, 400, "Error en los datos"));
      const respApi = await PetsFetching.postApiPrincipalSubmitNew(
        modelPet.getAll,
        cookie
      );
      return res.json(respApi);
    } catch (error) {
      console.log(error);
      return res.json(Utils.Message(true, 500, "Server Error"));
    }
  }

  static async viewSubmitNew(data, id) {
    try {
      const modelPet = new PetModel(data);
      const verifyData = await modelPet.verifyData([
        modelPet.VAR_ID_PET,
        modelPet.VAR_BIRTH_DAY,
        modelPet.VAR_LAST_VACCINE,
        modelPet.VAR_PHOTOGRAPHY,
        modelPet.VAR_BEHAVIOR,
        modelPet.VAR_CREATEDAT,
        modelPet.VAR_UPDATEDAT,
      ]);
      if (!verifyData) return Utils.Message(true, 400, "Error en los datos");
      const respApi = await PetsFetching.postApiLocalSubmitNew(modelPet.getAll);
      return respApi;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async apiSSRGetOnePetToResident(idPet, cookie) {
    try {
      idPet = parseInt(idPet);
      if (!Utils.verifyId(idPet))
        return Utils.Message(true, 500, "Id invalido");
      const getPets = await PetsFetching.getApiPrincipalOnePetToResident(
        idPet,
        cookie
      );
      return getPets;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async apiUpdatePet(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      const idPet = parseInt(req.query.idPet);
      if (!Utils.verifyId(idPet))
        return res.json(Utils.Message(true, 400, "Error en los datos"));
      const modelPet = new PetModel(req.body);
      const verifyData = await modelPet.verifyData([
        modelPet.VAR_ID_PET,
        modelPet.VAR_BIRTH_DAY,
        modelPet.VAR_LAST_VACCINE,
        modelPet.VAR_PHOTOGRAPHY,
        modelPet.VAR_BEHAVIOR,
        modelPet.VAR_CREATEDAT,
        modelPet.VAR_UPDATEDAT,
      ]);
      if (!verifyData)
        return res.json(Utils.Message(true, 400, "Error en los datos"));
      const respApi = await PetsFetching.putApiPrincipalUpdatePet(
        modelPet.getAll,
        idPet,
        cookie
      );
      return res.json(respApi);
    } catch (error) {
      return res.json(Utils.Message(true, 500, "Server Error"));
    }
  }

  static async viewUpdatePet(data, idPet) {
    try {
      idPet = parseInt(idPet);
      if (!Utils.verifyId(idPet))
        return Utils.Message(true, 400, "Error en los datos");
      const modelPet = new PetModel(data);
      modelPet.id_pet = idPet;
      const verifyData = await modelPet.verifyData([
        modelPet.VAR_ID_PET,
        modelPet.VAR_BIRTH_DAY,
        modelPet.VAR_LAST_VACCINE,
        modelPet.VAR_PHOTOGRAPHY,
        modelPet.VAR_BEHAVIOR,
        modelPet.VAR_CREATEDAT,
        modelPet.VAR_UPDATEDAT,
      ]);
      if (!verifyData) return Utils.Message(true, 400, "Error en los datos");
      const respApi = await PetsFetching.putApiLocalUpdatePet(
        modelPet.getAll,
        idPet
      );
      return respApi;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async apiDeletePet(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      const idPet = parseInt(req.query.idPet);
      if (!Utils.verifyId(idPet))
        return res.json(Utils.Message(true, 400, "Error en los datos"));
      const respApi = await PetsFetching.deleteApiPrincipalDeletePet(
        idPet,
        cookie
      );
      return res.json(respApi);
    } catch (error) {
      console.log(error);
      return res.json(Utils.Message(true, 500, "Server Error"));
    }
  }

  static async viewDeletePet(idPet) {
    try {
      idPet = parseInt(idPet);
      if (!Utils.verifyId(idPet))
        return Utils.Message(true, 400, "Error en los datos");
      const respApi = await PetsFetching.deleteApiLocalDeletePet(idPet);
      return respApi;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static viewGetDataToForm(data = null) {
    const valuesForm = {
      name: data?.name || "",
      type_pet: data?.type_pet || "",
      breed: data?.breed || "",
      gender: data?.gender || "",
      color: data?.color || "",
      birth_day: data?.birth_day
        ? dayjs(DateUtils.getDateDependMyUTC(data?.birth_day))
        : "",
      last_vaccine: data?.last_vaccine
        ? dayjs(DateUtils.getDateDependMyUTC(data?.last_vaccine))
        : "",
      behavior: data?.behavior || "",
    };
    return valuesForm;
  }
}
