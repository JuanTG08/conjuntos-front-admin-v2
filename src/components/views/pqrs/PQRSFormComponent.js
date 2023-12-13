import React, { useState } from "react";
import { Form, Input, Select } from "antd";
import ButtonFormSubmit from "../partials/ButtonFormSubmit";
const { TextArea } = Input;

const PQRSFormComponent = ({
  typesRequest,
  categoryRequest,
  priority,
  onSubmit,
  valuesToForm,
  buttonLabel,
}) => {
  const [sending, setSending] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setSending(true);
    await onSubmit(values);
    setSending(false);
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <Form
      name="PQRSForm"
      form={form}
      onFinish={onFinish}
      style={{ width: "100%" }}
      initialValues={valuesToForm}
    >
      <Form.Item
        name="id_type_request"
        label="Tipo de petición"
        rules={[
          {
            required: true,
            message: "Se necesita especificar un tipo de petición",
          },
        ]}
      >
        <Select
          placeholder="Tipo de petición"
          options={typesRequest.map((typeRequest) => ({
            value: typeRequest.id_pqrs_types,
            label: typeRequest.name,
          }))}
          showSearch
          filterOption={filterOption}
          optionFilterProp="children"
        />
      </Form.Item>
      <Form.Item
        name="id_category_request"
        label="Categoría"
        rules={[
          {
            required: true,
            message: "Se necesita especificar una categoría",
          },
        ]}
      >
        <Select
          placeholder="Categoría"
          options={categoryRequest.map((category) => ({
            value: category.id_pqrs_category,
            label: category.name,
          }))}
          showSearch
          filterOption={filterOption}
          optionFilterProp="children"
        />
      </Form.Item>
      <Form.Item
        name="id_priority"
        label="Prioridad"
        rules={[
          {
            required: true,
            message: "Se necesita especificar una prioridad",
          },
        ]}
      >
        <Select
          placeholder="Prioridad"
          options={priority.map((prior) => ({
            value: prior.id_pqrs_priority,
            label: prior.name,
          }))}
          showSearch
          filterOption={filterOption}
          optionFilterProp="children"
        />
      </Form.Item>
      <Form.Item
        name="title"
        label="Título"
        rules={[
          {
            type: "string",
            min: 1,
            max: 64,
            message: "El título debe tener entre 1 y 64 caracteres",
          },
          {
            required: true,
            message: "Se necesita especificar un título",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Descripción"
        rules={[
          {
            type: "string",
            min: 1,
            max: 500,
            message:
              "La descripción del vehículo debe tener entre 1 y 500 caracteres",
          },
        ]}
      >
        <TextArea placeholder="(Opcional)" rows={4} showCount maxLength={500} />
      </Form.Item>
      <Form.Item>
        <ButtonFormSubmit value={buttonLabel} isLoading={sending} />
      </Form.Item>
    </Form>
  );
};

export default PQRSFormComponent;
