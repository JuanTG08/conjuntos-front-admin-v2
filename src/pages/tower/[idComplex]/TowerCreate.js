import HeaderPage from "@/components/views/partials/HeaderPage";
import TowerFormComponent from "@/components/views/tower/TowerFormComponent";
import TowerLeyendComponent from "@/components/views/tower/TowerLeyendComponent";
import { ComplexController } from "@/controller/complex.controller";
import { TowerController } from "@/controller/tower.controller";
import { Typography, message } from "antd";
import Router from "next/router";
import React, { useEffect, useState } from "react";

const TowerCreate = ({ idComplex }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [complex, setComplex] = useState(false);

  useEffect(() => {
    fetchGetComplex();
  }, []);

  const fetchGetComplex = async () => {
    try {
      const getComplex = await ComplexController.viewOne(idComplex);
      if (
        getComplex.error ||
        !getComplex.payload ||
        getComplex.statusCode != 200
      )
        return;
      setComplex(getComplex.payload);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    data.id_complex = idComplex;
    try {
      const response = await TowerController.viewSubmitNew(data, idComplex);
      if (response.statusCode != 200 || response.error) {
        messageApi.error(response.message);
        return;
      }
      Router.push(`/tower/${idComplex}/TowerList`);
    } catch (error) {
      console.log(error);
      messageApi.error("Error de conexion");
    }
  };

  return (
    <>
      {contextHolder}
      <HeaderPage title={"Crear Torre"} />
      <div>
        <Typography.Title level={1} style={{ textAlign: "center" }}>
          Crear torre
        </Typography.Title>
        <TowerLeyendComponent complex={complex} />
        <TowerFormComponent
          onSubmit={onSubmit}
          valuesToForm={TowerController.viewGetDataToForm()}
        />
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const { idComplex } = context.query;
  return {
    props: {
      idComplex,
    },
  };
}

export default TowerCreate;
