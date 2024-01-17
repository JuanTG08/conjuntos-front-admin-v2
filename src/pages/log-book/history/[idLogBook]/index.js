import { LogsBookIncidentsCtrl } from "@/controller/logs_book_incidents.controller";
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
    <Descriptions
      bordered
      layout="vertical"
      title="Información de la mudanza"
      items={items}
    />
  );
};

export async function getServerSideProps(context) {
  try {
    // Obtenemos todas las cookies para hacer peticiones al backend
    const getCookies = TokenUtils.destructureAllCookiesClient(context);
    const idLogBook = context.query?.idLogBook;
    // Obtenemos los datos necesarios para el formulario
    const getData = await LogsBookIncidentsCtrl.apiSSRGetOneLogsBookIncidents(
      idLogBook,
      getCookies
    );
    if (getData.error || getData.statusCode != 200)
      throw new Error("No fue posible obtener los datos");
    return {
      props: {
        minuta: getData.payload,
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

export default LogBookOne;
