import TitlePage from "@/components/data/title";
import HeaderPage from "@/components/views/partials/HeaderPage";
import { LogsBookIncidentsCtrl } from "@/controller/logs_book_incidents.controller";
import { LogBookServerSideProps } from "@/server-side-props/log_book.serverSideProps";
import { DateUtils } from "@/utils/date.utils";
import { TokenUtils } from "@/utils/token.utils";
import { Table, Typography } from "antd";
import Link from "next/link";
import React from "react";
const { Paragraph } = Typography;

const columns = [
  {
    title: "Descripción",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Fecha",
    dataIndex: "date",
    key: "date",
    responsive: ["md"],
  },
  {
    title: "Opciones",
    dataIndex: "options",
    key: "options",
  },
];

const LogBookHistory = ({ minuta }) => {
  const getDataTable = () => {
    return minuta.map((minu, i) => ({
      key: i,
      description: (
        <Paragraph ellipsis={{ rows: 4, expandable: false }}>
          {minu.description}
        </Paragraph>
      ),
      date: `${DateUtils.getDateInLettersSpanish(
        minu.createdAt
      )}, ${DateUtils.getHourInLettersSpanish(minu.createdAt)}`,
      options: (
        <Link href={`/log-book/history/${minu.id_log_book}`}>Ver más</Link>
      ),
    }));
  };

  return (
    <>
      <HeaderPage title="Minuta" />
      <TitlePage level={1}>Minuta</TitlePage>
      <Table
        columns={columns}
        dataSource={getDataTable()}
        pagination={{
          pageSize: 10,
        }}
      />
    </>
  );
};

export async function getServerSideProps(context) {
  const server = new LogBookServerSideProps(context);
  await server.LogBookHistory();
  return server.response;
}

export default LogBookHistory;
