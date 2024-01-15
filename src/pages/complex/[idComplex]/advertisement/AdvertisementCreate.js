import AdvertisementFormComponent from "@/components/views/advertisement/AdvertisementFormComponent";
import ComplexViewPanelCaptionComponent from "@/components/views/complex/ComplexViewPanelCaptionComponent";
import HeaderPage from "@/components/views/partials/HeaderPage";
import { CONST_ADVERTISEMENT_CATEGORY } from "@/constants/advertisement.constant";
import { AdvertisementController } from "@/controller/advertisement.controller";
import { AdvertisementTypesByComplexController } from "@/controller/advertisement_types.controller";
import { ComplexController } from "@/controller/complex.controller";
import { StatusController } from "@/controller/status.controller";
import { TokenUtils } from "@/utils/token.utils";
import { Typography, message } from "antd";
import Router from "next/router";
import React from "react";
import { env } from "../../../../../next.config";
import { useRouter } from "next/router";

const AdvertisementCreate = ({
  idComplex,
  complex,
  status,
  listTypes,
  listDataComplex,
  listDataTower,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();

  const onSubmit = async (values, image) => {
    try {
      console.log(image);
      values.category_adv = CONST_ADVERTISEMENT_CATEGORY.ADVERTISEMENT.ID;
      const send = await AdvertisementController.viewSubmitNew(
        values,
        image,
        idComplex,
        complex.id_complex
      );
      if (send.error && send.statusCode != 200)
        throw new Error("No fue posible crear este anuncio");
      messageApi.success("Se creo correctamente el anuncio", 1, () =>
        router.push(`/complex/${idComplex}/advertisement`)
      );
      return true;
    } catch (error) {
      messageApi.error("No fue posible crear el anuncio.");
      return false;
    }
  };

  const RenderedCaption = () => {
    if (!complex) return <>Cargando...</>;
    return (
      <>
        <ComplexViewPanelCaptionComponent complex={complex} />
      </>
    );
  };

  const RenderedForm = () => {
    const data = AdvertisementController.viewGetDataToForm();
    data.type_complex = complex.complex_name;
    return (
      <>
        <AdvertisementFormComponent
          onSubmit={onSubmit}
          valuesToForm={data}
          idComplex={idComplex}
          listDataComplex={listDataComplex}
          listDataTower={listDataTower}
          listTypes={listTypes}
          status={status}
        />
      </>
    );
  };

  return (
    <>
      {contextHolder}
      <HeaderPage title={"Crear anuncios"} />
      <Typography.Title level={1} style={{ textAlign: "center" }}>
        Crear anuncio
      </Typography.Title>
      <div className="my-3">
        <RenderedCaption />
      </div>
      <RenderedForm />
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    const { idComplex } = context.query;
    const getCookies = TokenUtils.destructureAllCookiesClient(context);
    const complex = await ComplexController.apiSSRGetOne(getCookies, idComplex);
    if (complex.error || complex.statusCode != 200)
      throw new Error("No fue posible obtener el conjunto residencial");
    const status = await StatusController.apiSSRGetStatusSpecific(
      env._API.routes.status.types.VAR_STATUS_TO_ADVERTISEMENT,
      getCookies
    );
    if (status.error || status.statusCode != 200)
      throw new Error("No fue posible obtener los estados de los anuncios");
    const getInfoComplex =
      await AdvertisementTypesByComplexController.apiSSRListWithComplex(
        idComplex,
        getCookies
      );
    if (getInfoComplex.error || getInfoComplex.statusCode != 200)
      throw new Error(
        "No fue posible obtener la información relacionada al conjunto"
      );
    const { tower_complex, ..._complex } = getInfoComplex.payload.listComplex;
    return {
      props: {
        idComplex,
        complex: complex.payload,
        status: status.payload,
        listDataComplex: _complex, // Datos del conjunto específicos para los campos dependiendo del tipo
        listDataTower: tower_complex, // Datos de las torres para los campos dependiendo del tipo
        listTypes: getInfoComplex.payload.listAdvType, // Listado de tipos de anuncios
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

export default AdvertisementCreate;
