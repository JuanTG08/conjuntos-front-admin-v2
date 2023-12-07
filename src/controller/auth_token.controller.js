import Utils from "@/helpers/helpers";

const { AuthTokenFetching } = require("@/fetching/auth_token.fetch");

export class AuthTokenController {
  // Obtenemos el token de UA (Usuario Anónimo)
  static async apiGetTokenUA() {
    try {
      const response = await AuthTokenFetching.getApiPrincipalTokenUA();
      return response;
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Error interno");
    }
  }
}
