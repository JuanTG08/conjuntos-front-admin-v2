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
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          application_type: env._API.request.application_type,
        },
        timeout,
      };
      if (opt?.tokenOuth)
        options.headers.authorization = `Bearer ${JSON.stringify(
          opt.tokenOuth
        )}`;
      if (opt?.method) options.method = opt.method;
      if (opt?.body) options.body = JSON.stringify(opt.body);
      if (opt?.formData)
        options.headers["Content-Type"] = "multipart/form-data; boundary=";
      if (opt?.headers) options.headers = opt.headers;
      const response = await fetch(url, options);
      const res = response.json();
      // Realizamos un middleware para validar los datos de la respuesta
      return res;
    } catch (error) {
      console.log(error);
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
