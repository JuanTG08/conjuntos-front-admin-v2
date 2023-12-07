import ApartmentFormComponent from "@/components/views/apartment/ApartmentFormComponent";
import ApartmentLegendComponent from "@/components/views/apartment/ApartmentLegendComponent";
import HeaderPage from "@/components/views/partials/HeaderPage";
import { ApartmentComplexController } from "@/controller/apartment.controller";
import { Typography, message } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
const ApartmentComplexEdit = ({ idApartment }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [apartment, setApartment] = useState(false);
  const [tower, setTower] = useState(false);
  const [complex, setComplex] = useState(false);
  const router = useRouter();
  useEffect(() => {
    fetchOneApartment();
  }, []);

  const fetchOneApartment = async () => {
    try {
      const listApartment = await ApartmentComplexController.viewOne(
        idApartment
      );
      if (
        listApartment.error ||
        !listApartment.payload ||
        listApartment.statusCode != 200
      )
        return router.push("/dashboard");
      setTower(listApartment.payload.tower);
      setComplex(listApartment.payload.complex);
      setApartment(listApartment.payload.apartment);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    try {
      data.id_tower = tower.id_tower;
      const response = await ApartmentComplexController.viewSubmitEdit(
        data,
        idApartment
      );
      messageApi.info(response.message);
      // Router.push(`/apartment/${idTower}/ApartmentList`);
    } catch (error) {
      console.log(error);
      messageApi.error("Error de conexión");
    }
  };
  const Rendered = () => {
    if (!tower || !complex || !apartment) return <>Cargando...</>;
    return (
      <>
        <ApartmentLegendComponent complex={complex} tower={tower} />
        <ApartmentFormComponent
          onSubmit={onSubmit}
          valuesToForm={ApartmentComplexController.viewGetDataToForm(apartment)}
        />
      </>
    );
  };
  return (
    <>
      {contextHolder}
      <HeaderPage title={"Editar Apartamento"} />
      <Typography.Title level={1} style={{ textAlign: "center" }}>
        Editar Apartamento
      </Typography.Title>
      <Rendered />
    </>
  );
};
export async function getServerSideProps(context) {
  const { idApartment } = context.query;
  return {
    props: {
      idApartment,
    },
  };
}

export default ApartmentComplexEdit;
