import AdvertisementFormComponent from "@/components/views/advertisement/AdvertisementFormComponent";
import ComplexViewPanelCaptionComponent from "@/components/views/complex/ComplexViewPanelCaptionComponent";
import HeaderPage from "@/components/views/partials/HeaderPage";
import { CONST_ADVERTISEMENT_CATEGORY } from "@/constants/advertisement.constant";
import { AdvertisementController } from "@/controller/advertisement.controller";
import { AdvertisementTypesByComplexController } from "@/controller/advertisement_types.controller";
import { ComplexController } from "@/controller/complex.controller";
import { StatusController } from "@/controller/status.controller";
import { AdvertisementServerSideProps } from "@/server-side-props/advertisement.serverSideProps";
import { Typography, message } from "antd";
import Router, { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

const AdvertisementUpdate = ({
  idComplex,
  idAdvertisement,
  status,
  complex,
  advertisement,
  listTypes,
  listDataComplex,
  listDataTower,
}) => {
  // Creamos un estado para la carga de imágenes
  const [messageApi, contextHolder] = message.useMessage();
  const selectedMiniature = useRef(null);

  const onSubmit = async (values, image) => {
    try {
      values.category_adv = CONST_ADVERTISEMENT_CATEGORY.ADVERTISEMENT.ID;
      const send = await AdvertisementController.viewPutEdit(
        values,
        image,
        idComplex,
        idAdvertisement
      );
      if (send.error || send.statusCode != 200)
        return messageApi.error(send.message);
      messageApi.success("Se actualizó correctamente");
    } catch (error) {
      messageApi.error(error);
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
    /*
    if (!advertisement || !listTypes || !listDataComplex || !listDataTower)
      return <>Cargando...</>;
    */
    return (
      <>
        <AdvertisementFormComponent
          onSubmit={onSubmit}
          valuesToForm={AdvertisementController.viewGetDataToForm(
            advertisement
          )}
          idComplex={idComplex}
          selectedMiniature={selectedMiniature}
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
      <HeaderPage title={"Editar anuncios"} />
      <div>
        <Typography.Title level={1} style={{ textAlign: "center" }}>
          Actualizar anuncio
        </Typography.Title>
      </div>
      <div className="my-3">
        <RenderedCaption />
      </div>
      <RenderedForm />
    </>
  );
};

export async function getServerSideProps(context) {
  const server = new AdvertisementServerSideProps(context);
  await server.AdvertisementUpdate();
  return server.response;
}

export default AdvertisementUpdate;
