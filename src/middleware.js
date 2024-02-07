import { NextResponse } from "next/server";
import { env } from "../next.config";
import { TokenUtils } from "./utils/token.utils";
import Utils from "./helpers/helpers";
import { withAuth } from "next-auth/middleware";
import { AuthController } from "./controller/auth.controller";

// This function can be marked `async` if using `await` inside

const middleware = async (req) => {
  // Debug
  const debug = process.env.MODE_DEBUG || false;
  if (debug) console.log("Establece las variables");
  // Establecemos los nombres de las cookies
  const {
    main_role: { name: nameMainRoleCookie },
    user_access_paths: { name: nameUserAccessPathsCookie },
    user_information: { name: nameUserInformationCookie },
    nav_bar: { name: nameNavBarCookie },
  } = env.server.cookies;
  // Establecemos el response y el redirect
  const redirect = NextResponse.redirect(new URL("/login", req.url));
  const response = NextResponse.next();
  if (debug) console.log("Establece la función de eliminar");
  // Creamos función para eliminar las cookies
  const deleteCookies = () => {
    const { cookies } = req;
    if (debug) console.log("Obtenemos las cookies:", cookies);
    // Obtén un listado de las cookies en el navegador
    const cookieNames = Object.keys(cookies);
    if (debug) console.log("Eliminamos las cookies");
    // Recorrer el listado de cookies
    cookieNames.map((cookieName) => {
      // Eliminar las cookies
      response.cookies.delete(cookieName);
      redirect.cookies.delete(cookieName);
    });
    response.cookies.delete(nameMainRoleCookie);
    response.cookies.delete(nameUserAccessPathsCookie);
    response.cookies.delete(nameUserInformationCookie);
    response.cookies.delete(nameNavBarCookie);
    response.cookies.delete("next-auth.session-token");
    response.cookies.delete("next-auth.csrf-token");
    redirect.cookies.delete(nameMainRoleCookie);
    redirect.cookies.delete(nameUserAccessPathsCookie);
    redirect.cookies.delete(nameUserInformationCookie);
    redirect.cookies.delete(nameNavBarCookie);
    redirect.cookies.delete("next-auth.session-token");
    redirect.cookies.delete("next-auth.csrf-token");
  };

  if (debug) console.log("Establece la función de establecer cookies");
  const setCookies = (valueMR, valueUA, valueUI, valueNB) => {
    try {
      response.cookies.set(
        TokenUtils.setCookie(nameUserInformationCookie, valueUI)
      );
      response.cookies.set(TokenUtils.setCookie(nameMainRoleCookie, valueMR));
      response.cookies.set(
        TokenUtils.setCookie(nameUserAccessPathsCookie, valueUA)
      );
      response.cookies.set(TokenUtils.setCookie(nameNavBarCookie, valueNB));
      redirect.cookies.set(
        TokenUtils.setCookie(nameUserInformationCookie, valueUI)
      );
      redirect.cookies.set(TokenUtils.setCookie(nameMainRoleCookie, valueMR));
      redirect.cookies.set(
        TokenUtils.setCookie(nameUserAccessPathsCookie, valueUA)
      );
      redirect.cookies.set(TokenUtils.setCookie(nameNavBarCookie, valueNB));
    } catch (error) {
      if (debug) console.log(error);
      deleteCookies();
    }
  };
  try {
    if (debug) console.log("Obtenemos las cookies una por una");
    // Obtenemos todas las cookies
    let cookieMainRole = req.cookies.get(nameMainRoleCookie);
    if (debug) console.log("Cookie del rol principal:", cookieMainRole);
    let cookieUserAccessPaths = req.cookies.get(nameUserAccessPathsCookie);
    if (debug)
      console.log("Cookie de los paths de acceso:", cookieUserAccessPaths);
    let cookieUserInformation = req.cookies.get(nameUserInformationCookie);
    if (debug)
      console.log(
        "Cookie de la información del usuario:",
        cookieUserInformation
      );
    if (debug)
      console.log("Establecemos función de obtención de datos en los tokens");
    let cookieNavBar = req.cookies.get(nameNavBarCookie);
    if (debug) console.log("Cookie de la barra de navegación:", cookieNavBar);
    const destructureTokens = async (
      mainRol,
      userAccess,
      userInformation,
      _navBar
    ) => {
      try {
        const tokenValidMR = await TokenUtils.validTokenJOSE(mainRol);
        if (debug)
          console.log("Datos del token del rol principal:", tokenValidMR);
        const tokenValidUA = await TokenUtils.validTokenJOSE(userAccess);
        if (debug)
          console.log("Datos del token de los paths de acceso:", tokenValidUA);
        const tokenValidUI = await TokenUtils.validTokenJOSE(userInformation);
        if (debug)
          console.log(
            "Datos del token de la información del usuario:",
            tokenValidUI
          );
        const tokenValidNB = await TokenUtils.validTokenJOSE(_navBar);
        if (debug)
          console.log(
            "Datos del token de la barra de navegación:",
            tokenValidNB
          );
        return { tokenValidMR, tokenValidUA, tokenValidUI, tokenValidNB };
      } catch (error) {
        if (debug) console.log(error);
        return false;
      }
    };
    if (debug) console.log("Validamos sí existe el token de Auth0");
    // Validamos si no existen las cookies pero si el token del Auth0 de Google
    const userAuth0 = req?.nextauth?.token;
    if (debug) console.log("Token de Auth0:", userAuth0);
    if (
      (!cookieMainRole || !cookieUserAccessPaths || !cookieUserInformation || !cookieNavBar) &&
      userAuth0
    ) {
      if (debug)
        console.log(
          "Existe el token de Auth0 pero no existen los otros tokens"
        );
      if (debug)
        console.log(
          "Obtenemos los tokens de la API principal mediante el email:",
          userAuth0.email
        );
      const getTokens = await AuthController.apiPostLoginUser(userAuth0.email);
      if (debug) console.log("Tokens obtenidos:", getTokens);
      if (getTokens.error || getTokens.statusCode != 200)
        throw new Error("Usuario no existente");
      const [cookieMR, cookieUI, cookieUAP, cookieNB] = getTokens.payload;
      if (debug) console.log("Establecemos tokens al cliente");
      cookieMainRole = {
        name: nameMainRoleCookie,
        value: cookieMR,
      };
      cookieUserInformation = {
        name: nameUserInformationCookie,
        value: cookieUI,
      };
      cookieUserAccessPaths = {
        name: nameUserAccessPathsCookie,
        value: cookieUAP,
      };
      cookieNavBar = {
        name: nameNavBarCookie,
        value: cookieNB,
      };
      setCookies(cookieMR, cookieUAP, cookieUI, cookieNB);
    }
    if (debug)
      console.log(
        "Validamos si no existen los tokens y la ruta a acceder esta en el rango de '/api/auth'"
      );
    // Validamos si no existen los tokens y la ruta a acceder esta en el rango de "/api/auth"
    if (
      !cookieMainRole &&
      !cookieUserAccessPaths &&
      !cookieUserInformation &&
      !cookieNavBar &&
      !cookie(
        req.nextUrl.pathname.startsWith("/api/auth") ||
          Utils.validPathsToRedirectDashboard(req.nextUrl.pathname)
      )
    )
      return response;
    if (debug)
      console.log(
        "Validamos que no existan los 3 tokens cookieMainRole, cookieUserAccessPaths, cookieUserInformation"
      );
    // Validamos la existencia de los dos tokens
    if (
      !cookieMainRole ||
      !cookieUserAccessPaths ||
      !cookieUserInformation ||
      !cookieNavBar
    )
      throw new Error("No hay cookies");
    if (debug)
      console.log(
        "Validamos las rutas que no necesiten token y que se redireccionen al dashboard"
      );
    // Validamos las rutas que no necesiten token y que se redireccionen al dashboard
    if (Utils.validPathsToRedirectDashboard(req.nextUrl.pathname))
      return NextResponse.redirect(new URL("/dashboard", req.url));
    if (debug) console.log("Validamos si el token de Auth0 existe");
    // Validamos si el token de Auth0 existe
    if (!userAuth0) throw new Error("No tiene sesión");
    if (debug) console.log("Validamos si el token de Auth0 es válido");
    // Validamos si los tokens dentro de las cookies son válidos}
    const { tokenValidMR, tokenValidUA, tokenValidUI, tokenValidNB } =
      await destructureTokens(
        cookieMainRole.value,
        cookieUserAccessPaths.value,
        cookieUserInformation.value,
        cookieNavBar.value
      );
    if (debug) console.log("Validamos la integridad de los tokens");
    // Validamos la integridad de los tokens
    if (
      tokenValidMR.statusCode != 200 ||
      tokenValidUA.statusCode != 200 ||
      tokenValidUI.statusCode != 200 ||
      tokenValidNB.statusCode != 200
    )
      throw new Error("Cookies no validas");
    if (debug) console.log("Validamos la integridad de los tokens");
    // Obtenemos la información de los tokens
    const { mainRole } = tokenValidMR.payload;
    const { userAccessPaths } = tokenValidUA.payload;
    const userInformation = tokenValidUI.payload;
    const navBar = tokenValidNB.payload;
    if (debug) console.log("Validamos la información de los tokens");
    // Validamos la información de los tokens
    if (!mainRole || !userAccessPaths || !userInformation || !navBar)
      throw new Error("No hay datos claros");
    // Establecemos información para manejar la información del usuario
    // Debemos traer la información del usuario de la db
    // Debemos validar el email con el email del usuario autorizado de google
    if (debug)
      console.log("Validamos las rutas validas con la ruta que desea acceder");
    // Validamos las rutas
    const validPath = Utils.validPaths(
      req.nextUrl.pathname,
      req.method,
      userAccessPaths
    );
    // Si no existe la ruta se redirige a la pagina de inicio "Dashboard"
    if (!validPath) {
      if (debug)
        console.log(
          "La ruta no fue valida, por ende se redirigirá a la ruta principal del rol"
        );
      const redirectToMainPage = NextResponse.redirect(
        new URL(mainRole.access_page.path, req.url)
      );
      if (
        !cookieMainRole ||
        !cookieUserAccessPaths ||
        !cookieUserInformation ||
        !cookieNavBar
      ) {
        redirectToMainPage.cookies.set(
          response.cookies.get(nameMainRoleCookie)
        );
        redirectToMainPage.cookies.set(
          response.cookies.get(nameUserAccessPathsCookie)
        );
        redirectToMainPage.cookies.set(
          response.cookies.get(nameUserInformationCookie)
        );
        redirectToMainPage.cookies.set(response.cookies.get(nameNavBarCookie));
      }
      return redirectToMainPage;
    }
    if (debug)
      console.log(
        "La ruta es valida, por ende se redirigirá a la ruta solicitada"
      );
    return response;
  } catch (error) {
    if (debug) console.log(error);
    deleteCookies();
    return redirect;
  }
};

export default withAuth(middleware, {
  callbacks: {
    authorized: ({ token }) => {
      return true;
    },
  },
  pages: {
    error: "/403",
  },
});

export const config = {
  matcher: [
    "/access-person/:path*",
    "/admin/:path*",
    "/advertisement/:path*",
    "/apartment/:path*",
    "/api/access_page/:path*",
    "/api/access-person/:path*",
    "/api/advertisement/:path*",
    "/api/advertisement-types/:path*",
    "/api/apartment/:path*",
    "/api/apartment_user/:path*",
    "/api/call/:path*",
    "/api/complex/:path*",
    "/api/cookies/:path*",
    "/api/correspondence/:path*",
    "/api/files/",
    "/api/logs_book_incidents/:path*",
    "/api/moving/:path*",
    "/api/paths_to/:path*",
    "/api/pqrs/:path*",
    "/api/pet/:path*",
    "/api/roles/:path*",
    "/api/status/:path*",
    "/api/tower/:path*",
    "/api/user/:path*",
    "/api/user_roles/:path*",
    "/api/user_to_register/:path*",
    "/api/vehicles/:path*",
    "/blog",
    "/call",
    "/complex/:path*",
    "/dashboard/:path*",
    "/log-book/:path*",
    "/moving/:path*",
    "/pets/:path*",
    "/policy-and-privacy",
    "/pqrs/:path*",
    "/setting/:path*",
    "/support",
    "/tower/:path*",
    "/vehicles/:path*",
  ],
};
