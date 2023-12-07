import React, { useState } from "react";
import { DatePicker, Form, Input, Select, Switch } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import ButtonFormSubmit from "../partials/ButtonFormSubmit";
const { TextArea } = Input;
const { Option } = Select;
const { TimePicker } = DatePicker;

const categoryAccess = [
  {
    id: 1,
    name: "Visitas de Invitados",
    description: "Registrar amigos y familiares que visitan el apartamento.",
  },
  {
    id: 2,
    name: "Trabajadores de Mantenimiento",
    description: "Permitir el acceso de personal de mantenimiento.",
  },
  {
    id: 3,
    name: "Repartidores",
    description: "Autorizar la entrada de repartidores.",
  },
  {
    id: 4,
    name: "Personal de Servicio",
    description:
      "Permitir la entrada de personal de limpieza, jardineros, etc.",
  },
  {
    id: 5,
    name: "Contratistas",
    description:
      "Para dar acceso a contratistas que realicen trabajos en el apartamento.",
  },
];

const disabledDate = (current) => {
  // Formatea current como una instancia de dayjs
  const currentDate = dayjs(current);

  // Compara si currentDate es anterior a hoy
  return currentDate.isBefore(dayjs(), "day");
};


const AccessPersonFormComponent = ({ onSubmit, valuesToForm }) => {
  const [sending, setSending] = useState(false);
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    setSending(true);
    await onSubmit(values);
    setSending(false);
  };
  return (
    <Form
      form={form}
      name="AccessPersonFormComponent"
      onFinish={onFinish}
      style={{ width: "100%" }}
      initialValues={valuesToForm}
    >
      <Form.Item
        name="dni_person"
        label="Número de identificación"
        rules={[
          {
            type: "string",
            max: 20,
            message: "Este campo debe tener entre 1 y 20 caracteres",
          },
          {
            required: true,
            message: "Este campo es requerido",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="name_person"
        label="Nombre completo"
        rules={[
          {
            type: "string",
            max: 64,
            min: 1,
            message: "Este campo debe tener entre 1 y 64 caracteres",
          },
          {
            required: true,
            message: "Este campo es requerido",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Correo electrónico"
        rules={[
          {
            pattern:
              /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
            message: "Por favor ingresar un email valido.",
          },
        ]}
      >
        <Input placeholder="(Opcional)" />
      </Form.Item>
      <Form.Item
        name="id_category_access"
        label="Categoría de acceso"
        rules={[
          {
            required: true,
            message: "Este campo es requerido",
          },
        ]}
      >
        <Select placeholder="Escoger una categoría de acceso">
          {categoryAccess.map((category) => (
            <Option key={category.id} value={category.id}>
              {category.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="parking" label="Parking" valuePropName="checked">
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
        />
      </Form.Item>
      <Form.Item
        name="start_day_allowed"
        label="Fecha de inicio de acceso"
        rules={[
          {
            type: "date",
            required: true,
          },
        ]}
      >
        <DatePicker
          disabledDate={disabledDate}
          style={{ width: "100%" }}
          allowClear={false}
        />
      </Form.Item>
      <Form.Item
        name="end_day_allowed"
        label="Fecha final del acceso"
        rules={[
          {
            type: "date",
            required: true,
          },
        ]}
      >
        <DatePicker
          disabledDate={disabledDate}
          style={{ width: "100%" }}
          allowClear={false}
        />
      </Form.Item>
      <Form.Item
        name="start_hour_day"
        label="Hora de ingreso"
        rules={[
          {
            type: "date",
            required: true,
          },
        ]}
      >
        <TimePicker
          format={"HH:mm"}
          style={{ width: "100%" }}
          allowClear={false}
          showNow={false}
        />
      </Form.Item>
      <Form.Item
        name="end_hour_day"
        label="Hora de Salida"
        rules={[
          {
            type: "date",
            required: true,
          },
        ]}
      >
        <TimePicker
          format={"HH:mm"}
          style={{ width: "100%" }}
          allowClear={false}
          showNow={false}
        />
      </Form.Item>
      <Form.Item
        name="comments"
        label="Comentarios"
        rules={[
          {
            type: "string",
            max: 264,
            message: "Este campo debe tener 1 y 264 caracteres",
          },
        ]}
      >
        <TextArea
          placeholder="Escribe aquí un comentario - opcional"
          rows={4}
        />
      </Form.Item>
      <Form.Item>
        <ButtonFormSubmit value="Guardar" isLoading={sending} />
      </Form.Item>
    </Form>
  );
};

export default AccessPersonFormComponent;
