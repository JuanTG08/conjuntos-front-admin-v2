import { DepartmentCountryFetching } from "@/fetching/department_country.fetch";
import Utils from "@/helpers/helpers";

export class DepartmentCountryController {
  static async apiSSRListAllDepartment(idCountry) {
    try {
      const listCountry = await DepartmentCountryFetching.getApiPrincipal(
        idCountry
      );
      return listCountry;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Error al obtener la información");
    }
  }

  static async apiListAllDepartment(req, res) {
    try {
      const idCountry = parseInt(req.query?.idCountry);
      if (!Utils.verifyId(idCountry))
        return res.json(Utils.Message(true, 400, "Campos vacíos"));
      const listCountry = await DepartmentCountryFetching.getApiPrincipal(
        idCountry
      );
      return res.json(listCountry);
    } catch (error) {
      console.log(error)
      return res.json(
        Utils.Message(true, 500, "Error al obtener la información")
      );
    }
  }

  static async viewListAllDepartment(idCountry) {
    try {
      if (!Utils.verifyId(idCountry))
        return Utils.Message(true, 400, "Campos vacíos");
      const listCountry = await DepartmentCountryFetching.getApiLocalListAll(
        idCountry
      );
      return listCountry;
    } catch (error) {
      return Utils.Message(true, 500, "Error al obtener la información");
    }
  }
}
