import HeaderPage from "@/components/views/partials/HeaderPage";
import { ApartmentComplexController } from "@/controller/apartment.controller";
import { Descriptions } from "antd";
import React, { useEffect, useMemo, useState } from "react";

const ApartmentComplexInformation = () => {
  const [apartment, setApartment] = useState();
  const [tower, setTower] = useState();
  const [complex, setComplex] = useState();
  const dataGeneral = useMemo(
    () => [
      {
        key: "1",
        label: "Conjunto Residencial",
        children: complex?.complex_name,
      },
      {
        key: "2",
        label: "Ciudad/Departamento",
        children: `${complex?.municipality?.name}/${complex?.municipality?.department_country?.name}`,
      },
      {
        key: "3",
        label: "Dirección",
        children: complex?.complex_address,
      },
      {
        key: "4",
        label: "Torre",
        children: tower?.tower_name,
      },
      {
        key: "5",
        label: "Piso",
        children: apartment?.level_floor,
      },
      {
        key: "6",
        label: "Unidad",
        children: apartment?.apartment_identifier_tower,
      },
    ],
    [apartment]
  );
  useEffect(() => {
    fetchGetApartment();
  }, []);
  const fetchGetApartment = async () => {
    try {
      const getApartment = await ApartmentComplexController.viewOne();
      if (getApartment.error || getApartment.statusCode != 200)
        return console.log(getApartment.message);
      setApartment(getApartment.payload.apartment);
      setTower(getApartment.payload.tower);
      setComplex(getApartment.payload.complex);
    } catch (error) {
      console.log("Error");
    }
  };
  return (
    <>
      <HeaderPage title={"Información de tu Unidad"} />
      <Descriptions
        title="Información General"
        layout="vertical"
        items={dataGeneral}
        bordered
      />
    </>
  );
};

export default ApartmentComplexInformation;
