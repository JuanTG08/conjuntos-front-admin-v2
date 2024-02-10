import { CONST_STATUS_CODE } from "@/constants/status_code.constant";
import Utils from "@/helpers/helpers";
import { TokenUtils } from "@/utils/token.utils";

export class ServerSideProps {
  _responseUnauthorized;
  _responseRedirect;

  _redirect = false;
  _unauthorized = false;

  _cookies;
  _params;
  _response = { props: {} };

  constructor(context) {
    this._cookies = TokenUtils.destructureAllCookiesClient(context);
    this._params = context.params;
    this._responseUnauthorized = {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
    this._responseRedirect = {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  setRedirect(to = "/dashboard", permanent = false) {
    if (this._redirect) return;
    this._redirect = true;
    this._responseRedirect = {
      redirect: {
        destination: to,
        permanent,
      },
    };
  }

  get response() {
    if (this._unauthorized) return this._responseUnauthorized; // Si hay un error de autorización, redireccionamos al login)
    if (this._redirect) return this._responseRedirect; // Sí se especifica se redireccionamos al dashboard
    return this._response;
  }

  async guardFetch(...callBacks) {
    try {
      const responseCallbacks = await Promise.all(callBacks);
      // Validamos que no haya errores de autorización en las peticiones
      for (const res of responseCallbacks) {
        if (this._unauthorized) break; // Si ya hay un error de autorización, no seguimos validando las peticiones)
        if (
          res?.statusCode == CONST_STATUS_CODE.unauthorized.code ||
          res?.statusCode == CONST_STATUS_CODE.unauthorizedUserOverdue.code
        )
          this._unauthorized = true;
      }
      if (callBacks.length == 1) return responseCallbacks[0];
      return responseCallbacks;
    } catch (error) {
      if (callBacks.length == 1)
        Utils.Message(true, 500, "Error en la petición");
      return [];
    }
  }

  validateResponseFetch({
    response,
    errorExpected = CONST_STATUS_CODE.ok.error,
    codeExpected = CONST_STATUS_CODE.ok.code,
    toRedirect = "/dashboard",
    message = "No fue posible obtener los datos",
  }) {
    if (response?.statusCode == codeExpected && response?.error == errorExpected)
      return true;
    this.setRedirect(toRedirect);
    throw new Error(message);
  }

  setResponseProps(props) {
    this._response.props = props;
  }

  getParam(name) {
    try {
      return this._params[name];
    } catch (error) {
      return undefined;
    }
  }

  get getParams() {
    return this._params;
  }

  get getCookies() {
    return this._cookies;
  }
}
