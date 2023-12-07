import AccessPageFormComponent from "@/components/views/admin/access_page/AccessPageFormComponent";
import HeaderPage from "@/components/views/partials/HeaderPage";
import { AccessPageController } from "@/controller/access_page.controller";
import { Typography, message } from "antd";
import Router from "next/router";

const AccessPageCreate = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const onSubmit = async (data) => {
    try {
      const response = await AccessPageController.viewSubmitNew(data);
      if (response.statusCode != 200 || response.error) {
        messageApi.error(response.message);
        return;
      }
      Router.back();
    } catch (error) {
      messageApi.error("Error de conexion");
    }
  };

  const Rendered = () => {
    return (
      <>
        <HeaderPage title={"Crear Rutas de Acceso"} />
        <div>
          <Typography.Title level={1} style={{ textAlign: "center" }}>
            Crear Página de Acceso
          </Typography.Title>
        </div>
        <div className="mt-3">
          <AccessPageFormComponent
            onSubmit={onSubmit}
            valuesToForm={AccessPageController.viewGetDataToForm()}
          />
        </div>
      </>
    );
  };
  return (
    <>
      {contextHolder}
      <Rendered />
    </>
  );
};

export default AccessPageCreate;
