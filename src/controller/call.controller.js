import { CallFetching } from "@/fetching/call.fetch";
import Utils from "@/helpers/helpers";
import twilioClient from "@/lib/Twilio.lib";
import { env } from "../../next.config";
import AccessToken, { VoiceGrant } from "twilio/lib/jwt/AccessToken";
export class CallController {
  static async apiExecuteCall(req, res) {
    try {
      const cookie = req.cookies[env.server.cookies.main_cookie.name];
      const idUser = parseInt(req.query?.idUser);
      if (!Utils.verifyId(idUser))
        return res.json(Utils.Message(true, 500, "Parámetros fuera de rango"));
      const getNumber = await CallFetching.getApiPrincipalNumber(
        idUser,
        cookie
      );
      if (getNumber.error || getNumber.statusCode != 200)
        return res.json(Utils.Message(true, 500, "Usuario no existente"));
      const countryCode = "+57";
      const numberPhone = `${countryCode}${getNumber.payload.mobile_phone}`;
      console.log(numberPhone);
      twilioClient.calls
        .create({
          url: "https://85fa-186-84-89-164.ngrok.io",
          to: numberPhone,
          from: "+12565701094",
        })
        .then((phoneCall) => {
          console.log(phoneCall);
        })
        .catch((error) => console.log(error));
      return res.json(Utils.Message(true, 200, "Success"));
    } catch (error) {
      console.log(error);
      return res.json(Utils.Message(true, 500, "Error"));
    }
  }

  static async viewExecuteCall() {
    try {
      const send = await CallFetching.executeApiLocal();
      return send;
    } catch (error) {
      return Utils.Message(true, 500, "Error");
    }
  }

  static apiGenerateToken() {
    const identity = "JuanDavidTriana";
    const accessToken = new AccessToken(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_API_KEY,
      process.env.TWILIO_API_SECRET,
      {
        identity,
      }
    );
    const grant = new VoiceGrant({
      outgoingApplicationSid: process.env.TWILIO_TWIML_APP_SID,
      incomingAllow: true,
    });
    accessToken.addGrant(grant);
    return {
      identity,
      token: accessToken.toJwt(),
    };
  }
}
