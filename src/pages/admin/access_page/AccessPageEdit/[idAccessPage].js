import AccessPageFormComponent from "@/components/views/admin/access_page/AccessPageFormComponent";
import HeaderPage from "@/components/views/partials/HeaderPage";
import { AccessPageController } from "@/controller/access_page.controller";
import { Typography, message } from "antd";
import Router from "next/router";
import { useEffect, useState } from "react";

const AccessPageEdit = ({ idAccessPage }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [access_page, setAccessPage] = useState();
  useEffect(() => {
    fetchGetAccessPage();
  }, []);

  const fetchGetAccessPage = async () => {
    try {
      const response = await AccessPageController.viewGetOne(idAccessPage);
      if (response.statusCode == 200 || response.payload.length > 0) {
        setAccessPage(response.payload);
        return;
      }
      Router.back();
    } catch (error) {
      console.log(error);
      Router.back();
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await AccessPageController.viewSubmitEdit(
        data,
        idAccessPage
      );
      if (response.statusCode != 200) {
        messageApi.error(response.message);
        return;
      }
      Router.back();
    } catch (error) {
      console.log(error);
      Router.back();
    }
  };
  const rendered = () => {
    if (!access_page) return <>Cargando</>;
    return (
      <>
        <div className="body-access-page">
          <AccessPageFormComponent
            onSubmit={onSubmit}
            valuesToForm={AccessPageController.viewGetDataToForm(access_page)}
          />
        </div>
      </>
    );
  };
  return (
    <>
      {contextHolder}
      <HeaderPage title={"Editar Rutas de Acceso"} />
      <Typography.Title level={1} style={{ textAlign: "center" }}>
        Editar Página de Acceso
      </Typography.Title>
      {rendered()}
    </>
  );
};

export async function getServerSideProps(context) {
  const { idAccessPage } = context.query;
  return {
    props: {
      idAccessPage,
    },
  };
}

export default AccessPageEdit;
