import MovingDateInvalidComponentAlert from "@/components/alerts/moving/MovingDateInvalidComponentAlert";
import TitlePage from "@/components/data/title";
import HeaderPage from "@/components/views/partials/HeaderPage";
import { MovingController } from "@/controller/moving.controller";
import { DateUtils } from "@/utils/date.utils";
import { MovingUtils } from "@/utils/moving.utils";
import { TokenUtils } from "@/utils/token.utils";
import { Badge, Descriptions, Empty } from "antd";
import React from "react";

const ViewMovingThread = ({ moving, fechaProgramadaValida }) => {
  const items = [
    {
      key: "moving_date",
      label: "Fecha programada para la mudanza",
      children: DateUtils.getDateInLettersSpanish(moving?.moving_date),
      span: 1,
    },
    {
      key: "status",
      label: "Estado",
      children: (
        <Badge
          color={MovingUtils.getColorBadgeStatus(
            moving.moving_status.id_status
          )}
          text={`${moving.moving_status.name}, ${moving.moving_status.description}`}
        />
      ),
      span: 2,
    },
    {
      key: "description",
      label: "Descripción",
      children: moving.description,
      span: 3,
    },
    {
      key: "responses",
      label: "Respuestas",
      children:
        moving.moving_response.length > 0 ? (
          moving.moving_response.map((response, ind) => {
            const itemDescription = [
              {
                key: "reply",
                label: "Respondido por",
                children: `${response.users_roles.users.name} ${response.users_roles.users.last_name} (${response.users_roles.roles.name})`,
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
                items={itemDescription}
                style={{ marginBottom: "1em" }}
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
      <HeaderPage title="Mudanza" />
      <TitlePage level={1}>Mudanza</TitlePage>
      <MovingDateInvalidComponentAlert
        fechaProgramadaValida={fechaProgramadaValida}
        status={moving.moving_status.id_status}
      />
      <Descriptions
        bordered
        layout="vertical"
        title="Información de la mudanza"
        items={items}
      />
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    // Obtenemos todas las cookies para hacer peticiones al backend
    const getCookies = TokenUtils.destructureAllCookiesClient(context);
    const idMoving = context.query?.idMoving;
    // Obtenemos los datos necesarios para el formulario
    const getData = await MovingController.apiSSRGetOneMoving(
      getCookies,
      idMoving
    );
    if (getData.error || getData.statusCode != 200 || !getData.payload)
      throw new Error("No fue posible obtener los datos");
    const fechaProgramadaValida = DateUtils.compareDatesToDate(
      getData.payload.moving_date
    );
    return {
      props: {
        moving: getData.payload,
        fechaProgramadaValida,
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

export default ViewMovingThread;
