import { ComplexController } from "@/controller/complex.controller";
import { ServerSideProps } from "@/lib/ServerSideProps";

export class ComplexServerSideProps extends ServerSideProps {
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
}
