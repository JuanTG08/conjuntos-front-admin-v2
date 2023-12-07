import PetsFetching from "@/fetching/pets.fetch";
import Utils from "@/helpers/helpers";
import { PetModel } from "@/model/Pets.model";
import { env } from "../../next.config";

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
      console.log(error)
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

  static async viewGetDataToForm(data = null) {
    const valuesForm = {
      name: data?.name || "",
      type_pet: data?.type_pet || "",
      breed: data?.breed || "",
      age: data?.age || "",
      gender: data?.gender || "",
      color: data?.color || "",
      birth_day: data?.birth_day || "",
      last_vaccine: data?.last_vaccine || "",
      behavior: data?.behavior || "",
    };
    return valuesForm;
  }
}
