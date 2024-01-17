import { Form, Input, Select } from "antd";
import React, { useState } from "react";
import ButtonFormSubmit from "../partials/ButtonFormSubmit";
import ImageUpload from "@/components/Inputs/ImageUpload";
const { TextArea } = Input;

const LogsBookIncidentsFormComponent = ({ onSubmit, severities }) => {
  const [sending, setSending] = useState(false);
  const [form] = Form.useForm();
  const [image, setImage] = useState(null);

  const onFinish = async (values) => {
    setSending(true);
    const response = await onSubmit(values, image);
    if (!response) {
      setSending(false);
    }
  };

  return (
    <Form
      name="LogsBookIncidentsForm"
      form={form}
      onFinish={onFinish}
      style={{ width: "100%" }}
    >
      <Form.Item
        name="id_severity"
        label="Severidad del incidente"
        rules={[
          {
            required: true,
            message: "Este campo es requerido",
          },
        ]}
      >
        <Select
          placeholder="Severidades"
          options={severities.map((severity) => ({
            label: severity.name,
            value: severity.id_log_book_severity,
          }))}
        />
      </Form.Item>
      <Form.Item
        name="description"
        label="Descripción"
        rules={[
          {
            type: "string",
            min: 1,
            max: 700,
            message: "La descripción debe tener entre 1 y 700 caracteres",
          },
          {
            required: true,
            message: "La descripción es requerida",
          },
        ]}
      >
        <TextArea
          placeholder="¿Qué sucedió?"
          rows={4}
          showCount
          maxLength={700}
        />
      </Form.Item>
      <Form.Item
        name="location"
        label="Ubicación del incidente"
        rules={[
          {
            type: "string",
            min: 1,
            max: 255,
            message: "La ubicación debe tener entre 1 y 255 caracteres",
          },
        ]}
      >
        <TextArea
          placeholder="¿Dónde fue el incidente?"
          rows={4}
          showCount
          maxLength={700}
        />
      </Form.Item>
      <Form.Item name="id_image_attachment" label="Imagen del incidente">
        <ImageUpload onImageSelect={setImage} />
      </Form.Item>
      <Form.Item>
        <ButtonFormSubmit value={"Agregar"} isLoading={sending} />
      </Form.Item>
    </Form>
  );
};

export default LogsBookIncidentsFormComponent;
