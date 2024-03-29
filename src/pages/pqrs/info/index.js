import TitlePage from "@/components/data/title";
import ButtonCreateNew from "@/components/views/partials/ButtonCreateNew";
import HeaderPage from "@/components/views/partials/HeaderPage";
import { PQRSController } from "@/controller/pqrs.controller";
import { DateUtils } from "@/utils/date.utils";
import { PQRSUtils } from "@/utils/pqrs.utils";
import { TokenUtils } from "@/utils/token.utils";
import { Badge, Descriptions, Table, message } from "antd";
import Link from "next/link";
import React, { useState } from "react";

const columns = [
  {
    title: "Número",
    dataIndex: "tracking_number",
    rowScope: "row",
  },
  {
    title: "Tipo",
    dataIndex: "pqrs_types_request",
    responsive: ["md"],
  },
  {
    title: "Categoría",
    dataIndex: "pqrs_category_request",
    responsive: ["md"],
  },
  {
    title: "Titulo",
    dataIndex: "title",
  },
  {
    title: "Estado",
    dataIndex: "pqrs_status",
    responsive: ["md"],
  },
];

const ViewPQRSInfo = ({ pqrs }) => {
  const getDataTable = () => {
    const dataTable = pqrs.map((pqr) => {
      return {
        key: pqr.id_pqrs,
        tracking_number: (
          <Link href={`/pqrs/thread/${pqr.id_pqrs}`}>
            {pqr.tracking_number}
          </Link>
        ),
        pqrs_types_request: pqr.pqrs_types_request.name,
        pqrs_category_request: pqr.pqrs_category_request.name,
        title: (
          <Badge
            color={PQRSUtils.getColorBadgeStatus(pqr.id_status)}
            text={<Link href={`/pqrs/thread/${pqr.id_pqrs}`}>{pqr.title}</Link>}
          />
        ),
        pqrs_status: (
          <Badge
            color={PQRSUtils.getColorBadgeStatus(pqr.id_status)}
            text={pqr.pqrs_status.name}
          />
        ),
        response: pqr.pqrs_response.length === 0 ? false : pqr.pqrs_response,
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
        expandable={{
          expandedRowRender: (record) => (
            <>
              {record.response.map((response, ind) => {
                const itemDescription = [
                  {
                    key: "reply",
                    label: "Respondido por",
                    children: `${response.users_roles.users.name} ${response.users_roles.users.last_name}`,
                    span: 2,
                  },
                  {
                    key: "dateToReply",
                    label: "Fecha de Respuesta",
                    children: DateUtils.getDateInLettersSpanish(
                      response.created_at
                    ),
                    span: 1,
                  },
                  {
                    key: "response",
                    label: "Respuesta",
                    children: response.response,
                    span: 3,
                  },
                ];
                return (
                  <Descriptions
                    key={ind}
                    bordered
                    layout="vertical"
                    title="Información de la respuesta"
                    items={itemDescription}
                  />
                );
              })}
            </>
          ),
          rowExpandable: (record) => record.response,
        }}
      />
    );
  };

  return (
    <>
      <HeaderPage title="PQRS" />
      <TitlePage level={1}>PQRS</TitlePage>
      <ButtonCreateNew value="Nueva PQRS" href="/pqrs/create" />
      <DataTable />
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    // Obtenemos todas las cookies para hacer peticiones al backend
    const getCookies = TokenUtils.destructureAllCookiesClient(context);
    // Obtenemos los datos necesarios para el formulario
    const getData = await PQRSController.apiSSRGetListPQRSToApartmentAndUser(
      getCookies
    );
    if (getData.error || getData.statusCode != 200)
      throw new Error("No fue posible obtener los datos");
    return {
      props: {
        pqrs: getData.payload || [],
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

export default ViewPQRSInfo;
