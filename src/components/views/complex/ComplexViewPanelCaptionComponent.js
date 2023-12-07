import { Descriptions } from "antd";
import React from "react";

const ComplexViewPanelCaptionComponent = ({ complex }) => {
  const getData = () => {
    return [
      {
        key: "1",
        label: "Conjunto Residencial",
        children: complex?.complex_name,
      },
      {
        key: "2",
        label: "NIT del Conjunto Residencial",
        children: complex?.complex_nit,
      },
    ];
  };
  return <Descriptions items={getData()} />;
};

export default ComplexViewPanelCaptionComponent;
