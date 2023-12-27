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
    dataIndex: "moving_date",
    title: "Fecha de mudanza",
  },
  {
    dataIndex: "author",
    title: "Autor",
  },
  {
    dataIndex: "status",
    title: "Estado",
    responsive: ["md"],
  },
];

const ViewListMovingAdmin = ({ movings }) => {
  const getDataTable = () => {
    const dataTable = movings.map((moving) => {
      return {
        key: moving.id_moving,
        moving_date: (
          <Tooltip
            title={`${moving.moving_status.name}, ${moving.moving_status.description}`}
          >
            <Badge
              color={MovingUtils.getColorBadgeStatus(
                moving.moving_status.id_status
              )}
              text={
                <Link href={`/moving/thread/${moving.id_moving}/reply`}>
                  {DateUtils.getDateInLettersSpanish(moving.moving_date)}
                </Link>
              }
            />
          </Tooltip>
        ),
        author: `${moving.users_roles?.users.name} ${moving.users_roles?.users.last_name}
                (${moving.users_roles.apartment_complex.tower_complex.tower_name} - ${moving.users_roles.apartment_complex.apartment_identifier_tower})`,
        status: (
          <Badge
            color={MovingUtils.getColorBadgeStatus(
              moving.moving_status.id_status
            )}
            text={
              <Link href={`/moving/thread/${moving.id_moving}/reply`}>
                {moving.moving_status.name}
              </Link>
            }
          />
        ),
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
    const getData = await MovingController.apiSSRListMovingByAdminComplex(
      getCookies
    );
    if (getData.error || getData.statusCode != 200)
      throw new Error("No fue posible obtener los datos");
    return {
      props: {
        movings: getData.payload || [],
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

export default ViewListMovingAdmin;
