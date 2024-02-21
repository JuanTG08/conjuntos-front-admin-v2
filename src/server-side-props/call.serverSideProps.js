import { CallController } from "@/controller/call.controller";
import { TowerController } from "@/controller/tower.controller";
import { ServerSideProps } from "@/lib/ServerSideProps";

export class CallServerSideProps extends ServerSideProps {
  constructor(props) {
    super(props);
  }

  async getCallUsers() {
    try {
      const [getCredentialsUser, getTowersApartment] =
        await this.guardFetch(
          CallController.apiSSRGetUserCredentials(this.getCookies),
          TowerController.apiListTowerApartment(this.getCookies),
        );
      this.validateResponseFetch({
        response: getCredentialsUser,
      });
      this.validateResponseFetch({
        response: getTowersApartment,
      });
      const userNameCall = `${getCredentialsUser?.payload?.cytophony_user}@${process.env?.CREDENTIAL_VOXIMPLANT_APP_NAME}.${process.env?.CREDENTIAL_VOXIMPLANT_APP_ACCOUNT}.${process.env?.CREDENTIAL_VOXIMPLANT_APP_URL}`;
      const apartments = getTowersApartment?.payload || [];
      this.setResponseProps({
        apartments,
        tokenUser: this.getCookies,
        userLogin: process.env?.USER_LOGIN_VOXIMPLANT,
        passwordLogin: process.env?.PASSWORD_LOGIN_VOXIMPLANT,
        numberPhone: process.env?.NUMBER_PHONE_VOXIMPLANT,
        userNameCall,
      });
    } catch (error) {
      console.log(error);
      this.setRedirect();
    }
  }
}
