import Utils from "@/helpers/helpers";
import { env } from "../../next.config";
import axios from "axios";

const timeout = process.env.MAX_TIME_AUTH_FETCHING || 100000;

export class FetchUtils {
  static async send(url, opt = null) {
    try {
      const options = {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "'Content-Type'": "application/json",
          "'Access-Control-Allow-Origin'": "*",
          application_type: "application/web",
        },
      };
      console.log("options fetch utils", options);
      const response = await fetch(url, {
        method: opt?.method || "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          application_type: env._API.request.application_type,
          authorization:
            opt?.tokenOuth && `Bearer ${JSON.stringify(opt.tokenOuth)}`,
          ...opt?.headers,
        },
        body: opt?.body ? JSON.stringify(opt.body) : null,
      });
      const res = response.json();
      // Realizamos un middleware para validar los datos de la respuesta
      return res;
    } catch (error) {
      console.log("Error en el fetch Utils catch:", error);
      return Utils.Message(true, 500, "Error");
    }
  }

  static async sendPostAxios(url, data, auth = null) {
    try {
      axios.defaults.timeout = timeout;
      const authorization = auth
        ? { Authorization: `Bearer ${JSON.stringify(auth)}` }
        : {};
      const res = await axios.post(url, data, {
        headers: {
          application_type: "application/web",
          ...authorization,
        },
      });
      if (res.status != 200)
        return Utils.Message(true, 500, "Error en el servidor");
      return res.data;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Error");
    }
  }

  static async sendPutAxios(url, data, auth = null) {
    try {
      axios.defaults.timeout = timeout;
      const authorization = auth
        ? { Authorization: `Bearer ${JSON.stringify(auth)}` }
        : {};
      const res = await axios.put(url, data, {
        headers: {
          application_type: "application/web",
          ...authorization,
        },
      });
      if (res.status != 200)
        return Utils.Message(true, 500, "Error en el servidor");
      return res.data;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Error");
    }
  }
}
