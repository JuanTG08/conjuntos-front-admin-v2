import MovingDateInvalidComponentAlert from "@/components/alerts/moving/MovingDateInvalidComponentAlert";
import TitlePage from "@/components/data/title";
import MovingReplyAdminFormComponent from "@/components/views/moving/reply/MovingReplyAdminFormComponent";
import HeaderPage from "@/components/views/partials/HeaderPage";
import { CONST_MOVING_STATUS } from "@/constants/moving.constant";
import { MovingController } from "@/controller/moving.controller";
import { DateUtils } from "@/utils/date.utils";
import { MovingUtils } from "@/utils/moving.utils";
import { TokenUtils } from "@/utils/token.utils";
import { Badge, Descriptions, Divider, Empty, Typography, message } from "antd";
const { Text } = Typography;
import { useRouter } from "next/router";
import React from "react";

const ViewOneMovingToReplyByAdmin = ({ moving, idMoving, fechaProgramadaValida }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const onSubmit = async (data) => {
    try {
      const send = await MovingController.viewPutSetResponseToMoving(
        data,
        idMoving
      );
      if (send.error || send.statusCode !== 200) {
        messageApi.error("No fue posible responder la mudanza.");
        return false;
      }
      messageApi.success(send.message, 3, () =>
        router.push("/moving/list/admin")
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  const items = [
    {
      key: "moving_date",
      label: "Fecha de mudanza",
      children: (
        <Text>{DateUtils.getDateInLettersSpanish(moving?.moving_date)}</Text>
      ),
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
      key: "author",
      label: "Autor",
      children: `${moving?.users_roles?.users.name} ${moving?.users_roles?.users.last_name}`,
      span: 3,
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
          <>
            {moving.moving_response.map((response, ind) => {
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
                <>
                  <Descriptions
                    key={ind}
                    bordered
                    layout="vertical"
                    items={itemDescription}
                    style={{ marginBottom: "1em" }}
                  />
                </>
              );
            })}
            {moving.moving_status.id_status ==
              CONST_MOVING_STATUS.APPROVED_OWNER.id && fechaProgramadaValida && (
              <>
                <Divider />
                <MovingReplyAdminFormComponent onSubmit={onSubmit} />
              </>
            )}
          </>
        ) : (
          <Empty description="El propietario no ha generado una respuesta." />
        ),
      span: 3,
    },
  ];
  return (
    <>
      {contextHolder}
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
    const getData = await MovingController.apiSSRGetOneMovingByAdminToComplex(
      getCookies,
      idMoving
    );
    if (getData.error || getData.statusCode != 200 || !getData.payload)
      throw new Error("No fue posible obtener los datos");
    const fechaProgramadaValida = DateUtils.compareDatesToYesterday(
      getData.payload.moving_date
    );
    return {
      props: {
        moving: getData.payload,
        idMoving,
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

export default ViewOneMovingToReplyByAdmin;
