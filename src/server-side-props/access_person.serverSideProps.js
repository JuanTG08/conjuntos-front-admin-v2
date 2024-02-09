import { AccessPersonController } from "@/controller/access_person.controller";
import { ServerSideProps } from "@/lib/ServerSideProps";

export class AccessPersonServerSideProps extends ServerSideProps {
  VAR_ID_ACCESS_PERSON = "idAccessPerson";

  constructor(context) {
    super(context);
  }

  async AccessPersonListToUser() {
    try {
      const getData = await this.guardFetch(
        AccessPersonController.apiSSRGetAccessPersonToApartment(this.getCookies)
      );
      this.setResponseProps({
        access_people: getData.payload || [],
      });
    } catch (error) {
      console.log(error);
      this.setRedirect();
    }
  }

  async ViewOneAccessPerson() {
    try {
      const idAccessPerson = this.getParam(this.VAR_ID_ACCESS_PERSON);
      const getData = await this.guardFetch(
        AccessPersonController.apiSSRGetOneAccessPerson(
          idAccessPerson,
          this.getCookies
        )
      );
      this.validateResponseFetch({
        response: getData,
        toRedirect: "/access-person",
      });
      this.setResponseProps({
        accessPerson: getData.payload,
      });
    } catch (error) {
      console.log(error);
      this.setRedirect();
    }
  }

  async AccessPersonList() {
    try {
      const getData = await this.guardFetch(
        AccessPersonController.apiSSRGetListAccessPersonToComplex(
          this.getCookies
        )
      );
      this.setResponseProps({
        accessPeople: getData.payload || [],
      });
    } catch (error) {
      console.log(error);
      this.setRedirect();
    }
  }
}
