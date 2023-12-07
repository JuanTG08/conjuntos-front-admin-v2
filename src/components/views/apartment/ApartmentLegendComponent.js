import { Descriptions } from "antd";
import React from "react";

const ApartmentLegendComponent = ({ tower, complex }) => {
  const getData = () => {
    return [
      {
        key: "1",
        label: "Conjunto",
        children: complex?.complex_name,
      },
      {
        key: "2",
        label: "NIT",
        children: complex?.complex_nit,
      },
      {
        key: "3",
        label: "Ciudad/Departamento",
        children: `${complex?.municipality?.name}/${complex?.municipality?.department_country?.name}`,
      },
      {
        key: "4",
        label: "Estado",
        children: complex?.status_residential_complex?.status_name,
      },
      {
        key: "5",
        label: "Torre",
        children: tower?.tower_name,
      },
      {
        key: "6",
        label: "Estado de la torre",
        children: tower?.status_tower_complex?.status_name,
      },
      {
        key: "7",
        label: "Número máximo de apartamentos",
        children: tower?.number_apartments,
      },
      {
        key: "8",
        label: "Total de apartamentos creados",
        children: tower?._count?.apartment_complex,
      },
    ];
  };

  return <Descriptions title="Información del apartamento" items={getData()} />;
};

export default ApartmentLegendComponent;
