import TitlePage from "@/components/data/title";
import AdvertisementCorrespondenceFormComponent from "@/components/views/advertisement/correspondence/AdvertisementCorrespondenceFormComponent";
import HeaderPage from "@/components/views/partials/HeaderPage";
import { CONST_ADVERTISEMENT_TYPES } from "@/constants/advertisement.constant";
import { CONST_SYSTEM_NOT_PARAM_VIEW } from "@/constants/system.constant";
import { AdvertisementTypesByComplexController } from "@/controller/advertisement_types.controller";
import { CorrespondenceController } from "@/controller/correspondence.controller";
import { TokenUtils } from "@/utils/token.utils";
import { message } from "antd";
import { useRouter } from "next/router";
import React from "react";

const CorrespondenceCreate = ({ dataComplex, listDataTower }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();

  const onSubmit = async (values, image) => {
    try {
      const send = await CorrespondenceController.viewSubmitNew(values, image);
      if (send.error || send.statusCode != 200)
        throw new Error("No fue posible crear la correspondencia");
      messageApi.success("Correspondencia creada con éxito", 1, () =>
        router.push("/advertisement/correspondence/list-admin")
      );
      return true;
    } catch (error) {
      messageApi.warning("No fue posible crear la correspondencia");
      return false;
    }
  };

  const RenderedForm = () => {
    const data = CorrespondenceController.viewGetDataToForm();
    if (dataComplex) data.type_complex = dataComplex.complex_name;
    data.status_type = CONST_ADVERTISEMENT_TYPES.APARTMENT.id;
    return (
      <AdvertisementCorrespondenceFormComponent
        onSubmit={onSubmit}
        listDataTower={listDataTower}
        valuesToForm={data}
      />
    );
  };

  return (
    <>
      {contextHolder}
      <HeaderPage title={"Crear Correspondencia"} />
      <TitlePage level={2}>Crear Correspondencia</TitlePage>
      <RenderedForm />
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    // Obtenemos todas las cookies para hacer peticiones al backend
    const getCookies = TokenUtils.destructureAllCookiesClient(context);
    // Obtenemos los datos
    const getData =
      await AdvertisementTypesByComplexController.apiSSRListWithComplex(
        CONST_SYSTEM_NOT_PARAM_VIEW,
        getCookies
      );
    if (
      getData.error ||
      getData.statusCode != 200 ||
      !getData.payload?.listComplex
    )
      throw new Error("No fue posible obtener los datos");
    const { tower_complex, ..._complex } = getData.payload.listComplex;
    return {
      props: {
        dataComplex: _complex,
        listDataTower: tower_complex,
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

export default CorrespondenceCreate;
