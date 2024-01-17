import TitlePage from "@/components/data/title";
import HeaderPage from "@/components/views/partials/HeaderPage";
import { MovingController } from "@/controller/moving.controller";
import { DateUtils } from "@/utils/date.utils";
import { MovingUtils } from "@/utils/moving.utils";
import { TokenUtils } from "@/utils/token.utils";
import { Badge, Table, Tooltip } from "antd";
import Link from "next/link";
import React from "react";

const columns = [
  {
    dataIndex: "apartment",
    title: "Torre - Unidad",
  },
];

const ViewMovingAuthorized = ({ movings }) => {
  const getDataTable = () => {
    const dataTable = movings.map((moving) => {
      return {
        key: moving.id_moving,
        apartment: `${moving.apartment_complex.tower_complex.tower_name} - ${moving.apartment_complex.apartment_identifier_tower}`,
      };
    });
    return dataTable;
  };
  const DataTable = () => {
    return (
      <Table
        columns={columns}
        dataSource={getDataTable()}
        bordered
        size="large"
        locale={{ emptyText: "No hay mudanzas registradas" }}
      />
    );
  };
  return (
    <>
      <HeaderPage title="Mudanzas" />
      <TitlePage level={1}>Mudanzas</TitlePage>
      <DataTable />
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    // Obtenemos todas las cookies para hacer peticiones al backend
    const getCookies = TokenUtils.destructureAllCookiesClient(context);
    // Obtenemos los datos necesarios para el formulario
    const getData =
      await MovingController.apiSSRListMovingToComplexAndAuthorized(getCookies);
    if (getData.error || getData.statusCode != 200)
      throw new Error("No fue posible obtener los datos");
    return {
      props: {
        movings: getData.payload || [],
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

export default ViewMovingAuthorized;
