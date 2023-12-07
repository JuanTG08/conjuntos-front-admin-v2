import { VehiclesFetching } from "@/fetching/vehicles.fetch";
import Utils from "@/helpers/helpers";
import { env } from "../../next.config";

export class VehiclesController {
  static async apiGetListVehicles(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      const send = await VehiclesFetching.getApiPrincipalListAll(cookie);
      return res.json(send);
    } catch (error) {
        console.log(error)
      return res.json(Utils.Message(true, 500, "Error"));
    }
  }

  static async viewGetListVehicles() {
    try {
      const send = await VehiclesFetching.getApiLocalListAll();
      return send;
    } catch (error) {
      return Utils.Message(true, 500, "Error");
    }
  }
}
