import TitlePage from "@/components/data/title";
import HeaderPage from "@/components/views/partials/HeaderPage";
import PetsFormComponent from "@/components/views/pets/PetsFormComponent";
import { PetsController } from "@/controller/pets.controller";
import { TokenUtils } from "@/utils/token.utils";
import { message } from "antd";
import { useRouter } from "next/router";
import React from "react";

const CreatePets = ({ petTypes, colorsPet, otherBreed, behaviorPet }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const onSubmit = async (values) => {
    try {
      const send = await PetsController.viewSubmitNew(values);
      if (send.error || send.statusCode != 200) throw new Error(send.message);
      router.push("/pets");
    } catch (error) {
      messageApi.error("No fue posible crear tu mascota");
    }
  };
  return (
    <>
      {contextHolder}
      <HeaderPage title="Crear mascota" />
      <TitlePage>Crear mascota</TitlePage>
      <PetsFormComponent
        onSubmit={onSubmit}
        typePets={petTypes}
        colorsPet={colorsPet}
        behaviorPet={behaviorPet}
        otherBreed={otherBreed}
        buttonLabel="Crear mascota"
        valuesToForm={PetsController.viewGetDataToForm()}
      />
      <div>CreatePets</div>
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    // Obtenemos todas las cookies para hacer peticiones al backend
    const getCookies = TokenUtils.destructureAllCookiesClient(context);
    // Obtenemos el conjunto actual
    const getData = await PetsController.apiSSRGetDataForm(getCookies);
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
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
}

export default CreatePets;
