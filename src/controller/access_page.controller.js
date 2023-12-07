import { AccessPageFetching } from "@/fetching/access_page.fetch";
import Utils from "@/helpers/helpers";
import { AccessPageModel } from "@/model/AccessPage.model";
import { env } from "../../next.config";

export class AccessPageController {
  static async apiGetListMFS(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      const list = await AccessPageFetching.getApiPrincipalListMFS(cookie);
      return res.status(200).json(list);
    } catch (error) {
      return res.status(500).json(Utils.Message(true, 500, "Server Error"));
    }
  }

  static async viewGetListMFS() {
    try {
      const list = await AccessPageFetching.getApiLocalListMFS();
      return list;
    } catch (error) {
      return Utils.Message(true, 500, "Server Error");
    }
  }

  static async apiPostNew(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      const model = new AccessPageModel(req.body);
      const verifyData = model.verifyData([model.VAR_ACCESS_PAGE_ID]);
      if (!verifyData)
        return res.json(Utils.Message(true, 500, "Datos erroneos"));
      const respApi = await AccessPageFetching.postApiPrincipalNew(
        model.getAll,
        cookie
      );
      if (respApi.statusCode != 200)
        return res
          .status(500)
          .json(
            Utils.Message(true, 500, "No fue posible guardar la información")
          );
      return res.json(Utils.Message(false, 200, "Se creo correctamente"));
    } catch (error) {
      console.log(error);
      return res.json(Utils.Message(true, 500, "Error"));
    }
  }

  static async viewSubmitNew(data) {
    try {
      const model = new AccessPageModel(data);
      const verifyData = model.verifyData([model.VAR_ACCESS_PAGE_ID]);
      if (!verifyData)
        return res.json(Utils.Message(true, 500, "Datos erroneos"));
      const respApi = await AccessPageFetching.postApiLocalNew(model.getAll);
      if (respApi.statusCode != 200)
        return Utils.Message(
          true,
          500,
          "No fue posible guardar la información"
        );
      return Utils.Message(false, 200, "Se creo correctamente");
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Error");
    }
  }

  static async apiGetOne(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      const idAccessPage = parseInt(req.query?.idAccessPage);
      if (!Utils.verifyId(idAccessPage))
        return res
          .status(500)
          .json(Utils.Message(true, 500, "Parametros fuera de rango"));
      const respApi = await AccessPageFetching.getApiPrincipalOne(
        idAccessPage,
        cookie
      );
      if (respApi.statusCode != 200)
        return res
          .status(500)
          .json(
            Utils.Message(true, 500, "No fue posible obtener la información")
          );
      return res.status(200).json(respApi);
    } catch (error) {
      return res.json(Utils.Message(true, 500, "Error"));
    }
  }

  static async viewGetOne(idAccessPage) {
    try {
      idAccessPage = parseInt(idAccessPage);
      if (!Utils.verifyId(idAccessPage))
        return Utils.Message(true, 500, "Parametros fuera de rango");
      const respApi = await AccessPageFetching.getApiLocalOne(idAccessPage);
      if (respApi.statusCode != 200 || !respApi.payload)
        return Utils.Message(
          true,
          500,
          "No fue posible obtener la información"
        );
      respApi.payload.method = respApi.payload?.path_methods.id_path_method;
      respApi.payload.fromTo = respApi.payload?.from_to.id_from_to;
      respApi.payload.status =
        respApi.payload?.status_access_page_statusTostatus.id_status;
      delete respApi.payload?.path_methods;
      delete respApi.payload?.from_to;
      delete respApi.payload?.status_access_page_statusTostatus;
      return respApi;
    } catch (error) {
      return Utils.Message(true, 500, "Error");
    }
  }

  static async apiPutEdit(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      const idAccessPage = parseInt(req.query?.idAccessPage);
      const model = new AccessPageModel(req.body);
      const verifyData = model.verifyData([model.VAR_ACCESS_PAGE_ID]);
      if (!verifyData || !Utils.verifyId(idAccessPage))
        return res.json(Utils.Message(true, 500, "Datos erroneos"));
      model.id = idAccessPage;
      const respApi = await AccessPageFetching.putApiPrincipalEdit(
        model.getAll,
        cookie
      );
      return res.json(respApi);
    } catch (error) {
      return res.json(Utils.Message(true, 500, "Error"));
    }
  }

  static async viewSubmitEdit(data, id) {
    try {
      const idAccessPage = parseInt(id);
      const model = new AccessPageModel(data);
      const verifyData = model.verifyData([model.VAR_ACCESS_PAGE_ID]);
      if (!verifyData || !Utils.verifyId(idAccessPage))
        return res.json(Utils.Message(true, 500, "Datos erroneos"));
      model.id = idAccessPage;
      const respApi = await AccessPageFetching.putApiLocalEdit(model.getAll);
      return respApi;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Error");
    }
  }

  static async apiDelete(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      const idAccessPage = parseInt(req.query?.idAccessPage);
      if (!Utils.verifyId(idAccessPage))
        return res
          .status(500)
          .json(Utils.Message(true, 500, "Parametros fuera de rango"));
      const respApi = await AccessPageFetching.deleteApiPrincipal(
        idAccessPage,
        cookie
      );
      if (respApi.statusCode != 200)
        return res
          .status(500)
          .json(
            Utils.Message(true, 500, "No fue posible eliminar la información")
          );
      return res
        .status(200)
        .json(Utils.Message(false, 200, "Se elimino correctamente"));
    } catch (error) {
      return res.json(Utils.Message(true, 500, "Error"));
    }
  }

  static async viewSubmitDelete(idAccessPage) {
    try {
      idAccessPage = parseInt(idAccessPage);
      if (!Utils.verifyId(idAccessPage))
        return Utils.Message(true, 500, "Parametros fuera de rango");
      const respApi = await AccessPageFetching.deleteApiLocal(idAccessPage);
      if (respApi.statusCode != 200)
        return Utils.Message(
          true,
          500,
          "No fue posible eliminar la información"
        );
      return Utils.Message(false, 200, "Se elimino correctamente");
    } catch (error) {
      return Utils.Message(true, 500, "Error");
    }
  }

  static viewGetDataToForm(data = null) {
    const valuesForm = {
      name: data?.name ? data.name : "",
      description: data?.description ? data.description : "",
      path: data?.path ? data.path : "",
      method: data?.method ? data.method : "",
      fromTo: data?.fromTo ? data.fromTo : "",
      status: data?.status ? data.status : "",
    };
    return valuesForm;
  }
}
