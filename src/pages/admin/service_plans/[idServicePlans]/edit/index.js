import TitlePage from "@/components/data/title";
import HeaderPage from "@/components/views/partials/HeaderPage";
import PlanAndServiceFormComponent from "@/components/views/plan-and-service/PlanAndServiceFormComponent";
import { ServicePlansController } from "@/controller/service_plans.controller";
import { StatusController } from "@/controller/status.controller";
import { TokenUtils } from "@/utils/token.utils";
import { message } from "antd";
import React from "react";

const ViewEditPlanAndService = ({ idServicePlans, plan_service, status }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const onSubmit = async (values) => {
    try {
      const upt = await ServicePlansController.viewPutModify(idServicePlans, values);
      if (upt.error || upt.statusCode != 200)
        throw new Error("No fue posible crear la barra de navegación");
      messageApi.success("Barra de navegación actualizada exitosamente", 2);
      return false;
    } catch (error) {
      console.log(error)
      messageApi.error("No fue posible crear la barra de navegación");
      return false;
    }
  };
  return (
    <>
      <HeaderPage title={"Editar plan y servicio"} />
      <TitlePage>Editar plan y servicio</TitlePage>
      {contextHolder}
      <PlanAndServiceFormComponent
        onSubmit={onSubmit}
        valuesToForm={plan_service}
        status={status}
        buttonLabel="Editar  plan y servicio"
      />
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    // Obtenemos todas las cookies para hacer peticiones al backend
    const getCookies = TokenUtils.destructureAllCookiesClient(context);
    // Obtenemos el ID
    const idServicePlans = context.query.idServicePlans;
    // Obtenemos los datos
    const [getData, getStatus] = await Promise.all([
      ServicePlansController.apiSSRGetOne(idServicePlans, getCookies),
      StatusController.apiSSRGetStatusSpecific(
        StatusController.apiGetStatusPlanAndService(),
        getCookies
      ),
    ]);
    if (
      getData.error ||
      !getData.payload ||
      getData.statusCode != 200 ||
      getStatus.error ||
      getStatus.statusCode != 200
    )
      throw new Error("Error al intentar obtener los datos");
    return {
      props: {
        idServicePlans,
        plan_service: getData.payload,
        status: getStatus.payload,
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

export default ViewEditPlanAndService;
