import { Form, Input } from "antd";
import React, { useState } from "react";
import ButtonFormSubmit from "../../partials/ButtonFormSubmit";
const { TextArea } = Input;

const PQRSReplyFormComponent = ({ onSubmit }) => {
  const [form] = Form.useForm();
  const [sending, setSending] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);

  const onFinish = async (values) => {
    setSending(true);
    const resp = await onSubmit(values);
    setDisabledButton(resp);
    setSending(false);
  };

  return (
    <Form
      name="PQRSReplyForm"
      form={form}
      onFinish={onFinish}
      style={{ width: "100%" }}
      layout="vertical"
    >
      <Form.Item
        name="response"
        label="Respuesta"
        rules={[
          {
            required: true,
            min: 1,
            max: 600,
            message: "Se necesita especificar una respuesta",
          },
        ]}
      >
        <TextArea
          readOnly={disabledButton}
          autoFocus
          rows={4}
          showCount
          maxLength={600}
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

export default PQRSReplyFormComponent;
