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
        valuesToForm={ComplexController.viewGetDataToForm(complex)}
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
    // Obtenemos el conjunto actual
    const complex = await ComplexController.apiSSRGetOne(getCookies);
    if (complex.error || complex.statusCode != 200)
      throw new Error("No contiene conjunto residencial");
    // Obtenemos los departamentos totales
    const states = await DepartmentCountryController.apiSSRListAllDepartment(
      CONST_COLOMBIA_ID
    );
    if (states.error || states.statusCode != 200)
      throw new Error("Error al obtener todos los Estados");
    // Obtenemos los municipios del actual departamento
    const towns = await MunicipalityController.apiSSRListAll(
      complex.payload?.complex_state
    );
    return {
      props: {
        complex: complex.payload,
        states: states.payload,
        towns: towns.payload || [],
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
}

export default SettingComplex;
