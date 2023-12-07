import { MunicipalityFetching } from "@/fetching/municipality.fetch";
import Utils from "@/helpers/helpers";

export class MunicipalityController {
  static async apiSSRListAll(idDepartment) {
    try {
      const listMunicipality =
        await MunicipalityFetching.getApiPrincipalListAll(idDepartment);
      return listMunicipality;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Error al obtener la información");
    }
  }

  static async apiListAll(req, res) {
    try {
      const idDepartment = parseInt(req.query?.idDepartment);
      if (!Utils.verifyId(idDepartment))
        return res.json(Utils.Message(true, 400, "Campos vacíos"));
      const listMunicipality = await MunicipalityFetching.getApiPrincipalListAll(
        idDepartment
      );
      return res.json(listMunicipality);
    } catch (error) {
      console.log(error);
      return res.json(
        Utils.Message(true, 500, "Error al obtener la información")
      );
    }
  }

  static async viewListAll(idDepartment) {
    try {
      if (!Utils.verifyId(idDepartment))
        return Utils.Message(true, 400, "Campos vacíos");
      const listMunicipality = await MunicipalityFetching.getApiLocalListAll(
        idDepartment
      );
      return listMunicipality;
    } catch (error) {
      return Utils.Message(true, 500, "Error al obtener la información");
    }
  }
}
