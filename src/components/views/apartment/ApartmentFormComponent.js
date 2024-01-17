import { useEffect, useState } from "react";
import { StatusController } from "@/controller/status.controller";
import { DatePicker, Form, Input, InputNumber, Select } from "antd";
const { Option } = Select;
import ButtonFormSubmit from "../partials/ButtonFormSubmit";

const ApartmentFormComponent = ({ onSubmit, valuesToForm }) => {
  const [form] = Form.useForm();
  const [status, setStatus] = useState([]);
  useEffect(() => {
    fetchGetStatusApartmentComplex();
  }, []);
  const fetchGetStatusApartmentComplex = async () => {
    try {
      const getStatusApartmentComplex =
        await StatusController.viewGetStatusApartmentComplex();
      if (
        getStatusApartmentComplex.error ||
        !getStatusApartmentComplex.payload ||
        getStatusApartmentComplex.statusCode != 200
      )
        return;
      setStatus(getStatusApartmentComplex.payload);
    } catch (error) {
      console.log(error);
    }
  };
  const RenderedStatus = () => {
    if (!status)
      return (
        <option disabled hidden value="">
          Cargando...
        </option>
      );
    return (
      <>
        <option disabled value="">
          Elije un estado
        </option>
        {status.map((_status) => {
          return (
            <option
              value={_status.id_status_apartment}
              key={_status.id_status_apartment}
            >
              {_status.status_name}
            </option>
          );
        })}
      </>
    );
  };
  return (
    <Form
      form={form}
      name="ApartmentComplexForm"
      onFinish={onSubmit}
      style={{ width: "100%" }}
      initialValues={valuesToForm}
    >
      <Form.Item
        name="apartment_identifier_tower"
        label="Identificación de la unidad"
        rules={[
          {
            type: "string",
            len: [1, 64],
            message:
              "El nombre de la unidad debe tener entre 1 y 64 caracteres",
          },
          {
            required: true,
            message: "El nombre de la unidad es requerido",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="level_floor" label="Piso de la unidad">
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item name="number_bedrooms" label="Número total de habitaciones">
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item name="number_bathrooms" label="Numero total de baños">
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        name="total_area"
        label="Área de la unidad (Metros)"
        rules={[
          {
            required: true,
            message: "El total del área es requerido",
          },
        ]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item name="number_residents" label="Número de residentes">
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        name="construction_date"
        label="Fecha de Construcción"
        rules={[
          {
            type: "object",
            required: true,
            message: "La fecha de construcción de la unidad es requerida",
          },
        ]}
      >
        <DatePicker placeholder="Elige una fecha" style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        name="start_date"
        label="Fecha de alojamiento"
      >
        <DatePicker placeholder="Elige una fecha" style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        name="id_status_apartment"
        label="Estado de la unidad"
        rules={[
          {
            required: true,
            message: "Se necesita especificar un estado para la unidad",
          },
        ]}
      >
        <Select placeholder="Elige un estado" allowClear>
          {status.map((_status) => (
            <Option key={_status.id_status_apartment} value={_status.id_status_apartment}>
              {_status.status_name}
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

export default ApartmentFormComponent;
