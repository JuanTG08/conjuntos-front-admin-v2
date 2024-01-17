import { Descriptions } from "antd";
import React from "react";

const ConfigurationRoleCaption = ({ complex, tower, apartment, mainRole }) => {
  const getData = () => {
    return [
      {
        key: "complexName",
        label: "Conjunto Residencial",
        children: complex?.complex_name || "No aplica",
      },
      {
        key: "towerName",
        label: "Torre",
        children: tower?.tower_name || "No aplica",
      },
      {
        key: "apartmentName",
        label: "Unidad",
        children: apartment?.apartment_identifier_tower || "No aplica",
      },
      {
        key: "roleName",
        label: "Rol actual",
        children: mainRole?.nameRole,
      },
    ];
  };
  return (
    <Descriptions
      bordered
      title="Información del rol actual"
      items={getData()}
    />
  );
};

export default ConfigurationRoleCaption;
