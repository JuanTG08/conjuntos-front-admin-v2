import React from "react";
import TitlePage from "@/components/data/title";
import { AccessPersonController } from "@/controller/access_person.controller";
import { Table, Tooltip } from "antd";
import Link from "next/link";
import { DateUtils } from "@/utils/date.utils";
import HeaderPage from "@/components/views/partials/HeaderPage";
import { TokenUtils } from "@/utils/token.utils";
import { AccessPersonServerSideProps } from "@/server-side-props/access_person.serverSideProps";

const columns = [
  {
    title: "Visitante",
    dataIndex: "name_person",
    key: "name_person",
    width: "50%",
  },
  {
    title: (
      <Tooltip title="Hora de Ingreso - Hora de Salida">
        Hora Ingreso - Hora Salida
      </Tooltip>
    ),
    dataIndex: "dates",
    key: "dates",
  },
];

const AccessPersonList = ({ accessPeople }) => {
  const getDataTable = () =>
    accessPeople.map((visitor, index) => ({
      key: index,
      name_person: (
        <Link href={`/access-person/${visitor?.id_access_people}`}>
          {visitor?.name_person} - {visitor?.dni_person}
          <br />
          <span>
            {visitor?.tower_complex?.tower_name} -{" "}
            {visitor?.apartment_complex?.apartment_identifier_tower}
          </span>
        </Link>
      ),
      dates: `${DateUtils.getHourInLettersSpanish(
        DateUtils.getDateDependMyUTC(visitor?.start_hour_day)
      )} - ${DateUtils.getHourInLettersSpanish(
        DateUtils.getDateDependMyUTC(visitor?.end_hour_day)
      )}`,
    }));

  const RenderedTable = () => {
    return (
      <Table
        columns={columns}
        dataSource={getDataTable()}
        pagination={{
          pageSize: 10,
        }}
      />
    );
  };
  return (
    <>
      <HeaderPage title="Listado de Visitas" />
      <TitlePage>Listado de Visitas</TitlePage>
      <RenderedTable />
    </>
  );
};

export async function getServerSideProps(context) {
  const server = new AccessPersonServerSideProps(context);
  await server.AccessPersonList();
  return server.response;
}

export default AccessPersonList;
