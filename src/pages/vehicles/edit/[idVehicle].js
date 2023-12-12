import TitlePage from "@/components/data/title";
import HeaderPage from "@/components/views/partials/HeaderPage";
import VehiclesFormComponent from "@/components/views/vehicles/VehiclesFormComponent";
import { TypeVehicleController } from "@/controller/type_vehicle.controller";
import { VehiclesController } from "@/controller/vehicles.controller";
import { TokenUtils } from "@/utils/token.utils";
import { message } from "antd";
import React from "react";
import { useRouter } from "next/router";

const ViewEditVehicle = ({ typesVehicles, vehicle, idVehicle }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const onSubmit = async (data) => {
    try {
      const send = await VehiclesController.viewPutVehicle(data, idVehicle);
      if (send.error || send.statusCode != 200)
        return messageApi.error("Hubo un problema al generar esta acción");
      messageApi.success("Se actualizó correctamente el vehículo");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {contextHolder}
      <HeaderPage title="Editar vehículo" />
      <TitlePage level={1}>Editar vehículo</TitlePage>
      <VehiclesFormComponent
        onSubmit={onSubmit}
        typesVehicles={typesVehicles}
        buttonLabel="Actualizar vehículo"
        valuesToForm={VehiclesController.viewGetDataToForm(vehicle)}
      />
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    const getCookies = TokenUtils.destructureAllCookiesClient(context);
    const idVehicle = context.query?.idVehicle;
    const list = await TypeVehicleController.apiSSRGetListTypesVehicles(
      getCookies
    );
    if (list.error || list.statusCode != 200)
      throw new Error(
        "No fue posible obtener el listado de tipos de vehículos"
      );
    const vehicle = await VehiclesController.apiSSRGetOneVehicle(
      getCookies,
      idVehicle
    );
    if (vehicle.error || vehicle.statusCode != 200 || !vehicle.payload)
      throw new Error("No fue posible obtener el vehículo");
    return {
      props: {
        typesVehicles: list.payload || [],
        vehicle: vehicle.payload,
        idVehicle,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/vehicles",
        permanent: false,
      },
    };
  }
}

export default ViewEditVehicle;
