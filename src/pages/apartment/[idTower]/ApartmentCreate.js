import ApartmentFormComponent from "@/components/views/apartment/ApartmentFormComponent";
import ApartmentLegendComponent from "@/components/views/apartment/ApartmentLegendComponent";
import HeaderPage from "@/components/views/partials/HeaderPage";
import { ApartmentComplexController } from "@/controller/apartment.controller";
import { Typography, message } from "antd";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ApartmentCreate = ({ idTower }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [tower, setTower] = useState(false);
  const [complex, setComplex] = useState(false);
  const router = useRouter();
  useEffect(() => {
    fetchListAllApartment();
  }, []);

  const fetchListAllApartment = async () => {
    try {
      const listApartment = await ApartmentComplexController.viewGetListAll(
        idTower
      );
      if (
        listApartment.error ||
        !listApartment.payload ||
        listApartment.statusCode != 200
      )
        return router.push("/dashboard");
      setTower(listApartment.payload.tower);
      setComplex(listApartment.payload.complex);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    try {
      data.id_tower = idTower;
      const response = await ApartmentComplexController.viewSubmitNew(data);
      if (response.statusCode != 200 || response.error) {
        messageApi.warning(response.message);
        return;
      }
      Router.push(`/apartment/${idTower}/ApartmentList`);
    } catch (error) {
      console.log(error);
      messageApi.error("Error de conexión");
    }
  };
  const Rendered = () => {
    if (!tower || !complex) return <>Cargando...</>;
    return (
      <>
        <ApartmentLegendComponent complex={complex} tower={tower} />
      </>
    );
  };
  return (
    <>
      {contextHolder}
      <HeaderPage title={"Crear apartamentos"} />
      <Typography.Title level={1} style={{ textAlign: "center" }}>
        Crear Apartamento
      </Typography.Title>
      <Rendered />
      <ApartmentFormComponent
        onSubmit={onSubmit}
        valuesToForm={ApartmentComplexController.viewGetDataToForm()}
      />
    </>
  );
};

export async function getServerSideProps(context) {
  const { idTower } = context.query;
  return {
    props: {
      idTower,
    },
  };
}

export default ApartmentCreate;
