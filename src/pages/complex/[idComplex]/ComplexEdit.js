import { ComplexFormComponent } from "@/components/views/complex/ComplexFormComponent";
import HeaderPage from "@/components/views/partials/HeaderPage";
import { CONST_COLOMBIA_ID } from "@/constants/country.constant";
import { ComplexController } from "@/controller/complex.controller";
import { DepartmentCountryController } from "@/controller/department_country.controller";
import { ComplexServerSideProps } from "@/server-side-props/complex.serverSideProps";
import { TokenUtils } from "@/utils/token.utils";
import { Typography, message } from "antd";

const ComplexEdit = ({ idComplex, departments, complex }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const onSubmit = async (data) => {
    try {
      const response = await ComplexController.viewSubmitEdit(data, idComplex);
      if (response.statusCode == 200)
        return messageApi.success(response.message);
      messageApi.error(response.message);
    } catch (error) {
      messageApi.error("Error de conexión");
    }
  };

  const RenderEditForm = () => {
    const valuesData = ComplexController.viewGetDataToForm(complex);
    return (
      <>
        <Typography.Title level={1} style={{ textAlign: "center" }}>
          Editar Conjunto {complex.complex_name}
        </Typography.Title>
        <ComplexFormComponent
          onSubmit={onSubmit}
          valuesToForm={valuesData}
          departments={departments}
        />
      </>
    );
  };

  return (
    <>
      {contextHolder}
      <HeaderPage title={"Editar Conjunto"} />
      <RenderEditForm />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const server = new ComplexServerSideProps(context);
  await server.ViewComplexEdit();
  return server.response;
};

export default ComplexEdit;
