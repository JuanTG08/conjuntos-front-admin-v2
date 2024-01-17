import { ApartmentComplexController } from "@/controller/apartment.controller";
import { Form, Select } from "antd";
import React, { useState } from "react";
import ButtonFormSubmit from "../../partials/ButtonFormSubmit";
const AdvertisementCorrespondeceFilterLockerFormComponent = ({
  towers,
  onSubmit,
  valuesToForm,
}) => {
  const [sending, setSending] = useState(false);
  const [form] = Form.useForm();
  const [apartments, setApartments] = useState([]);

  const fetchListApartment = async (idTower) => {
    try {
      const listApartment = await ApartmentComplexController.viewGetListAll(
        idTower
      );
      if (listApartment.error || listApartment.statusCode != 200)
        return console.log(listApartment.message);
      setApartments(listApartment.payload.apartments);
      form.setFieldValue("apartment_id", null);
    } catch (error) {
      console.log(error);
    }
  };

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
      name="AdvertisementCorrespondenceForm"
      onFinish={onFinish}
      style={{ width: "100%" }}
      initialValues={valuesToForm}
    >
      <Form.Item
        name="tower_id"
        label="Selecciona una torre"
        rules={[
          {
            required: true,
            message:
              "Debes escoger una torre para poder obtener las unidades.",
          },
        ]}
      >
        <Select
          placeholder="Elige una torre"
          onChange={fetchListApartment}
          showSearch
          filterOption={filterOption}
          optionFilterProp="children"
          options={towers.map((tower) => ({
            value: tower.id_tower,
            label: tower.tower_name,
          }))}
        />
      </Form.Item>
      <Form.Item
        name="apartment_id"
        label="Selecciona una unidad"
        rules={[
          {
            required: true,
            message:
              "Debes escoger una unidad para poder obtener el listado de correspondencia.",
          },
        ]}
      >
        <Select
          placeholder="Elige una unidad"
          showSearch
          filterOption={filterOption}
          optionFilterProp="children"
          options={apartments.map((apartment) => ({
            value: apartment.id_apartment,
            label: apartment.apartment_identifier_tower,
          }))}
        />
      </Form.Item>
      <Form.Item>
        <ButtonFormSubmit value="Buscar correspondencia" spaceY={0} isLoading={sending} />
      </Form.Item>
    </Form>
  );
};

export default AdvertisementCorrespondeceFilterLockerFormComponent;
