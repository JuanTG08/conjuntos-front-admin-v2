import { Typography } from "antd";
import React from "react";

const TitlePage = ({ level = 1, textAlign = "center", children }) => {
  return (
    <Typography.Title level={level} style={{ textAlign, textWrap: "balance" }}>
      {children}
    </Typography.Title>
  );
};

export default TitlePage;
