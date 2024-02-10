import { ComplexController } from "@/controller/complex.controller";
import { ServerSideProps } from "@/lib/ServerSideProps";

export class PlanAndServiceServerSideProps extends ServerSideProps {
  VAR_ID_COMPLEX = "idComplex";
  constructor(context) {
    super(context);
  }

  async ViewPlanAndServiceToComplex() {
    try {
      const idComplex = this.getParam(this.VAR_ID_COMPLEX);
      const getData = await this.guardFetch(
        ComplexController.apiSSRGetListPlanAndService(
          idComplex,
          this.getCookies
        )
      );
      this.validateResponseFetch({
        response: getData,
        toRedirect: "/complex",
      });
      this.setResponseProps({
        complex: getData.payload,
      });
    } catch (error) {
      console.log(error);
      this.setRedirect();
    }
  }
}
