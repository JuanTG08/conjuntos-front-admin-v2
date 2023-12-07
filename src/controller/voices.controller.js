import { CallFetching } from "@/fetching/call.fetch";
import Utils from "@/helpers/helpers";
import VoiceResponse from "twilio/lib/twiml/VoiceResponse";

export class VoicesRouter {
  static async voiceResponse(req, res) {
    let twiml = new VoiceResponse();
    try {
      const callerId = process.env.TWILIO_CALLER_ID;
      const nameClient = req.body.Caller;

      const idUserToCall = parseInt(req.body.To);
      const tokenOuth = {
        mainRoleToken: req.body.mainRoleToken,
        userDataToken: req.body.userDataToken,
      };
      if (!Utils.verifyId(idUserToCall)) throw new Error("Error en el número");
      const getNumber = await CallFetching.getApiPrincipalNumber(
        idUserToCall,
        tokenOuth
      );
      if (getNumber.error || getNumber.statusCode != 200)
        throw new Error("Ningún usuario con ese número");
      const numberPhone = getNumber.payload.mobile_phone;
      const codeCountry =
        getNumber?.payload?.municipality?.department_country?.country
          ?.code_country;
      const toNumberOrClientName = `${codeCountry}${numberPhone}`;
      if (toNumberOrClientName == callerId) {
        let dial = twiml.dial();
        dial.client(nameClient);
      } else if (toNumberOrClientName) {
        let dial = twiml.dial({ callerId });
        const attr = Utils.isAValidPhoneNumber(toNumberOrClientName)
          ? "number"
          : "client";
        dial[attr]({}, toNumberOrClientName);
      } else {
        twiml.say("¡Gracias por llamar!");
      }
      res.setHeader("Content-Type", "text/xml");
      res.write(twiml.toString());
      res.end();
    } catch (error) {
      console.log(error);
      twiml.say("¡Error al llamar!");
      res.setHeader("Content-Type", "text/xml");
      res.write(twiml.toString());
      res.end();
    }
  }

  static async voiceStatus(req, res) {
    try {
    } catch (error) {}
  }
}
