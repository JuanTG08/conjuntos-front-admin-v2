import { CONST_COLOMBIA_ID } from "@/constants/country.constant";
import { ComplexController } from "@/controller/complex.controller";
import { DepartmentCountryController } from "@/controller/department_country.controller";
import { ServerSideProps } from "@/lib/ServerSideProps";

export class ComplexServerSideProps extends ServerSideProps {
  VAR_ID_COMPLEX = "idComplex";

  constructor(props) {
    super(props);
  }

  async GetComplexListIndex() {
    try {
      const getListComplex = await ComplexController.apiSSRGetListAll(
        this.getCookies
      );
      this.setResponseProps({
        listAllComplex: getListComplex?.payload || [],
      });
    } catch (error) {
      console.log(error);
      this.setRedirect();
    }
  }

  async ViewComplexEdit() {
    try {
      const idComplex = this.getParam(this.VAR_ID_COMPLEX);
      const [getDepartments, oneComplex] = await this.guardFetch(
        DepartmentCountryController.apiSSRListAllDepartment(CONST_COLOMBIA_ID),
        ComplexController.apiSSRGetOne(this.getCookies, idComplex)
      );
      this.validateResponseFetch({
        response: oneComplex
      });
      this.setResponseProps({
        idComplex,
        departments: getDepartments?.payload || [],
        complex: oneComplex?.payload,
      });
    } catch (error) {
      console.log(error);
      this.setRedirect();
    }
  }
}
