import HeaderPage from "@/components/views/partials/HeaderPage";
import TowerFormComponent from "@/components/views/tower/TowerFormComponent";
import TowerLeyendComponent from "@/components/views/tower/TowerLeyendComponent";
import { TowerController } from "@/controller/tower.controller";
import { TowerServerSideProps } from "@/server-side-props/tower.serverSideProps";
import { Typography, message } from "antd";
import Router from "next/router";
import { useEffect, useState } from "react";

const TowerEdit = ({ idTower, tower, complex }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const onSubmit = async (data) => {
    try {
      const response = await TowerController.viewSubmitEdit(data, idTower);
      if (response.statusCode == 200)
        return messageApi.success("Se editó la torre");
      messageApi.error(response.message);
    } catch (error) {
      messageApi.error("Error de conexion");
    }
  };

  const rendered = () => {
    if (!tower || !complex) {
      return <></>;
    }
    return (
      <>
        {contextHolder}
        <HeaderPage title={"Editar Torre"} />
        <Typography.Title level={1} style={{ textAlign: "center" }}>
          Editar Torre
        </Typography.Title>
        <TowerLeyendComponent complex={complex} />
        <TowerFormComponent
          onSubmit={onSubmit}
          valuesToForm={TowerController.viewGetDataToForm(tower)}
        />
      </>
    );
  };

  return rendered();
};

export async function getServerSideProps(context) {
  const server = new TowerServerSideProps(context);
  await server.ViewTowerEdit();
  return server.response;
}

export default TowerEdit;
