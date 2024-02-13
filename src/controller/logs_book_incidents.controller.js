import { LogsBookIncidentsFetching } from "@/fetching/logs_book_incidents.fetch";
import Utils from "@/helpers/helpers";

export class LogsBookIncidentsCtrl {
  static async viewPostCreateIncident(data, image) {
    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("data", JSON.stringify(data));
      const send = await LogsBookIncidentsFetching.postApiLocalCreateIncident(
        formData
      );
      return send;
    } catch (error) {
      return Utils.Message(true, 500, "Error al procesar");
    }
  }

  static async apiSSRGetListMyLogsBookIncidents(cookies) {
    try {
      const getListAll =
        await LogsBookIncidentsFetching.getApiLocalListMyLogsBookIncidents(
          cookies
        );
      return getListAll;
    } catch (error) {
      return Utils.Message(true, 500, "Error al procesar");
    }
  }

  static async apiSSRGetListAllLogsBookIncidents(cookies) {
    try {
      const getListAll =
        await LogsBookIncidentsFetching.getApiPrincipalListAllLogsBookIncidents(
          cookies
        );
      return getListAll;
    } catch (error) {
      return Utils.Message(true, 500, "Error al procesar");
    }
  }

  static async apiSSRGetOneLogsBookIncidents(idLogsBookIncident, cookies) {
    try {
      idLogsBookIncident = parseInt(idLogsBookIncident);
      if (!Utils.verifyId(idLogsBookIncident))
        return Utils.Message(true, 400, "Error en los datos");
      const getOne = await LogsBookIncidentsFetching.getOneLogsBookIncidents(
        idLogsBookIncident,
        cookies
      );
      return getOne;
    } catch (error) {
      return Utils.Message(true, 500, "Error al procesar");
    }
  }
}
