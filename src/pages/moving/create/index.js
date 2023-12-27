import TitlePage from "@/components/data/title";
import MovingFormComponent from "@/components/views/moving/MovingFormComponent";
import HeaderPage from "@/components/views/partials/HeaderPage";
import { MovingController } from "@/controller/moving.controller";
import { Alert, message } from "antd";
import { useRouter } from "next/router";
import React from "react";

const ViewCreateNewMoving = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const onSubmit = async (data) => {
    try {
      const send = await MovingController.viewPostCreate(data);
      if (send.error || send.statusCode != 200) {
        messageApi.error("No fue posible crear la mudanza.");
        return false;
      }
      messageApi.success(
        "Mudanza creada con éxito",
        4,
        () => router.push("/moving")
      );
      return true;
    } catch (error) {
      messageApi.error("No fue posible crear la mudanza.");
      console.log(error);
      return false;
    }
  };
  return (
    <>
      {contextHolder}
      <HeaderPage title="Crear mudanza" />
      <TitlePage level={1}>Crear mudanza</TitlePage>
      <Alert
        message="Información sobre Mudanzas"
        description="Las mudanzas deben ser aprobadas. Por favor, realice una petición con una fecha razonable."
        type="info"
        showIcon
        closable
        style={{ marginBottom: "1em" }}
      />
      <MovingFormComponent
        onSubmit={onSubmit}
        valuesToForm={MovingController.viewGetDataToForm()}
        buttonLabel="Crear mudanza"
      />
    </>
  );
};

export default ViewCreateNewMoving;
