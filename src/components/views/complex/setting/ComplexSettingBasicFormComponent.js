import { useState } from "react";
import { DatePicker, Form, Input, InputNumber, Select } from "antd";
import ButtonFormSubmit from "../../partials/ButtonFormSubmit";
import { MunicipalityController } from "@/controller/municipality.controller";
const { Option } = Select;

const ComplexSettingBasicFormComponent = ({
  valuesToForm,
  onSubmit,
  resState,
  initialTowns,
}) => {
  const [sending, setSending] = useState(false);
  const [towns, setTowns] = useState(initialTowns);
  const [form] = Form.useForm();
  const handdlerChangeStates = async (value) => {
    const data = await onChangeDepartmentCountry(value);
    if (data.statusCode == 200 && data.payload) {
      setTowns(data.payload);
      form.setFieldValue("id_complex_city", data.payload[0].municipality);
    }
  };
  const onChangeDepartmentCountry = async (idDepartment) =>
    await MunicipalityController.viewListAll(idDepartment);
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const onFinish = async (values) => {
    setSending(true);
    await onSubmit(values);
    setSending(false);
  };
  return (
    <Form
      form={form}
      name="ComplexFormBasic"
      onFinish={onFinish}
      style={{ width: "100%" }}
      initialValues={valuesToForm}
    >
      <Form.Item
        name="complex_name"
        label="Nombre del Conjunto"
        rules={[
          {
            type: "string",
            len: [5, 120],
            message:
              "El nombre del conjunto debe tener entre 5 y 120 caracteres",
          },
          {
            required: true,
            message: "El nombre del conjunto es requerido",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="complex_nit"
        label="NIT Del Conjunto"
        rules={[
          {
            type: "string",
            len: [1, 64],
            message: "El nit del conjunto debe tener entre 1 y 64 caracteres",
          },
          {
            required: true,
            message: "El nit del conjunto es requerido",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="complex_country"
        label="País"
        rules={[
          {
            required: true,
            message: "El país es requerido",
          },
        ]}
      >
        <Select>
          <Option value="COLOMBIA">Colombia</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="complex_state"
        label="Departamento"
        rules={[
          {
            required: true,
            message: "El departamento es requerido",
          },
        ]}
      >
        <Select
          placeholder="Elije un Departamento"
          onChange={handdlerChangeStates}
          options={resState.map((state) => ({
            value: state.id_department,
            label: state.name,
          }))}
          showSearch
          optionFilterProp="children"
          filterOption={filterOption}
        />
      </Form.Item>
      <Form.Item
        name="id_complex_city"
        label="Ciudad"
        rules={[
          {
            required: true,
            message: "La ciudad es requerida",
          },
        ]}
      >
        <Select
          placeholder="Elije una ciudad"
          options={towns.map((town) => ({
            value: town.id_municipality,
            label: town.name,
          }))}
          showSearch
          optionFilterProp="children"
          filterOption={filterOption}
        />
      </Form.Item>
      <Form.Item
        name="complex_address"
        label="Dirección"
        rules={[
          {
            type: "string",
            len: [1, 64],
            message:
              "La dirección del conjunto debe tener entre 1 y 64 caracteres",
          },
          {
            required: true,
            message: "La dirección del conjunto es requerido",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="complex_neighborhood"
        label="Barrio"
        rules={[
          {
            type: "string",
            len: [1, 64],
            message:
              "El barrio del conjunto debe tener entre 1 y 64 caracteres",
          },
          {
            required: true,
            message: "El barrio es requerido",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="admin_phone"
        label="Número de la Administración"
        rules={[
          {
            type: "string",
            min: 1,
            max: 20,
            message:
              "El número de la administración debe tener entre 1 20 caracteres",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="porter_phone"
        label="Número de la Portería"
        rules={[
          {
            type: "string",
            min: 1,
            max: 20,
            message:
              "El número de la portería debe tener entre 1 20 caracteres",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="web_site"
        label="Sitio Web"
        rules={[
          {
            type: "string",
            len: [1, 120],
            message:
              "El sitio web del conjunto debe tener entre 1 y 64 caracteres",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="complex_zip"
        label="ZIP"
        rules={[
          {
            type: "string",
            len: [1, 120],
            message: "El ZIP del conjunto debe tener entre 1 y 64 caracteres",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="number_buildings"
        label="Numero Total de Torres o Construcciones"
        rules={[
          {
            type: "number",
            message:
              "El Numero Total de Torres o Construcciones debe contener solo números",
          },
          {
            required: true,
            message: "El número de torres o construcciones es requerido",
          },
        ]}
      >
        <InputNumber
          style={{
            width: "100%",
          }}
        />
      </Form.Item>
      <Form.Item
        name="number_units"
        label="Numero total de Unidades"
        rules={[
          {
            type: "number",
            message: "El Numero total de Unidades debe contener solo números",
          },
          {
            required: true,
            message: "El número de unidades o unidades es requerido",
          },
        ]}
      >
        <InputNumber
          style={{
            width: "100%",
          }}
        />
      </Form.Item>
      <Form.Item
        name="construction_date"
        label="Fecha de Construcción"
        rules={[
          {
            type: "object",
            required: true,
            message: "La fecha de construcción es requerida",
          },
        ]}
      >
        <DatePicker placeholder="Elige una fecha" style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        name="total_area"
        label="Area total del Conjunto Residencial (Metros cuadrados)"
        rules={[
          {
            type: "number",
            message: "El área total de la unidad debe contener solo números",
          },
          {
            required: true,
            message: "El área total del conjunto es requerido",
          },
        ]}
      >
        <InputNumber
          style={{
            width: "100%",
          }}
        />
      </Form.Item>
      <Form.Item
        name="id_complex_status"
        label="Estado del Conjunto"
        rules={[
          {
            required: true,
            message: "El estado del conjunto es requerido",
          },
        ]}
      >
        <Select placeholder="Elije un estado" disabled={true} allowClear>
          <Option value="1">Activo</Option>
          <Option value="2">Inactivo</Option>
          <Option value="3">Moroso</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <ButtonFormSubmit value="Actualizar" isLoading={sending} />
      </Form.Item>
    </Form>
  );
};

export default ComplexSettingBasicFormComponent;
