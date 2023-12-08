import TitlePage from "@/components/data/title";
import HeaderPage from "@/components/views/partials/HeaderPage";
import PetsFormComponent from "@/components/views/pets/PetsFormComponent";
import { PetsController } from "@/controller/pets.controller";
import { TokenUtils } from "@/utils/token.utils";
import { message } from "antd";
import React from "react";

const ViewUpdatePet = ({
  pet,
  petTypes,
  colorsPet,
  otherBreed,
  behaviorPet,
  idPet,
}) => {
  const [messageApi, contextHolder] = message.useMessage();

  const onSubmit = async (values) => {
    try {
      const send = await PetsController.viewUpdatePet(values, idPet);
      if (send.error || send.statusCode != 200)
        return messageApi.error(send.message);
      messageApi.success("Se actualizó correctamente");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {contextHolder}
      <HeaderPage title="Editar tu mascota" />
      <TitlePage>Editar tu mascota</TitlePage>
      <PetsFormComponent
        valuesToForm={PetsController.viewGetDataToForm(pet)}
        onSubmit={onSubmit}
        typePets={petTypes}
        colorsPet={colorsPet}
        behaviorPet={behaviorPet}
        otherBreed={otherBreed}
        buttonLabel="Actualizar mascota"
      />
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    // Obtenemos todas las cookies para hacer peticiones al backend
    const getCookies = TokenUtils.destructureAllCookiesClient(context);
    const idPet = context.query?.idPet;
    // Obtenemos el listado de mascotas
    const getPet = await PetsController.apiSSRGetOnePetToResident(
      idPet,
      getCookies
    );
    if (getPet.error || getPet.statusCode != 200)
      throw new Error("No fue posible obtener los datos");
    // Obtenemos los datos necesarios para el formulario
    const getData = await PetsController.apiSSRGetDataForm(getCookies);
    if (getData.error || getData.statusCode != 200)
      throw new Error("No fue posible obtener los datos");
    return {
      props: {
        pet: getPet.payload,
        idPet,
        ...getData.payload,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      redirect: {
        destination: "/pets",
        permanent: false,
      },
    };
  }
}

export default ViewUpdatePet;
