import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { CONST_ADVERTISEMENT_TYPES } from "@/constants/advertisement.constant";
import { Form, Input, Modal, Select, Space, Upload } from "antd";
import ButtonFormSubmit from "../../partials/ButtonFormSubmit";
import ImageUpload from "@/components/Inputs/ImageUpload";
import { FilesUtils } from "@/utils/files.utils";
const { TextArea } = Input;
const { Option } = Select;

const AdvertisementCorrespondenceFormComponent = ({
  onSubmit,
  valuesToForm,
  listDataTower,
}) => {
  const [sending, setSending] = useState(false);
  const [form] = Form.useForm();

  // Imagen
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [typeCorrespondence, setTypeCorrespondence] = useState();
  // Listado de apartamentos escogida por una torre seleccionada
  const [listApartmentSetTower, setListApartmentSetTower] = useState([]);
  // Listado de usuarios escogida por un apartamento seleccionado
  const [listApartmentSetUsers, setListApartmentSetUsers] = useState([]);

  const [disabledButton, setDisabledButton] = useState(false);

  useEffect(() => {
    if (!listDataTower) return;
    setTypeCorrespondence(form.getFieldValue("status_type"));
    form.setFieldValue("type_tower_apart", "");
    form.setFieldValue("type_apartment", "");
    form.setFieldValue("arraysIdsApartments", []);
    form.setFieldValue("arraysIdsUsers", []);
    setListApartmentSetTower([]);
    setListApartmentSetUsers([]);
    const tower = listDataTower.find(
      (tower) => tower.id_tower === valuesToForm.type_tower_apart
    );
    if (!tower?.apartment_complex) return;
    setListApartmentSetTower(tower?.apartment_complex);
    const apartmentByUser = tower.apartment_complex.find(
      (_apartment) => _apartment.id_apartment === valuesToForm.type_apartment
    );
    if (apartmentByUser?.users_roles)
      setListApartmentSetUsers(apartmentByUser.users_roles);

    if (valuesToForm?.management_files?.name_file)
      setImagePreview(
        FilesUtils.formatGetImages(valuesToForm.management_files.name_file)
      );
  }, []);

  // Si el campo de "Tipo de anuncio" cambia se limpiaran los campos
  // Se vaciaran los estados que contienen información
  const handlerChangeTypes = (value) => {
    const idSelected = parseInt(value);
    setTypeCorrespondence(idSelected);
    form.setFieldValue("type_tower_apart", "");
    form.setFieldValue("type_apartment", "");
    form.setFieldValue("arraysIdsApartments", []);
    form.setFieldValue("arraysIdsUsers", []);
    setListApartmentSetTower([]);
    setListApartmentSetUsers([]);
    const tower = listDataTower.find(
      (tower) => tower.id_tower === valuesToForm.type_tower_apart
    );
    if (!tower?.apartment_complex) return;
    setListApartmentSetTower(tower?.apartment_complex);
    const apartmentByUser = tower.apartment_complex.find(
      (_apartment) => _apartment.id_apartment === valuesToForm.type_apartment
    );
    if (apartmentByUser?.users_roles)
      setListApartmentSetUsers(apartmentByUser.users_roles);
  };

  const handlerChangeTypesTowersApartment = (value) => {
    const idSelected = parseInt(value);
    const tower = listDataTower.find((tower) => tower.id_tower === idSelected);
    setListApartmentSetTower([]);
    setListApartmentSetUsers([]);
    form.setFieldValue("type_apartment", "");
    if (tower?.apartment_complex) {
      setListApartmentSetTower(tower.apartment_complex);
    }
    if (listApartmentSetTower) form.setFieldValue("arraysIdsApartments", []);
  };

  // Sí el input tipo select que contiene los apartamentos cambian
  // Se establecerán los usuarios de los apartamentos en "listApartmentSetUsers"
  const handlerChangeApartment = (value) => {
    const idSelected = parseInt(value);
    const apartment = listApartmentSetTower.find(
      (_apartment) => _apartment.id_apartment === idSelected
    );
    setListApartmentSetUsers([]);
    if (apartment?.users_roles) setListApartmentSetUsers(apartment.users_roles);
    if (listApartmentSetUsers) form.setFieldValue("arraysIdsUsers", []);
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const RenderTypeCorrespondence = () => {
    if (!typeCorrespondence) return <></>;
    if (typeCorrespondence === CONST_ADVERTISEMENT_TYPES.APARTMENT.id)
      return (
        <>
          <Form.Item
            name="type_tower_apart"
            label="Elija una torre"
            rules={[
              {
                required: true,
                message: "Por favor, elija una torre",
              },
            ]}
          >
            <Select
              placeholder="Elija una torre"
              onChange={(value) => handlerChangeTypesTowersApartment(value)}
              showSearch
              optionFilterProp="children"
              filterOption={filterOption}
              options={listDataTower.map((tower) => ({
                value: tower.id_tower,
                label: tower.tower_name,
              }))}
            />
          </Form.Item>
          <Form.Item
            name="arraysIdsApartments"
            label="Elije un apartamento"
            rules={[
              {
                required: true,
                message: "Por favor, elija un apartamento",
              },
            ]}
          >
            <Select
              placeholder="Elije apartamentos"
              showSearch
              optionFilterProp="children"
              filterOption={filterOption}
              options={listApartmentSetTower.map((_apartment) => ({
                value: _apartment.id_apartment,
                label: _apartment.apartment_identifier_tower,
              }))}
            />
          </Form.Item>
        </>
      );
    if (typeCorrespondence === CONST_ADVERTISEMENT_TYPES.USERS.id)
      return (
        <>
          <Form.Item
            name="type_tower_apart"
            label="Elije una torre para los Apartamentos"
            rules={[
              {
                required: true,
                message: "Por favor, elija una torre",
              },
            ]}
          >
            <Select
              placeholder="Elije una torre"
              onChange={(value) => handlerChangeTypesTowersApartment(value)}
              showSearch
              optionFilterProp="children"
              filterOption={filterOption}
              options={listDataTower.map((tower) => ({
                value: tower.id_tower,
                label: tower.tower_name,
              }))}
            />
          </Form.Item>
          <Form.Item
            name="arraysIdsApartments"
            label="Elije un apartamento"
            rules={[
              {
                required: true,
                message: "Por favor, elija un apartamento",
              },
            ]}
          >
            <Select
              placeholder="Elije apartamentos"
              onChange={handlerChangeApartment}
              showSearch
              optionFilterProp="children"
              filterOption={filterOption}
              options={listApartmentSetTower.map((_apartment) => ({
                value: _apartment.id_apartment,
                label: _apartment.apartment_identifier_tower,
              }))}
            />
          </Form.Item>
          <Form.Item
            name="arraysIdsUsers"
            label="Elije usuarios"
            rules={[
              {
                required: true,
                message: "Por favor, elija un usuario",
              },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="Elije usuarios"
              showSearch
              optionFilterProp="children"
              filterOption={filterOption}
              options={listApartmentSetUsers.map((users) => ({
                value: users.users.id,
                label: `${users?.users?.name} ${users?.users?.last_name} (${users?.users?.email})`,
              }))}
            />
          </Form.Item>
        </>
      );
  };

  const onFinish = async (values) => {
    setSending(true);
    const resp = await onSubmit(values, selectedImage);
    setDisabledButton(resp);
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
      <Form.Item name="miniature" label="Foto de la Correspondencia">
        <ImageUpload
          onImageSelect={setSelectedImage}
          defaultImage={imagePreview}
        />
      </Form.Item>
      <Form.Item
        name="title"
        label="Titulo de la correspondencia"
        rules={[
          {
            type: "string",
            len: [1, 64],
            message:
              "El titulo de la correspondencia debe tener entre 1 y 64 caracteres",
          },
          {
            required: true,
            message: "El titulo de la correspondencia es requerido",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Descripción de la correspondencia"
        rules={[
          {
            type: "string",
            len: [1, 300],
            message:
              "La descripción de la correspondencia debe tener entre 1 y 300 caracteres",
          },
          {
            required: true,
            message: "La descripción de la correspondencia es requerida",
          },
        ]}
      >
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item
        name="status_type"
        label="Tipo de correspondencia"
        rules={[
          {
            required: true,
            message: "Debes escoger un tipo de correspondencia",
          },
        ]}
      >
        <Select
          placeholder="Elige un tipo de correspondencia"
          allowClear
          onChange={handlerChangeTypes}
        >
          <Option
            key={CONST_ADVERTISEMENT_TYPES.APARTMENT.id}
            value={CONST_ADVERTISEMENT_TYPES.APARTMENT.id}
          >
            {CONST_ADVERTISEMENT_TYPES.APARTMENT.name}
          </Option>
          <Option
            key={CONST_ADVERTISEMENT_TYPES.USERS.id}
            value={CONST_ADVERTISEMENT_TYPES.USERS.id}
          >
            {CONST_ADVERTISEMENT_TYPES.USERS.name}
          </Option>
        </Select>
      </Form.Item>
      <RenderTypeCorrespondence />
      <Form.Item>
        <ButtonFormSubmit
          value="Guardar"
          isLoading={sending}
          isDisabled={disabledButton}
        />
      </Form.Item>
    </Form>
  );
};

export default AdvertisementCorrespondenceFormComponent;
