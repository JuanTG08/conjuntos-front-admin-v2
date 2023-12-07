import TitlePage from "@/components/data/title";
import AccessPersonFormComponent from "@/components/views/access-person/AccessPersonFormComponent";
import HeaderPage from "@/components/views/partials/HeaderPage";
import { AccessPersonController } from "@/controller/access_person.controller";
import { message } from "antd";
import React from "react";
import { useRouter } from "next/router";

const AccessPersonCreate = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const onSubmit = async (data) => {
    try {
      data.start_day_allowed = data.start_day_allowed.startOf("day");
      data.end_day_allowed = data.end_day_allowed.startOf("day");
      const send = await AccessPersonController.viewPostCreateAccessPerson(
        data
      );
      if (send.error || send.statusCode !== 200)
        return messageApi.error("No fue posible crear el acceso del personal.");
      router.push("/access-person");
    } catch (error) {
      messageApi.error("No fue posible crear el acceso del personal.");
    }
  };
  return (
    <>
      {contextHolder}
      <HeaderPage title={"Visitantes"} />
      <TitlePage>Visitantes</TitlePage>
      <AccessPersonFormComponent
        onSubmit={onSubmit}
        valuesToForm={AccessPersonController.viewGetDataToForm()}
      />
    </>
  );
};

export default AccessPersonCreate;
