import TitlePage from "@/components/data/title";
import HeaderPage from "@/components/views/partials/HeaderPage";
import { AccessPersonController } from "@/controller/access_person.controller";
import { DateUtils } from "@/utils/date.utils";
import { Card, CardBody} from "@nextui-org/react";
import { Badge, Descriptions, Divider, Skeleton } from "antd";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";

const viewOneAccessPerson = ({ idAccessPerson }) => {
  const router = useRouter();
  const [accessPerson, setAccessPerson] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchGetAccessPerson();
  }, []);
  const fetchGetAccessPerson = async () => {
    try {
      const getOne = await AccessPersonController.viewGetOneAccessPerson(
        idAccessPerson
      );
      if (getOne.error || getOne.statusCode != 200)
        return router.push("/access-person");
      setLoading(false);
      setAccessPerson(getOne.payload);
    } catch (error) {
      console.log(error);
    }
  };

  const items = [
    {
      key: "1",
      label: "Número de identificación",
      children: accessPerson?.dni_person,
      span: 3,
    },
    {
      key: "2",
      label: "Nombre completo",
      children: accessPerson?.name_person,
    },
    {
      key: "3",
      label: "Correo electronico",
      children: accessPerson?.email || "No definido",
    },
    {
      key: "5",
      label: "Parking",
      children:
        accessPerson?.parking == undefined ? (
          ""
        ) : accessPerson?.parking ? (
          <Badge status="success" text="Si" />
        ) : (
          <Badge status="error" text="No" />
        ),
    },
    {
      key: "11",
      label: "Registrado por",
      children: accessPerson?.users
        ? `${accessPerson?.users.name} ${accessPerson?.users.last_name}`
        : "",
      span: 3,
    },
  ];

  const itemsInfoVisit = [
    {
      key: "4",
      label: "Tipo de acceso",
      children: accessPerson?.category_access_person?.name,
      span: 3,
    },
    {
      key: "6",
      label: "Fecha de ingreso",
      span: 3,
      children: accessPerson?.start_day_allowed
        ? DateUtils.getDateInLettersSpanish(accessPerson?.start_day_allowed)
        : "",
      span: 2,
    },
    {
      key: "7",
      label: "Fecha de salida",
      children: accessPerson?.end_day_allowed
        ? DateUtils.getDateInLettersSpanish(accessPerson?.end_day_allowed)
        : "",
      span: 2,
    },
    {
      key: "8",
      label: "Horario de ingreso",
      children: accessPerson?.start_hour_day
        ? DateUtils.getHourInLettersSpanish(accessPerson?.start_hour_day)
        : "",
      span: 2,
    },
    {
      key: "9",
      label: "Hora de salida",
      children: accessPerson?.end_hour_day
        ? DateUtils.getHourInLettersSpanish(accessPerson?.end_hour_day)
        : "",
      span: 2,
    },
    {
      key: "10",
      label: "Comentarios",
      children: accessPerson?.comments ? accessPerson?.comments : "",
      span: 3,
    },
  ];

  const Rendered = () => {
    if (loading)
      return (
        <Card>
          <CardBody>
            <Skeleton active />
          </CardBody>
        </Card>
      );
    return (
      <Card>
        <CardBody>
          <Descriptions
            bordered
            layout="vertical"
            title="Información del visitante"
            items={items}
          />
          <Divider />
          <Descriptions
            bordered
            layout="vertical"
            title="Información de la visita"
            items={itemsInfoVisit}
          />
        </CardBody>
      </Card>
    );
  };

  return (
    <>
      <HeaderPage title={"Visita"} />
      <TitlePage>Visita</TitlePage>
      <Rendered />
    </>
  );
};

export async function getServerSideProps(context) {
  const { idAccessPerson } = context.query;
  return {
    props: {
      idAccessPerson,
    },
  };
}
export default viewOneAccessPerson;
