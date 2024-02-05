import React, { useState } from "react";
import { Form, Input, Select, Switch } from "antd";
import ButtonFormSubmit from "../partials/ButtonFormSubmit";
const { TextArea } = Input;

const PlanAndServiceFormComponent = ({
  onSubmit,
  valuesToForm,
  status,
  buttonLabel,
}) => {
  const [sending, setSending] = useState(false);
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    setSending(true);
    const res = await onSubmit(values);
    setSending(res);
  };
  return (
    <Form
      name="PlanAndServiceForm"
      form={form}
      onFinish={onFinish}
      style={{ width: "100%" }}
      initialValues={valuesToForm}
    >
      <Form.Item
        name="name"
        label="Nombre del plan"
        rules={[
          {
            type: "string",
            min: 1,
            max: 64,
            message: "El nombre del plan debe tener entre 1 y 64 caracteres",
          },
          {
            required: true,
            message: "El nombre del plan es requerido",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Descripción del plan"
        rules={[
          {
            type: "string",
            min: 1,
            max: 255,
            message: "La descripción del plan debe ser entre 1 y 64 caracteres",
          },
          {
            required: true,
            message: "La descripción es requerida",
          },
        ]}
      >
        <TextArea rows={4} showCount maxLength={255} />
      </Form.Item>
      <Form.Item
        name="visibility"
        label="Visibilidad del plan"
        valuePropName="checked"
      >
        <Switch checkedChildren="Si" unCheckedChildren="No" />
      </Form.Item>
      <Form.Item
        name="id_status_plan_and_service"
        label="Estado del plan"
        rules={[
          {
            required: true,
            message: "Se necesita especificar un estado del plan",
          },
        ]}
      >
        <Select
          placeholder="Estado del plan"
          options={status.map((_status) => ({
            value: _status.id_status_plan_and_service,
            label: _status.name,
          }))}
        />
      </Form.Item>
      <Form.Item>
        <ButtonFormSubmit value={buttonLabel} isLoading={sending} />
      </Form.Item>
    </Form>
  );
};

export default PlanAndServiceFormComponent;
