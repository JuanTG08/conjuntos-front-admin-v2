import TitlePage from "@/components/data/title";
import NavBarFormComponent from "@/components/views/nav_bar/NavBarFormComponent";
import HeaderPage from "@/components/views/partials/HeaderPage";
import { NavBarController } from "@/controller/nav_bar.controller";
import { RolesController } from "@/controller/roles.controller";
import { ServicePlansController } from "@/controller/service_plans.controller";
import { TokenUtils } from "@/utils/token.utils";
import { message } from "antd";
import { useRouter } from "next/router";
import React from "react";

const ViewNavBarCreate = ({ roles, servicePlans }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const onSubmit = async (values) => {
    try {
      const submit = await NavBarController.viewPostNewNavBar(values);
      if (submit.error || submit.statusCode != 200)
        throw new Error(submit.message);
      messageApi.success("Barra de Navegación creada con éxito", 2, () =>
        router.push("/admin/nav_bar")
      );
      return true;
    } catch (error) {
      messageApi.error("No fue posible crear la barra de navegación");
      return false;
    }
  };
  return (
    <>
      {contextHolder}
      <HeaderPage title={"Crear Barra de Navegación"} />
      <TitlePage>Crear Barra de Navegación</TitlePage>
      <NavBarFormComponent
        valuesToForm={{}}
        roles={roles}
        servicePlans={servicePlans}
        onSubmit={onSubmit}
        buttonLabel="Crear barra de Navegación"
      />
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    // Obtenemos todas las cookies para hacer peticiones al backend
    const getCookies = TokenUtils.destructureAllCookiesClient(context);
    // Obtenemos los datos
    const getRoles = await RolesController.apiSSRGetListAll(getCookies);
    const getServicePlans = await ServicePlansController.apiSSRGetListAll(
      getCookies
    );
    return {
      props: {
        roles: getRoles.payload || [],
        servicePlans: getServicePlans.payload || [],
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

export default ViewNavBarCreate;
