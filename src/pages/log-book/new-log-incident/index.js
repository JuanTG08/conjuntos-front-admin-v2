import TitlePage from "@/components/data/title";
import LogsBookIncidentsFormComponent from "@/components/views/logs-book-incidents/LogsBookIncidentsFormComponent";
import HeaderPage from "@/components/views/partials/HeaderPage";
import { LogsBookIncidentsCtrl } from "@/controller/logs_book_incidents.controller";
import { LogBookServerSideProps } from "@/server-side-props/log_book.serverSideProps";
import { TokenUtils } from "@/utils/token.utils";
import { message } from "antd/lib";
import { useRouter } from "next/router";
import React from "react";

const NewLogIncident = ({ severities }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const onSubmit = async (values, image) => {
    try {
      const send = await LogsBookIncidentsCtrl.viewPostCreateIncident(
        values,
        image
      );
      if (send.error || send.statusCode != 200)
        throw new Error("No fue posible crear el registro de minuta");
      messageApi.success("Registro de minuta creada con éxito", 1, () =>
        router.push("/log-book/history")
      );
      return true;
    } catch (error) {
      messageApi.warning("No fue posible crear el registro de minuta");
      return false;
    }
  };
  return (
    <>
      <HeaderPage title="Minuta" />
      <TitlePage level={1}>Registrar</TitlePage>
      {contextHolder}
      <LogsBookIncidentsFormComponent
        onSubmit={onSubmit}
        severities={severities}
      />
    </>
  );
};

export async function getServerSideProps(context) {
  const server = new LogBookServerSideProps(context);
  await server.NewLogIncident();
  return server.response;
}

export default NewLogIncident;
