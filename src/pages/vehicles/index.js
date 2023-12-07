import TitlePage from "@/components/data/title";
import ButtonCreateNew from "@/components/views/partials/ButtonCreateNew";
import HeaderPage from "@/components/views/partials/HeaderPage";
import { VehiclesController } from "@/controller/vehicles.controller";
import { Table } from "antd";
import React, { useEffect, useMemo } from "react";

const VehiclesView = () => {
  useEffect(() => {
    fetchListAll();
  }, [])
  const fetchListAll = async () => {
    try {
      const response = await VehiclesController.viewGetListVehicles();
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
  const columns = useMemo(
    () => [
      {
        title: "Marca",
        dataIndex: "brand",
        key: "brand",
      },
      {
        title: "Tipo",
        dataIndex: "type",
        key: "type",
        responsive: ["md"],
      },
      {
        title: "Color",
        dataIndex: "color",
        key: "color",
        responsive: ["md"],
      },
      {
        title: "Placa",
        dataIndex: "plate",
        key: "plate",
        responsive: ["md"],
      },
      {
        title: "Opciones",
        dataIndex: "options",
        key: "options",
      },
    ],
    []
  );

  const RenderedTable = () => {
    return (
      <Table
        columns={columns}
        dataSource={[]}
        pagination={{
          pageSize: 10,
        }}
      />
    );
  };

  return (
    <>
      <HeaderPage title="Vehiculos" />
      <TitlePage level={1}>Vehiculos</TitlePage>
      <ButtonCreateNew value="Nuevo Vehiculo" href="/vehicles/create" />

      <RenderedTable />
    </>
  );
};

export default VehiclesView;
