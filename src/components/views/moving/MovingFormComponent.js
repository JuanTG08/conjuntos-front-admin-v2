import { DatePicker, Form, Input } from "antd";
const { TextArea } = Input;
import React, { useState } from "react";
import ButtonFormSubmit from "../partials/ButtonFormSubmit";
import dayjs from "dayjs";
import "dayjs/locale/es";
dayjs.locale("es");

const MovingFormComponent = ({ onSubmit, valuesToForm, buttonLabel }) => {
  const [sending, setSending] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setSending(true);
    const response = await onSubmit(values);
    if (!response) {
      setSending(false);
    }
  };

  const disabledDate = (current) => {
    // Deshabilitar fechas mayores a hoy
    return current && current < dayjs().endOf("day");
  };

  // Función para manejar el cambio de fecha
  const onChangeDate = (date) => {
    // Si date es diferente de null, establecer la hora a las 00:00:00
    const fechaConMedianoche = date ? dayjs(date).startOf("day") : null;
    return form.setFieldsValue({ moving_date: fechaConMedianoche });
  };

  return (
    <Form
      name="MovingForm"
      form={form}
      onFinish={onFinish}
      style={{ width: "100%" }}
      initialValues={valuesToForm}
    >
      <Form.Item
        name="description"
        label="Descripción"
        rules={[
          {
            type: "string",
            min: 1,
            max: 300,
            message: "La descripción debe tener entre 1 y 300 caracteres",
          },
          {
            required: true,
            message: "La descripción es requerida",
          },
        ]}
      >
        <TextArea autoFocus rows={4} showCount maxLength={300} />
      </Form.Item>
      <Form.Item
        name="moving_date"
        label="Fecha programada para la mudanza"
        rules={[
          {
            type: "date",
            required: true,
            message: "La fecha es requerida",
          },
        ]}
      >
        <DatePicker
          disabledDate={disabledDate}
          style={{ width: "100%" }}
          format="DD [de] MMMM [de] YYYY"
          onChange={onChangeDate}
          placeholder="Fecha de la mudanza"
        />
      </Form.Item>
      <Form.Item>
        <ButtonFormSubmit value={buttonLabel} isLoading={sending} />
      </Form.Item>
    </Form>
  );
};

export default MovingFormComponent;
