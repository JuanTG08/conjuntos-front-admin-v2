import { Form, Input, Select } from "antd";
import React, { useState } from "react";
import ButtonFormSubmit from "../../partials/ButtonFormSubmit";
import { CONST_MOVING_STATUS } from "@/constants/moving.constant";
const { TextArea } = Input;

const MovingReplyOwnerFormComponent = ({ onSubmit }) => {
  const [form] = Form.useForm();
  const [sending, setSending] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);

  const onFinish = async (values) => {
    setSending(true);
    const resp = await onSubmit(values);
    if (resp) {
      setDisabledButton(resp);
    }
    setSending(false);
  };

  return (
    <Form
      name="MovingReplyOwnerForm"
      form={form}
      onFinish={onFinish}
      style={{ width: "100%" }}
      layout="vertical"
    >
      <Form.Item
        name="id_status"
        label="Estado de aprobación"
        rules={[
          {
            required: true,
            message: "Se necesita especificar si deseas aprobar",
          },
        ]}
      >
        <Select
          disabled={disabledButton}
          options={[
            {
              value: CONST_MOVING_STATUS.APPROVED_OWNER.id,
              label: "Aprobar",
            },
            {
              value: CONST_MOVING_STATUS.DISAPPROVED.id,
              label: "No aprobar",
            },
          ]}
          placeholder="Seleccione"
        />
      </Form.Item>
      <Form.Item
        name="response"
        label="Respuesta"
        rules={[
          {
            required: true,
            min: 1,
            max: 300,
            message: "Se necesita especificar una respuesta",
          },
        ]}
      >
        <TextArea
          readOnly={disabledButton}
          rows={4}
          showCount
          maxLength={300}
        />
      </Form.Item>
      <Form.Item style={{ marginBottom: 0 }}>
        <ButtonFormSubmit
          value="Responder"
          isLoading={sending}
          isDisabled={disabledButton}
        />
      </Form.Item>
    </Form>
  );
};

export default MovingReplyOwnerFormComponent;
