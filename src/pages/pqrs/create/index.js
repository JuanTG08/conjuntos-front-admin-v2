import TitlePage from "@/components/data/title";
import HeaderPage from "@/components/views/partials/HeaderPage";
import PQRSFormComponent from "@/components/views/pqrs/PQRSFormComponent";
import { PQRSController } from "@/controller/pqrs.controller";
import { TokenUtils } from "@/utils/token.utils";
import { message } from "antd";
import { useRouter } from "next/router";
import React from "react";

const ViewPQRSCreate = ({ typesRequest, categoryRequest, priority }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const onSubmit = async (values) => {
    try {
      const response = await PQRSController.viewSubmitNew(values);
      if (response.error || response.statusCode != 200)
        return messageApi.error("No fue posible crear la pqr");
      router.push("/pqrs/info");
      return;
    } catch (error) {
      console.log(error);
      return;
    }
  };
  return (
    <>
      {contextHolder}
      <HeaderPage title="Crear PQRS" />
      <TitlePage>Crear PQRS</TitlePage>
      <PQRSFormComponent
        typesRequest={typesRequest}
        categoryRequest={categoryRequest}
        priority={priority}
        onSubmit={onSubmit}
        valuesToForm={PQRSController.viewGetDataToForm()}
        buttonLabel="Crear PQRS"
      />
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    // Obtenemos todas las cookies para hacer peticiones al backend
    const getCookies = TokenUtils.destructureAllCookiesClient(context);
    // Obtenemos los datos necesarios para el formulario
    const getData = await PQRSController.apiSSRGetDataToForm(getCookies);
    if (getData.error || getData.statusCode != 200)
      throw new Error("No fue posible obtener los datos");
    return {
      props: {
        ...getData.payload,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/pqrs/info",
        permanent: false,
      },
    };
  }
}

export default ViewPQRSCreate;
