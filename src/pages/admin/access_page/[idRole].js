import AccessPageCaptionComponent from "@/components/views/access_page/AccessPageCaptionComponent";
import ListAllAccessPageCheckBoxComponent from "@/components/views/admin/access_page/ListAllAccessPageCheckBoxComponent";
import { AccessPageController } from "@/controller/access_page.controller";
import { PathsToController } from "@/controller/paths_to.controller";
import { RolesController } from "@/controller/roles.controller";
import { Tabs, Typography, message } from "antd";
import React, { useEffect, useState } from "react";

import { CardBody, Card } from "@nextui-org/react";
import HeaderPage from "@/components/views/partials/HeaderPage";

const AccessPageSelect = ({ idRole }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [role, setRole] = useState();
  const [froms_to, setFroms_to] = useState([]);

  useEffect(() => {
    fetchOneRole();
  }, []);

  const fetchOneRole = async () => {
    try {
      const response = await RolesController.viewGetOne(idRole);
      if (response.statusCode == 200 || response.payload.length > 0) {
        setRole(response.payload?.role);
        setFroms_to(response.payload?.froms_to);
        return;
      }
      messageApi.warning(response.message);
    } catch (error) {
      messageApi.error("Error");
    }
  };

  const deleteAccessPage = async (access_page) => {
    try {
      const idAccessPage = access_page.id;
      const response = await AccessPageController.viewSubmitDelete(
        idAccessPage
      );
      if (!response.error && response.statusCode == 200) {
        setFroms_to((prevData) => {
          return prevData.map((from_to) => {
            return {
              ...from_to,
              access_page: from_to.access_page.filter(
                (acc_pag) => acc_pag.id != idAccessPage
              ),
            };
          });
        });
        return messageApi.success(response.message);
      }
      messageApi.error(response.message);
    } catch (error) {
      console.log(error);
      messageApi.error("Error de conexión");
    }
  };

  const saveAccessPageToRole = async (accessPages, idFromTo) => {
    try {
      const response = await PathsToController.viewPostSetPathsTo(
        Array.from(accessPages).map((access_page) => parseInt(access_page)),
        idRole,
        idFromTo
      );
      messageApi.info(response.message);
    } catch (error) {
      console.log(error);
      messageApi.error("Error de conexión");
    }
  };

  const getDataTabs = froms_to.map((from_to, index) => ({
    key: index,
    label: from_to.name,
    children: (
      <Card key={index}>
        <CardBody>
          <ListAllAccessPageCheckBoxComponent
            from_to={from_to}
            deleteAccessPage={deleteAccessPage}
            onSubmit={saveAccessPageToRole}
          />
        </CardBody>
      </Card>
    ),
  }));

  const rendered = () => {
    if (!role || !froms_to) return <>Cargando...</>;
    return (
      <>
        <AccessPageCaptionComponent role={role} />
        <div className="flex w-full flex-col">
          <Tabs items={getDataTabs} />
        </div>
      </>
    );
  };
  return (
    <>
      {contextHolder}
      <HeaderPage title={"Crear rutas de accesso"} />
      <Typography.Title level={1} style={{ textAlign: "center" }}>
        Crear rutas de acceso para el rol
      </Typography.Title>
      {rendered()}
    </>
  );
};

export async function getServerSideProps(context) {
  const { idRole } = context.query;
  return {
    props: {
      idRole,
    },
  };
}

export default AccessPageSelect;
