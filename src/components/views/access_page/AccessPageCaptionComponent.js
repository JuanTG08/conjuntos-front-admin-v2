import { Descriptions } from "antd";
import React from "react";

const AccessPageCaptionComponent = ({ role }) => {
  const getData = () => {
    return [
      {
        key: "1",
        label: "Rol",
        children: role?.name,
      },
    ];
  };
  return <Descriptions items={getData()} />;
};

export default AccessPageCaptionComponent;
