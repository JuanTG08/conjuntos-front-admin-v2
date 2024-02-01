import TitlePage from "@/components/data/title";
import NavBarFormComponent from "@/components/views/nav_bar/NavBarFormComponent";
import HeaderPage from "@/components/views/partials/HeaderPage";
import { NavBarController } from "@/controller/nav_bar.controller";
import { TokenUtils } from "@/utils/token.utils";
import { message } from "antd";
import { useRouter } from "next/router";
import React from "react";

const ViewOneNavBar = ({ findOne, roles, servicePlans, idNavBar }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const onSubmit = async (values) => {
    try {
      const submit = await NavBarController.viewPutEditNavBar(idNavBar, values);
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
      <HeaderPage title={"Editar Barra de Navegación"} />
      <TitlePage>Editar Barra de Navegación</TitlePage>
      <NavBarFormComponent
        valuesToForm={NavBarController.viewGetDataToForm(findOne)}
        roles={roles}
        servicePlans={servicePlans}
        onSubmit={onSubmit}
        buttonLabel="Editar barra de Navegación"
      />
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    // Obtenemos todas las cookies para hacer peticiones al backend
    const getCookies = TokenUtils.destructureAllCookiesClient(context);
    // Obtenemos el ID
    const idNavBar = context.query.idNavBar;
    // Obtenemos los datos
    const getData = await NavBarController.apiSSRGetOne(idNavBar, getCookies);
    if (getData.error || !getData.payload || getData.statusCode != 200)
      throw new Error("Error al intentar obtener los datos");
    return {
      props: {
        idNavBar,
        ...getData.payload,
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

export default ViewOneNavBar;
