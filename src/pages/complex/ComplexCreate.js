import { ComplexFormComponent } from "@/components/views/complex/ComplexFormComponent";
import Router from "next/router";
import { ComplexController } from "@/controller/complex.controller";
import { Typography, message } from "antd";
import HeaderPage from "@/components/views/partials/HeaderPage";
import { DepartmentCountryController } from "@/controller/department_country.controller";
import { CONST_COLOMBIA_ID } from "@/constants/country.constant";

const ComplexCreate = ({ departments }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const onSubmit = async (data) => {
    try {
      const response = await ComplexController.viewSubmitNew(data);
      if (response.statusCode != 200 || response.error) {
        messageApi.error(response.message);
        return;
      }
      Router.push("/complex");
    } catch (error) {
      messageApi.error("Error de conexión");
    }
  };

  return (
    <>
      {contextHolder}
      <HeaderPage title={"Crear Conjunto Residencial"} />
      <Typography.Title level={1} style={{ textAlign: "center" }}>
        Crear Conjuntos
      </Typography.Title>
      <ComplexFormComponent
        onSubmit={onSubmit}
        valuesToForm={ComplexController.viewGetDataToForm()}
        departments={departments}
      />
    </>
  );
};

export const getServerSideProps = async () => {
  const getDepartments =
    await DepartmentCountryController.apiSSRListAllDepartment(
      CONST_COLOMBIA_ID
    );
  const departments = getDepartments.payload || [];
  return {
    props: {
      departments,
    },
  };
};

export default ComplexCreate;
