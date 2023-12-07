import { Form, Input, DatePicker, InputNumber, Select } from "antd";
const { Option } = Select;
import React, { useEffect, useState } from "react";
import ButtonFormSubmit from "../../partials/ButtonFormSubmit";
import { FilesUtils } from "@/utils/files.utils";
import { MunicipalityController } from "@/controller/municipality.controller";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ConfigurationUserFormComponent = ({
  onSubmit,
  valuesToForm,
  typesIdentification = [],
  departamentos = [],
  genders = [],
}) => {
  const [sending, setSending] = useState(false);
  const [form] = Form.useForm();
  const [towns, setTowns] = useState([]);
  const [fileList, setFileList] = useState([]);
  useEffect(() => {
    handdlerChangeStates(valuesToForm.id_state, false);
    if (valuesToForm?.management_files?.name_file && fileList.length === 0)
      setFileList([
        {
          uid: valuesToForm.management_files.id_file,
          name: "Imagen",
          status: "done",
          url: FilesUtils.formatGetImages(
            valuesToForm.management_files.name_file
          ),
        },
      ]);
  }, []);

  const handdlerChangeStates = async (value, defaultTown = true) => {
    const data = await onChangeDepartmentCountry(value);
    if (data.statusCode == 200 && data.payload) {
      setTowns(data.payload);
      if (defaultTown)
        form.setFieldValue("id_city", data.payload[0].id_municipality);
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
      name="RegisterForm"
      onFinish={onFinish}
      style={{ width: "100%" }}
      initialValues={valuesToForm}
    >
      <Form.Item
        name="email"
        label="Correo electrónico"
        rules={[
          {
            pattern:
              /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
            message: "Por favor ingresar un email valido.",
          },
          {
            required: true,
            message: "El email es requerido",
          },
        ]}
      >
        <Input readOnly disabled />
      </Form.Item>
      <Form.Item
        name="name"
        label="Nombre"
        rules={[
          {
            type: "string",
            len: [1, 100],
            message: "El nombre debe tener entre 1 y 100 caracteres",
          },
          {
            required: true,
            message: "El nombre es requerido",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="last_name"
        label="Apellido"
        rules={[
          {
            type: "string",
            len: [1, 100],
            message: "El apellido debe tener entre 1 y 100 caracteres",
          },
          {
            required: true,
            message: "El apellido es requerido",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="birthdate"
        label="Fecha de nacimiento"
        rules={[
          {
            required: true,
            message: "La fecha de nacimiento es requerida",
          },
        ]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        name="id_type_identification"
        label="Tipo de Identificación"
        rules={[
          {
            required: true,
            message: "Se necesita especificar un tipo de identificación",
          },
        ]}
      >
        <Select placeholder="Elige un tipo de identificación" allowClear>
          {typesIdentification?.map((typeId) => (
            <Option key={typeId.id_type} value={typeId.id_type}>
              {typeId.id_name} - {typeId.id_description}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="number_identification"
        label="Número de Identificación"
        rules={[
          {
            required: true,
            message: "Se necesita especificar un número de identificación",
          },
        ]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        name="mobile_phone"
        label="Número de celular"
        rules={[
          {
            required: true,
            message: "Se necesita especificar un número de celular",
          },
        ]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item name="home_phone" label="Número de teléfono fijo">
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        name="residence_address"
        label="Dirección de residencia"
        rules={[
          {
            type: "string",
            min: 1,
            max: 64,
            message: "La dirección debe tener entre 1 y 64 caracteres",
          },
          {
            required: true,
            message: "Se necesita especificar una dirección de residencia",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="id_state"
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
          options={departamentos.map((state) => ({
            value: state.id_department,
            label: state.name,
          }))}
          showSearch
          optionFilterProp="children"
          filterOption={filterOption}
        />
      </Form.Item>
      <Form.Item
        name="id_city"
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
        name="id_gender"
        label="Género"
        rules={[
          {
            required: true,
            message: "El género es requerida",
          },
        ]}
      >
        <Select placeholder="Elije una género" allowClear>
          {genders.map((gender) => (
            <Option value={gender.id_gender} key={gender.id_gender}>
              {gender.name_gender}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <ButtonFormSubmit value="Actualizar usuario" isLoading={sending} />
      </Form.Item>
    </Form>
  );
};

export default ConfigurationUserFormComponent;
