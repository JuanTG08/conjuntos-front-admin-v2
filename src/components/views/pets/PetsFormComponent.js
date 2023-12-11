import {
  CONST_GENDER_FEMALE,
  CONST_GENDER_MALE,
} from "@/constants/pets.constant";
import { DatePicker, Form, Input, InputNumber, Select } from "antd";
import dayjs from "dayjs";
const { Option } = Select;
import React, { useEffect, useState } from "react";
import ButtonFormSubmit from "../partials/ButtonFormSubmit";
import "dayjs/locale/es";
dayjs.locale("es");

const PetsFormComponent = ({
  onSubmit,
  valuesToForm,
  typePets = [],
  colorsPet = [],
  behaviorPet = [],
  otherBreed,
  buttonLabel,
}) => {
  const [sending, setSending] = useState(false);
  const [form] = Form.useForm();
  const [breedPets, setBreedPets] = useState([]);

  useEffect(() => {
    if (!valuesToForm?.type_pet) return;
    setBreedPets(typePets.find((type) => type.id_type_pet === valuesToForm.type_pet).breed_pets);
  }, [])
  const changeTypePet = (value) => {
    typePets.map(
      (typePet) =>
        typePet.id_type_pet === value && setBreedPets(typePet.breed_pets)
    );
    if (otherBreed) setBreedPets((lastBreed) => [...lastBreed, otherBreed]);
    form.setFieldValue("breed", "");
  };
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const disabledDate = (current) => {
    // Deshabilitar fechas mayores a hoy
    return current && current > dayjs().endOf("day");
  };

  const onFinish = async (values) => {
    setSending(true);
    await onSubmit(values);
    setSending(false);
  };

  // Función para manejar el cambio de fecha
  const onChangeDate = (date) => {
    // Si date es diferente de null, establecer la hora a las 00:00:00
    const fechaConMedianoche = date ? dayjs(date).startOf("day") : null;
  };

  return (
    <Form
      name="PetsForm"
      form={form}
      onFinish={onFinish}
      style={{ width: "100%" }}
      initialValues={valuesToForm}
    >
      <Form.Item
        name="name"
        label="Nombre de la mascota"
        rules={[
          {
            type: "string",
            min: 1,
            max: 100,
            message:
              "El nombre de la mascota debe tener entre 1 y 100 caracteres",
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
        name="type_pet"
        label="Tipo de mascota"
        rules={[
          {
            required: true,
            message: "Se necesita especificar un tipo de mascota",
          },
        ]}
      >
        <Select
          placeholder="Tipo de mascotas"
          options={typePets.map((typePet) => ({
            value: typePet.id_type_pet,
            label: typePet.name,
          }))}
          onChange={changeTypePet}
          showSearch
          filterOption={filterOption}
          optionFilterProp="children"
        />
      </Form.Item>
      {breedPets.length > 0 && (
        <Form.Item
          name="breed"
          label="Raza de la mascota"
          rules={[
            {
              required: true,
              message: "Se necesita especificar una raza de la mascota",
            },
          ]}
        >
          <Select
            placeholder="Raza de la mascotas"
            options={breedPets.map((breed) => ({
              value: breed.id_breed_pet,
              label: breed.name,
            }))}
            showSearch
            filterOption={filterOption}
            optionFilterProp="children"
          />
        </Form.Item>
      )}
      <Form.Item
        name="gender"
        label="Sexo de la mascota"
        rules={[
          {
            required: true,
            message: "Se necesita indicar que sexo tiene la mascota",
          },
        ]}
      >
        <Select
          placeholder="Sexo de la mascota"
          options={[
            {
              value: CONST_GENDER_MALE.id,
              label: CONST_GENDER_MALE.value,
            },
            {
              value: CONST_GENDER_FEMALE.id,
              label: CONST_GENDER_FEMALE.value,
            },
          ]}
        />
      </Form.Item>
      <Form.Item
        name="color"
        label="Color de la mascota"
        rules={[
          {
            required: true,
            message: "Se necesita especificar la edad de la mascota válida",
          },
        ]}
      >
        <Select placeholder="Color de la mascota">
          {colorsPet.map((color) => (
            <Option key={color.id_color} value={color.id_color}>
              <div className="flex items-center">
                <div
                  className={`w-4 h-4 mr-2`}
                  style={{ backgroundColor: "#" + color.hex_code }}
                ></div>
                <span className="flex-grow">{color.color_name}</span>
              </div>
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="birth_day" label="Fecha de nacimiento">
        <DatePicker
          disabledDate={disabledDate}
          style={{ width: "100%" }}
          format="DD [de] MMMM [de] YYYY"
          onChange={onChangeDate}
          placeholder="(Opcional)"
        />
      </Form.Item>
      <Form.Item name="last_vaccine" label="Última vacuna">
        <DatePicker
          disabledDate={disabledDate}
          style={{ width: "100%" }}
          format="DD [de] MMMM [de] YYYY"
          onChange={onChangeDate}
          placeholder="(Opcional)"
        />
      </Form.Item>
      <Form.Item name="behavior" label="Personalidad de tu mascota">
        <Select
          placeholder="(Opcional)"
          options={behaviorPet.map((behavior) => ({
            value: behavior.id_behavior,
            label: behavior.behavior_name,
          }))}
          showSearch
          filterOption={filterOption}
          optionFilterProp="children"
        />
      </Form.Item>
      <Form.Item>
        <ButtonFormSubmit value={buttonLabel} isLoading={sending} />
      </Form.Item>
    </Form>
  );
};

export default PetsFormComponent;
