import TitlePage from "@/components/data/title";
import HeaderPage from "@/components/views/partials/HeaderPage";
import VehiclesFormComponent from "@/components/views/vehicles/VehiclesFormComponent";
import { TypeVehicleController } from "@/controller/type_vehicle.controller";
import { VehiclesController } from "@/controller/vehicles.controller";
import { TokenUtils } from "@/utils/token.utils";
import { message } from "antd";
import { useRouter } from "next/router";
import React from "react";

const CreateVehiclesPage = ({ typesVehicles }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const onSubmit = async (data) => {
    try {
      const send = await VehiclesController.viewPostVehicle(data);
      if (send.error || send.statusCode != 200) return messageApi.error(send.message);
      router.push("/vehicles")
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {contextHolder}
      <HeaderPage title="Crear vehículo" />
      <TitlePage>Crear vehículo</TitlePage>
      <VehiclesFormComponent
        onSubmit={onSubmit}
        typesVehicles={typesVehicles}
        buttonLabel="Crear vehículo"
        valuesToForm={VehiclesController.viewGetDataToForm()}
      />
    </>
  );
};
export async function getServerSideProps(context) {
  try {
    const getCookies = TokenUtils.destructureAllCookiesClient(context);
    const list = await TypeVehicleController.apiSSRGetListTypesVehicles(
      getCookies
    );
    if (list.error || list.statusCode != 200)
      throw new Error(
        "No fue posible obtener el listado de tipos de vehículos"
      );
    return {
      props: {
        typesVehicles: list.payload || [],
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

export default CreateVehiclesPage;
