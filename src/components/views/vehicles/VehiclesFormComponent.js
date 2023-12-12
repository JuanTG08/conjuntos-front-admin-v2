import { Form, Input, Select } from "antd";
import React, { useState } from "react";
import ButtonFormSubmit from "../partials/ButtonFormSubmit";
const { TextArea } = Input;

const VehiclesFormComponent = ({ onSubmit, typesVehicles, buttonLabel, valuesToForm }) => {
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
      name="PetsForm"
      form={form}
      onFinish={onFinish}
      style={{ width: "100%" }}
      initialValues={valuesToForm}
    >
      <Form.Item
        name="id_type_vehicle"
        label="Tipo del vehículo"
        rules={[
          {
            required: true,
            message: "Se necesita especificar un tipo de vehículo",
          },
        ]}
      >
        <Select
          placeholder="Tipo de vehículo"
          options={typesVehicles.map((typeVehicle) => ({
            value: typeVehicle.id_type_vehicle,
            label: typeVehicle.name,
          }))}
          showSearch
          filterOption={filterOption}
          optionFilterProp="children"
        />
      </Form.Item>
      <Form.Item
        name="brand"
        label="Marca del vehículo"
        rules={[
          {
            type: "string",
            min: 1,
            max: 15,
            message: "La marca del vehículo debe tener entre 1 y 60 caracteres",
          },
          {
            required: true,
            message: "Se necesita especificar una marca de vehículo",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="model_car"
        label="Modelo del vehículo"
        rules={[
          {
            type: "string",
            min: 1,
            max: 15,
            message:
              "El modelo del vehículo debe tener entre 1 y 100 caracteres",
          },
          {
            required: true,
            message: "Se necesita especificar un modelo de vehículo",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="plate"
        label="Placa del vehículo"
        rules={[
          {
            type: "string",
            min: 1,
            max: 15,
            message: "La placa del vehículo debe tener entre 1 y 15 caracteres",
          },
          {
            required: true,
            message: "Se necesita especificar una placa de vehículo",
          }
        ]}
      >
        <Input placeholder="Ej: ABC 123" />
      </Form.Item>
      <Form.Item
        name="description"
        label="Descripción del vehículo"
        rules={[
          {
            type: "string",
            min: 1,
            max: 255,
            message:
              "La descripción del vehículo debe tener entre 1 y 255 caracteres",
          },
        ]}
      >
        <TextArea placeholder="(Opcional)" rows={4} showCount maxLength={255} />
      </Form.Item>
      <Form.Item>
        <ButtonFormSubmit value={buttonLabel} isLoading={sending} />
      </Form.Item>
    </Form>
  );
};

export default VehiclesFormComponent;
