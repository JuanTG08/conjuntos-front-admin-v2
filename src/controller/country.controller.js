import { CountryFetching } from "@/fetching/country.fetch";
import Utils from "@/helpers/helpers";

export class CountryController {
  static async apiSSRListAllCountry() {
    try {
      const listCountry = await CountryFetching.getApiPrincipal();
      return listCountry;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Error al obtener la información");
    }
  }
}
