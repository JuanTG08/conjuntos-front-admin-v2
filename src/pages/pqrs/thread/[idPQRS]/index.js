import TitlePage from "@/components/data/title";
import HeaderPage from "@/components/views/partials/HeaderPage";
import { PQRSController } from "@/controller/pqrs.controller";
import { DateUtils } from "@/utils/date.utils";
import { PQRSUtils } from "@/utils/pqrs.utils";
import { TokenUtils } from "@/utils/token.utils";
import { Card, CardBody } from "@nextui-org/react";
import { Badge, Descriptions, Empty, Typography } from "antd";
const { Text } = Typography;
import React from "react";

const ViewThreadPQRS = ({ pqr, idPQR }) => {
  const items = [
    {
      key: "tracking_number",
      label: "Número de pqr",
      children: pqr?.tracking_number,
      span: 1,
    },
    {
      key: "priority",
      label: "Prioridad",
      children: (
        <Badge
          color={PQRSUtils.getColorBadgePriority(pqr.id_priority)}
          text={pqr?.pqrs_priority?.name}
        />
      ),
      span: 1,
    },
    {
      key: "status",
      label: "Estado",
      children: (
        <Badge
          color={PQRSUtils.getColorBadgeStatus(pqr.id_status)}
          text={pqr.pqrs_status.name}
        />
      ),
      span: 1,
    },
    {
      key: "type",
      label: "Tipo de pqr",
      children: pqr?.pqrs_types_request?.name,
      span: 1,
    },
    {
      key: "category",
      label: "Categoría",
      children: pqr?.pqrs_category_request.name,
      span: 1,
    },
    {
      key: "createAt",
      label: "Fecha",
      children: DateUtils.getDateInLettersSpanish(pqr?.created_at),
      span: 1,
    },
    {
      key: "title",
      label: "Titulo",
      children: pqr?.title,
      span: 3,
    },
    {
      key: "description",
      label: "Descripción",
      children: pqr?.description,
      span: 3,
    },
    {
      key: "response",
      label: "Respuestas",
      children:
        pqr.pqrs_response.length > 0 ? (
          pqr.pqrs_response.map((response, ind) => {
            const itemDescription = [
              {
                key: "reply",
                label: "Respondido por",
                children: `${response.users_roles.users.name} ${response.users_roles.users.last_name}`,
                span: 2,
              },
              {
                key: "dateToReply",
                label: "Fecha de Respuesta",
                children: DateUtils.getDateInLettersSpanish(
                  response.created_at
                ),
                span: 1,
              },
              {
                key: "response",
                label: "Respuesta",
                children: response.response,
                span: 3,
              },
            ];
            return (
              <Descriptions
                key={ind}
                bordered
                layout="vertical"
                title="Información de la respuesta"
                items={itemDescription}
              />
            );
          })
        ) : (
          <Empty description="No hay respuestas" />
        ),
      span: 3,
    },
  ];
  return (
    <>
      <HeaderPage title="PQR" />
      <TitlePage level={1}>PQR</TitlePage>
          <Descriptions
            bordered
            layout="vertical"
            title="Información de la PQR"
            items={items}
          />
    </>
  );
};
export async function getServerSideProps(context) {
  try {
    // Obtenemos todas las cookies para hacer peticiones al backend
    const getCookies = TokenUtils.destructureAllCookiesClient(context);
    const idPQR = context.query?.idPQRS;
    // Obtenemos el listado de mascotas
    const getPQR = await PQRSController.apiSSRGetOnePQRS(getCookies, idPQR);
    if (getPQR.error || getPQR.statusCode != 200 || !getPQR.payload)
      throw new Error("No fue posible obtener los datos");
    return {
      props: {
        pqr: getPQR.payload,
        idPQR,
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

export default ViewThreadPQRS;
