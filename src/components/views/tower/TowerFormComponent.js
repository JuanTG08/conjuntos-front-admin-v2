import React, { useEffect, useState } from "react";
import { StatusController } from "@/controller/status.controller";
import { DatePicker, Form, Input, InputNumber, Select } from "antd";
import ButtonFormSubmit from "../partials/ButtonFormSubmit";
const { Option } = Select;

const TowerFormComponent = ({ onSubmit, valuesToForm }) => {
  const [form] = Form.useForm();
  const [statusTowerComplex, setStatusTowerComplex] = useState([]);
  useEffect(() => {
    fetchGetStatusTowerComplex();
  }, []);
  const fetchGetStatusTowerComplex = async () => {
    try {
      const getStatusTowerComplex =
        await StatusController.viewGetStatusTowerComplex();
      if (
        getStatusTowerComplex.error ||
        !getStatusTowerComplex.payload ||
        getStatusTowerComplex.statusCode != 200
      )
        return;
      setStatusTowerComplex(getStatusTowerComplex.payload);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form
      form={form}
      name="TowerComplexForm"
      onFinish={onSubmit}
      style={{ width: "100%" }}
      initialValues={valuesToForm}
    >
      <Form.Item
        name="tower_name"
        label="Nombre de la torre"
        rules={[
          {
            type: "string",
            len: [1, 64],
            message: "El nombre de la torre debe tener entre 1 y 64 caracteres",
          },
          {
            required: true,
            message: "El nombre de la torre es requerida",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="number_floors"
        label="Número total de pisos"
        rules={[
          {
            required: true,
            message: "Se necesita especificar cuantos pisos contiene la torre",
          },
        ]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        name="number_apartments"
        label="Número total de unidades dentro de la torre"
        rules={[
          {
            required: true,
            message:
              "Se necesita especificar el numero total de unidades en la torre",
          },
        ]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        name="construction_date"
        label="Fecha de Construcción"
        rules={[
          {
            required: true,
            message: "La fecha de construcción es requerida",
          },
        ]}
      >
        <DatePicker placeholder="Elige una fecha" style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        name="id_status_tower"
        label="Estado de la torre"
        rules={[
          {
            required: true,
            message: "Se necesita especificar un estado para la torre",
          },
        ]}
      >
        <Select placeholder="Elige un estado" allowClear>
          {statusTowerComplex.map((status) => (
            <Option key={status.id_status_tower} value={status.id_status_tower}>
              {status.status_name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <ButtonFormSubmit value="Guardar" />
      </Form.Item>
    </Form>
  );
};

export default TowerFormComponent;
