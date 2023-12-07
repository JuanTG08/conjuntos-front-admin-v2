import { useState } from "react";
import ButtonFormSubmit from "../../partials/ButtonFormSubmit";
import { Checkbox, DatePicker, Empty, Form, Input, InputNumber, Select } from "antd";
import { MunicipalityController } from "@/controller/municipality.controller";
import { Link } from "@nextui-org/react";
const { Option } = Select;

const UserToRegisterFormComponent = ({
  onSubmit,
  valuesToForm,
  typesIdentification,
  departamentos,
  genders,
}) => {
  const [form] = Form.useForm();
  const [towns, setTowns] = useState([]);
  const [sending, setSending] = useState(false);
  const handdlerChangeStates = async (value) => {
    const data = await onChangeDepartmentCountry(value);
    if (data.statusCode == 200 && data.payload) {
      setTowns(data.payload);
      form.setFieldValue("id_city", data.payload[0].id_municipality);
    }
  };
  const onChangeDepartmentCountry = async (idDepartment) =>
    await MunicipalityController.viewListAll(idDepartment);

  const onFinish = async (values) => {
    setSending(true);
    await onSubmit(values);
    setSending(false);
  };
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

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
        tooltip="Tu correo electrónico, no puedes modificarlo ya que fue proporcionado por el administrador"
      >
        <Input readOnly disabled />
      </Form.Item>
      <Form.Item
        name="name"
        label="Nombre"
        rules={[
          {
            type: "string",
            min: 1,
            max: 100,
            message: "El nombre debe tener entre 1 y 100 caracteres",
          },
          {
            required: true,
            message: "El nombre es requerido",
          },
        ]}
        tooltip="Tu nombre, debes ingresar tu primer nombre y/o segundo nombre correctamente"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="last_name"
        label="Apellido"
        rules={[
          {
            type: "string",
            min: 1,
            max: 100,
            message: "El apellido debe tener entre 1 y 100 caracteres",
          },
          {
            required: true,
            message: "El apellido es requerido",
          },
        ]}
        tooltip="Tu apellido, debes ingresar tu primer apellido y/o segundo apellido correctamente"
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
        tooltip="La fecha de nacimiento es la fecha en la que naciste, debes indicar una fecha de nacimiento válida"
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
        tooltip="El tipo de identificación es el tipo de documento que usas para identificarte, debes seleccionar uno de los tipos disponibles"
      >
        <Select
          placeholder="Elige un tipo de identificación"
          options={typesIdentification.map((typeId) => ({
            value: typeId.id_type,
            label: `${typeId.id_name} - ${typeId.id_description}`,
          }))}
        />
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
        tooltip="El número de identificación es el número de documento que usas para identificarte, debes ingresar el número de identificación correctamente"
      >
        <InputNumber placeholder="Ej: 123456789" style={{ width: "100%" }} />
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
        tooltip="El número de celular es el número de teléfono que usas para contactarte, debes ingresar el número de celular correctamente ya que será usado dentro del aplicativo"
      >
        <InputNumber placeholder="Ej: 3001234567" style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        name="home_phone"
        label="Número de teléfono fijo"
      >
        <InputNumber placeholder="(Opcional)" style={{ width: "100%" }} />
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
        tooltip="La dirección de residencia es la dirección donde vives, debes ingresar la dirección correctamente"
      >
        <Input placeholder="Ej: Calle 123 # 1-23, Barrio" />
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
        tooltip="El departamento es el departamento donde vives, debes seleccionar uno de los departamentos disponibles"
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
        tooltip="La ciudad es la ciudad donde vives, debes seleccionar una ciudad del departamento que hayas elegido anteriormente"
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
          notFoundContent={<Empty description="No se encontraron ciudades, debes seleccionar un departamento previamente"/>}
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
        tooltip="El género biológico es el sexo con el que naciste. Esta información se utilizará para análisis demográficos y estadísticas."
      >
        <Select
          placeholder="Elije una género"
          options={genders.map((gender) => ({
            value: gender.id_gender,
            label: gender.name_gender,
          }))}
        />
      </Form.Item>
      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(new Error("Debes aceptar los términos y condiciones")),
          },
        ]}
      >
        <Checkbox style={{ marginTop: "10px" }} >
          He leído y acepto los <Link href="/policy-and-privacy" target="_blank">términos y condiciones</Link>
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <ButtonFormSubmit value="Crear Usuario" isLoading={sending} />
      </Form.Item>
    </Form>
  );
};

export default UserToRegisterFormComponent;
