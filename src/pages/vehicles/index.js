import TitlePage from "@/components/data/title";
import ButtonCreateNew from "@/components/views/partials/ButtonCreateNew";
import HeaderPage from "@/components/views/partials/HeaderPage";
import { VehiclesController } from "@/controller/vehicles.controller";
import { TokenUtils } from "@/utils/token.utils";
import { VehicleUtils } from "@/utils/vehicle.utils";
import { Card, Empty, Image, Typography, message } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const VehiclesView = ({ _vehicles }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [vehicles, setVehicles] = useState(_vehicles);
  const deleteVehicle = async (idVehicle) => {
    try {
      const send = await VehiclesController.viewDeleteVehicle(idVehicle);
      if (send.error || send.statusCode != 200)
        return messageApi.error(send.message);
      setVehicles((prevVehicles) =>
        prevVehicles.filter((vehicle) => vehicle.id_vehicle !== idVehicle)
      );
      messageApi.success("Vehículo eliminado correctamente");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {contextHolder}
      <HeaderPage title="Vehículos" />
      <TitlePage level={1}>Vehículos</TitlePage>
      <ButtonCreateNew value="Nuevo vehículo" href="/vehicles/create" />
      {vehicles?.length === 0 && <Empty description="No tienes vehículos" />}
      <div className="gap-2 grid grid-cols-1 sm:grid-cols-4">
        {vehicles?.map((vehicle, index) => (
          <Card
            key={index}
            title={vehicle.name}
            cover={
              <Image
                alt={vehicle.name}
                src={VehicleUtils.defineUrlImageVehicle(
                  vehicle?.id_type_vehicle,
                  false
                )}
                className="w-full object-contain h-[200px]"
                width="100%"
                height="200"
                style={{ maxHeight: 200, height: 200 }}
              />
            }
            actions={[
              <Link href={`/vehicles/edit/${vehicle.id_vehicle}`}>
                <EditOutlined
                  key="edit"
                  style={{ fontSize: "1.5em", color: "#086ADA" }}
                />
              </Link>,
              <DeleteOutlined
                key="delete"
                style={{ fontSize: "1.5em", color: "red" }}
                onClick={() => deleteVehicle(vehicle.id_vehicle)}
              />,
            ]}
          >
            <Typography.Title level={3}>{vehicle.name}</Typography.Title>
            {`${vehicle.type_vehicle.name}`}
          </Card>
        ))}
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    // Obtenemos todas las cookies para hacer peticiones al backend
    const getCookies = TokenUtils.destructureAllCookiesClient(context);
    const list = await VehiclesController.apiSSRGetListVehicles(getCookies);
    return {
      props: {
        _vehicles: list.payload || [],
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

export default VehiclesView;
