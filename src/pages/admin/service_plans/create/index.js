import TitlePage from "@/components/data/title";
import HeaderPage from "@/components/views/partials/HeaderPage";
import PlanAndServiceFormComponent from "@/components/views/plan-and-service/PlanAndServiceFormComponent";
import { ServicePlansController } from "@/controller/service_plans.controller";
import { StatusController } from "@/controller/status.controller";
import { TokenUtils } from "@/utils/token.utils";
import { message } from "antd";
import { useRouter } from "next/router";
import React from "react";

const ViewCreateNewPlanAndService = ({ status }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const onSubmit = async (values) => {
    try {
      const create = await ServicePlansController.viewPostCreateNew(values);
      if (create.error || create.statusCode != 200)
        throw new Error("No fue posible crear la barra de navegación");
      messageApi.success("Barra de navegación creada exitosamente", 2, () =>
        router.push("/admin/service_plans")
      );
      return true;
    } catch (error) {
      messageApi.error("No fue posible crear la barra de navegación");
      return false;
    }
  };

  return (
    <>
      <HeaderPage title={"Crear plan y servicio"} />
      <TitlePage>Plan y servicio</TitlePage>
      {contextHolder}
      <PlanAndServiceFormComponent
        onSubmit={onSubmit}
        valuesToForm={{
          visibility: true,
        }}
        status={status}
        buttonLabel="Crear plan y servicio"
      />
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    // Obtenemos todas las cookies para hacer peticiones al backend
    const getCookies = TokenUtils.destructureAllCookiesClient(context);
    // Obtenemos los datos necesarios para el formulario
    const getData = await StatusController.apiSSRGetStatusSpecific(
      StatusController.apiGetStatusPlanAndService(),
      getCookies
    );
    return {
      props: {
        status: getData.payload || [],
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

export default ViewCreateNewPlanAndService;
