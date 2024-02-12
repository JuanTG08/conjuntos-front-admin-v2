import { ComplexController } from "@/controller/complex.controller";
import { ServicePlansController } from "@/controller/service_plans.controller";
import { ServerSideProps } from "@/lib/ServerSideProps";

export class PlanAndServiceServerSideProps extends ServerSideProps {
  VAR_ID_COMPLEX = "idComplex";
  constructor(context) {
    super(context);
  }

  async ViewPlanAndServiceToComplex() {
    try {
      const idComplex = this.getParam(this.VAR_ID_COMPLEX);
      const [getData, getDataToSet] = await this.guardFetch(
        ComplexController.apiSSRGetListPlanAndService(
          idComplex,
          this.getCookies
        ),
        ServicePlansController.apiSSRGetDataToSetComplex(this.getCookies)
      );
      this.validateResponseFetch({
        response: getData,
        toRedirect: "/complex",
      });
      this.validateResponseFetch({
        response: getDataToSet,
        toRedirect: "/complex",
      });
      this.setResponseProps({
        idComplex,
        complex: getData.payload,
        plansAndServices: getDataToSet.payload?.plansAndServices || [],
        plansAndServicesStatus:
          getDataToSet.payload?.plansAndServicesStatus || [],
        facturationPeriod: getDataToSet.payload?.facturationPeriod || [],
        currencies: getDataToSet.payload?.currencies || [],
      });
    } catch (error) {
      console.log(error);
      this.setRedirect();
    }
  }
}
