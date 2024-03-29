import Utils from "@/helpers/helpers";
import { env } from "../../next.config";
import { FetchUtils } from "@/utils/fetch.utils";

const URL_API_PRINCIPAL = env._API.url + env._API.routes.pets.url;
const URL_API_LOCAL =
  env.server.url_local + env.server.api.url + env.server.api.routes.pets.url;

export default class PetsFetching {
  static async getApiPrincipalDataToForm(tokenOuth) {
    try {
      const url = URL_API_PRINCIPAL + env._API.routes.pets.get_data_form;
      const res = await FetchUtils.send(url, { tokenOuth });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async postApiPrincipalSubmitNew(data, tokenOuth) {
    try {
      const url = URL_API_PRINCIPAL + env._API.routes.pets.list_create;
      const res = await FetchUtils.send(url, {
        method: "POST",
        tokenOuth,
        body: data,
      });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async postApiLocalSubmitNew(data) {
    try {
      const url = URL_API_LOCAL;
      const res = await FetchUtils.send(url, { method: "POST", body: data });
      return res;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async getApiPrincipalPetsToApartment(tokenOuth) {
    try {
      const url = URL_API_PRINCIPAL + env._API.routes.pets.list_create;
      const res = await FetchUtils.send(url, {
        tokenOuth,
      });
      return res;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async getApiPrincipalOnePetToResident(idPet, tokenOuth) {
    try {
      const url = URL_API_PRINCIPAL + env._API.routes.pets.find_upd_del + idPet;
      const res = await FetchUtils.send(url, {
        tokenOuth,
      });
      return res;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async putApiPrincipalUpdatePet(data, idPet, tokenOuth) {
    try {
      const url = URL_API_PRINCIPAL + env._API.routes.pets.find_upd_del + idPet;
      const res = await FetchUtils.send(url, {
        tokenOuth,
        method: "PUT",
        body: data,
      });
      return res;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async putApiLocalUpdatePet(data, idPet) {
    try {
      const url = URL_API_LOCAL + "/" + idPet;
      const res = await FetchUtils.send(url, {
        method: "PUT",
        body: data,
      });
      return res;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async deleteApiPrincipalDeletePet(idPet, tokenOuth) {
    try {
      const url = URL_API_PRINCIPAL + env._API.routes.pets.find_upd_del + idPet;
      const res = await FetchUtils.send(url, {
        tokenOuth,
        method: "DELETE",
      });
      return res;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async deleteApiLocalDeletePet(idPet) {
    try {
      const url = URL_API_LOCAL + "/" + idPet;
      const res = await FetchUtils.send(url, { method: "DELETE" });
      return res;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Server Error");
    }
  }
}
