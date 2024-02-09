import TitlePage from "@/components/data/title";
import HeaderPage from "@/components/views/partials/HeaderPage";
import { LogsBookIncidentsCtrl } from "@/controller/logs_book_incidents.controller";
import { LogBookServerSideProps } from "@/server-side-props/log_book.serverSideProps";
import { DateUtils } from "@/utils/date.utils";
import { FilesUtils } from "@/utils/files.utils";
import { TokenUtils } from "@/utils/token.utils";
import { Descriptions } from "antd";
import React from "react";

const LogBookOne = ({ minuta }) => {
  const items = [
    {
      key: "start_date",
      label: "Fecha",
      children: `${DateUtils.getDateInLettersSpanish(
        minuta.createdAt
      )}, ${DateUtils.getHourInLettersSpanish(minuta.createdAt)}`,
      span: 1,
    },
    {
      key: "severity",
      label: "Severidad del incidente",
      children: minuta.logs_book_severity.name,
      span: 1,
    },
    {
      key: "author",
      label: "Autor",
      children: `${minuta.users_roles.users.name} ${minuta.users_roles.users.last_name}`,
      span: 1,
    },
    {
      key: "description",
      label: "Descripción",
      children: minuta.description,
      span: 3,
    },
    {
      key: "location",
      label: "Ubicación del incidente",
      children: minuta.location,
      span: 2,
    },
    {
      key: "image",
      label: "Imagen",
      children: minuta?.management_files?.name_file ? (
        <img
          src={FilesUtils.formatGetImages(minuta.management_files.name_file)}
          alt="imagen"
        />
      ) : (
        "Sin imagen"
      ),
      span: 1,
    },
  ];
  return (
    <>
      <HeaderPage title="Minuta" />
      <TitlePage level={1}>Minuta</TitlePage>
      <Descriptions bordered layout="vertical" items={items} />
    </>
  );
};

export async function getServerSideProps(context) {
  const server = new LogBookServerSideProps(context);
  await server.LogBookOne();
  return server.response;
}

export default LogBookOne;
