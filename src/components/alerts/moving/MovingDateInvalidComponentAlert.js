import { CONST_MOVING_STATUS } from "@/constants/moving.constant";
import { Alert } from "antd";
import React from "react";

const MovingDateInvalidComponentAlert = ({ fechaProgramadaValida, status }) => {
  if (
    fechaProgramadaValida ||
    status == CONST_MOVING_STATUS.APPROVED_ADMIN.id ||
    status == CONST_MOVING_STATUS.FINISHED.id ||
    status == CONST_MOVING_STATUS.DISAPPROVED.id
  )
    return <></>;
  if (
    status === CONST_MOVING_STATUS.PENDING.id ||
    status === CONST_MOVING_STATUS.APPROVED_OWNER.id
  )
    return (
      <Alert
        type="error"
        message="Mudanza no aprobada: Fecha concluida"
        showIcon
        banner
        style={{ marginBottom: "10px" }}
        description="La fecha programada para la mudanza ha concluido, y no fue aprobada por un administrador. Por favor, valide los datos y contacte con su administrador o el propietario."
      />
    );
  return <></>;
};

export default MovingDateInvalidComponentAlert;
