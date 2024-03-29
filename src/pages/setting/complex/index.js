import TitlePage from "@/components/data/title";
import ComplexSettingBasicFormComponent from "@/components/views/complex/setting/ComplexSettingBasicFormComponent";
import HeaderPage from "@/components/views/partials/HeaderPage";
import { CONST_COLOMBIA_ID } from "@/constants/country.constant";
import { ComplexController } from "@/controller/complex.controller";
import { DepartmentCountryController } from "@/controller/department_country.controller";
import { MunicipalityController } from "@/controller/municipality.controller";
import { TokenUtils } from "@/utils/token.utils";
import { message } from "antd";

const SettingComplex = ({ complex, states, towns }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const onSubmitDataBasic = async (values) => {
    try {
      const sendData = await ComplexController.viewSubmitEditToSettingComplex(
        values
      );
      if (sendData.error || sendData.statusCode != 200)
        return messageApi.warning(sendData.message);
      messageApi.success("Se actualizo correctamente");
    } catch (error) {
      console.log(error);
    }
  };

  const RenderedFormBasic = () => {
    return (
      <ComplexSettingBasicFormComponent
        valuesToForm={ComplexController.viewGetDataToFormToAdminComplex(complex)}
        onSubmit={onSubmitDataBasic}
        resState={states}
        initialTowns={towns}
      />
    );
  };

  return (
    <>
      <HeaderPage title={"Configuración de Conjuntos Residenciales"} />
      {contextHolder}
      <div>
        <TitlePage>Configuración del conjunto residencial</TitlePage>
      </div>
      <RenderedFormBasic />
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    // Obtenemos todas las cookies para hacer peticiones al backend
    const getCookies = TokenUtils.destructureAllCookiesClient(context);
    const [complex, states] = await Promise.all([
      ComplexController.apiSSRGetOne(getCookies),
      DepartmentCountryController.apiSSRListAllDepartment(CONST_COLOMBIA_ID),
    ]);
    const towns = await MunicipalityController.apiSSRListAll(
      complex.payload?.complex_state
    );
    if (
      complex.error ||
      complex.statusCode != 200 ||
      states.error ||
      states.statusCode != 200
    )
      throw new Error("No contiene conjunto residencial");
    return {
      props: {
        complex: complex.payload,
        states: states.payload,
        towns: towns.payload || [],
      },
    };
  } catch (error) {
    console.log(error);
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
}

export default SettingComplex;
