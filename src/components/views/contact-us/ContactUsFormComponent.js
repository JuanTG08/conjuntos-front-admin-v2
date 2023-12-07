import React from "react";
import { Form, Input, InputNumber, Select } from "antd";
import ButtonFormSubmit from "../partials/ButtonFormSubmit";
const { Option } = Select;

const ContactUsFormComponent = ({ onSubmit }) => {
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      name="ContactUsForm"
      onFinish={onSubmit}
      style={{ width: "100%" }}
      layout="vertical"
    >
      <Form.Item
        name="name_all"
        label="Nombres completos"
        tooltip="Déjanos saber quien eres tú"
        rules={[
          {
            required: true,
            message: "El nombre es requerido",
          },
        ]}
      >
        <Input placeholder="Ingresa tu nombre completo" />
      </Form.Item>
      <Form.Item
        name="email"
        label="Correo electrónico"
        tooltip="Específica un correo electrónico para contactarte"
        rules={[
          {
            pattern:
              /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
            message: "Por favor ingresar un correo electrónico valido.",
          },
          {
            required: true,
            message: "El correo electrónico es requerido",
          },
        ]}
      >
        <Input placeholder="Ingresa tu correo electrónico" />
      </Form.Item>
      <Form.Item
        name="phone"
        label="Número telefónico"
        tooltip="Específica un número telefónico para contactarte"
        rules={[
          {
            pattern: /^[0-9]{10}$/,
            message: "Ingresa un número telefónico válido",
          },
          {
            required: true,
            message: "El número telefónico es requerido",
          },
        ]}
      >
        <InputNumber
          style={{ width: "100%" }}
          placeholder="Ingresa tu número telefónico"
        />
      </Form.Item>
      <Form.Item
        name="name_organization"
        label="Nombre de la organización"
        tooltip="Ingresa el nombre de la entidad, empresa o institución a la que perteneces o representas"
        rules={[
          {
            required: true,
            message: "El nombre de la organización es requerido",
          },
        ]}
      >
        <Input placeholder="Ingresa el nombre de la organización" />
      </Form.Item>
      <Form.Item
        name="service"
        label="Servicio de interés"
        tooltip="Especifícanos que servicio te gustó"
        rules={[
          {
            required: true,
            message: "Elige un servicio de interés",
          },
        ]}
      >
        <Select placeholder="Elige un servicio de interés">
          <Option value="1">Plan Estándar Mensual</Option>
          <Option value="2">Plan Estándar Anual</Option>
          <Option value="3">Plan Estándar Semestral</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <ButtonFormSubmit value="¡Contáctenos!" />
      </Form.Item>
    </Form>
  );
};

export default ContactUsFormComponent;
