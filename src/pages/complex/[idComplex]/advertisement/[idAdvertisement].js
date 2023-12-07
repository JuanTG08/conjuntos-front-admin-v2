import AdvertisementFormComponent from "@/components/views/advertisement/AdvertisementFormComponent";
import ComplexViewPanelCaptionComponent from "@/components/views/complex/ComplexViewPanelCaptionComponent";
import HeaderPage from "@/components/views/partials/HeaderPage";
import { CONST_ADVERTISEMENT_CATEGORY } from "@/constants/advertisement.constant";
import { AdvertisementController } from "@/controller/advertisement.controller";
import { AdvertisementTypesByComplexController } from "@/controller/advertisement_types.controller";
import { ComplexController } from "@/controller/complex.controller";
import { StatusController } from "@/controller/status.controller";
import { Typography, message } from "antd";
import Router, { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

const AdvertisementUpdate = ({ idComplex, idAdvertisement }) => {
  // Creamos un estado para la carga de imágenes
  const [messageApi, contextHolder] = message.useMessage();
  const selectedMiniature = useRef(null);
  const [complex, setComplex] = useState();
  const [advertisement, setAdvertisement] = useState();
  const [status, setStatus] = useState([]);

  const router = useRouter();

  // Listado de tipos de anuncios
  const [listTypes, setListTypes] = useState([]);
  // Datos del conjunto específicos para los campos dependiendo del tipo
  const [listDataComplex, setListDataComplex] = useState([]);
  // Datos de las torres para los campos dependiendo del tipo
  const [listDataTower, setListDataTower] = useState([]);

  useEffect(() => {
    if (!complex) fetchOneComplex();
    if (!advertisement) fetchOneAdvertisement();
    if (!listTypes || listTypes.length === 0)
      fetchListAdvertisementTypesWithComplex();
    fetchStatusAdvertisement();
  }, []);

  const fetchOneComplex = async () => {
    try {
      const oneComplex = await ComplexController.viewOne(idComplex);
      if (!oneComplex.error && oneComplex.statusCode == 200) {
        setComplex(oneComplex.payload);
      } else {
        Router.push("/complex");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOneAdvertisement = async () => {
    try {
      const getOneAdvertisement = await AdvertisementController.viewGetOneById(
        idAdvertisement
      );
      if (!getOneAdvertisement.error && getOneAdvertisement.statusCode == 200) {
        return setAdvertisement(getOneAdvertisement.payload);
      }
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  // Función para obtener los datos
  const fetchListAdvertisementTypesWithComplex = async () => {
    try {
      const list =
        await AdvertisementTypesByComplexController.viewListWithComplex(
          idComplex
        );
      if (list.error || list.statusCode != 200)
        return console.log(list.message);
      // Desestructuramos los datos para especificarlos
      const { tower_complex, ..._complex } = list.payload.listComplex;
      setListDataComplex(_complex);
      setListDataTower(tower_complex);
      setListTypes(list.payload.listAdvType);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStatusAdvertisement = async () => {
    try {
      const listStatus = await StatusController.viewGetStatusAdvertisement();
      if (listStatus.error || listStatus.statusCode != 200)
        return console.log(listStatus.message);
      setStatus(listStatus.payload);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (values) => {
    try {
      let image = undefined;
      if (values.miniature && values.miniature?.file?.originFileObj)
        image = values.miniature.file.originFileObj;
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
  const { idComplex, idAdvertisement } = context.query;
  return {
    props: {
      idComplex,
      idAdvertisement,
    },
  };
}

export default AdvertisementUpdate;
