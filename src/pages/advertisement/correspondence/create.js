import TitlePage from "@/components/data/title";
import AdvertisementCorrespondenceFormComponent from "@/components/views/advertisement/correspondence/AdvertisementCorrespondenceFormComponent";
import HeaderPage from "@/components/views/partials/HeaderPage";
import { CONST_ADVERTISEMENT_TYPES } from "@/constants/advertisement.constant";
import { AdvertisementTypesByComplexController } from "@/controller/advertisement_types.controller";
import { CorrespondenceController } from "@/controller/correspondence.controller";
import { message } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const CorrespondenceCreate = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  // Datos del conjunto específicos para los campos dependiendo del tipo
  const [dataComplex, setDataComplex] = useState();
  // Datos de las torres para los campos dependiendo del tipo
  const [listDataTower, setListDataTower] = useState([]);

  const [errors, setErrors] = useState([]);

  useEffect(() => {
    fetchListAdvertisementTypesWithComplex();
  }, []);

  const fetchListAdvertisementTypesWithComplex = async () => {
    try {
      const list =
        await AdvertisementTypesByComplexController.viewListWithComplex();
      if (list.error || list.statusCode != 200)
        return console.log(list.message);
      // Desestructuramos los datos para especificarlos
      const { tower_complex, ..._complex } = list.payload.listComplex;
      setDataComplex(_complex);
      setListDataTower(tower_complex);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (values, image) => {
    try {
      setErrors((prevData) => [
        ...prevData,
        `Cargamos los datos ${JSON.stringify(values)}`,
        `Cargamos la imagen: ${!!image}`,
      ]);
      const send = await CorrespondenceController.viewSubmitNew(values, image);
      setErrors((prevData) => [
        ...prevData,
        `Enviamos y recibimo una respuesta ${JSON.stringify(send)}`,
        `Obtenemos los valores del payload ${JSON.stringify(send.payload)}`,
      ]);
      if (send.error || send.statusCode != 200)
        throw new Error("No fue posible crear la correspondencia");
      messageApi.success(
        "Correspondencia creada con éxito",
        1 /*, () =>
        router.push("/advertisement/correspondence/list-admin")
      */
      );
      return true;
    } catch (error) {
      setErrors((prevData) => [
        ...prevData,
        `Error Catch onSubmit ${error.message}`,
      ]);
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
      <div className="bg-red-500 p-3 m-3">
        {errors.map((error, index) => (
          <h4 key={index} className="mb-5">{error}</h4>
        ))}
      </div>

      <RenderedForm />
    </>
  );
};

export default CorrespondenceCreate;
