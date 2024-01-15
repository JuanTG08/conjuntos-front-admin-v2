import { useEffect, useState } from "react";
import { CONST_TYPE_ADVERTISEMENT } from "@/constants/advertisement_types.constant";
import { Form, Input, Modal, Select, Space, Typography, Upload } from "antd";
const { Text } = Typography;
import { PlusOutlined } from "@ant-design/icons";
import ButtonFormSubmit from "../partials/ButtonFormSubmit";
import dayjs from "dayjs";
import { FilesUtils } from "@/utils/files.utils";
import ImageUpload from "@/components/Inputs/ImageUpload";
const { TextArea } = Input;
const { Option } = Select;

const disabledDateStart = (current) => {
  // Formatea current como una instancia de dayjs
  const currentDate = dayjs(current);

  // Compara si currentDate es anterior a hoy
  return currentDate.isBefore(dayjs(), "day");
};

const disabledDateEnd = (current, dateStart) => {
  // Formatea current como una instancia de dayjs
  const currentDate = dayjs(current);
  const startDate = dayjs(dateStart);

  if (startDate.isValid()) return currentDate.isBefore(startDate, "day");

  // Compara si currentDate es anterior a hoy
  return currentDate.isBefore(dayjs(), "day");
};

const AdvertisementFormComponent = ({
  valuesToForm,
  onSubmit,
  listTypes,
  listDataTower,
  status,
}) => {
  const [disabledButton, setDisabledButton] = useState(false);
  const [sending, setSending] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  // Tipo de dato seleccionado
  const [typeAdvertisement, setTypeAdvertisement] = useState(false);

  // Listado de apartamentos escogida por una torre seleccionada
  const [listApartmentSetTower, setListApartmentSetTower] = useState([]);
  // Listado de usuarios escogida por un apartamento seleccionado
  const [listApartmentSetUsers, setListApartmentSetUsers] = useState([]);

  // Imagen
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (!valuesToForm || !listDataTower) return;
    if (valuesToForm.status_type)
      setTypeAdvertisement(valuesToForm.status_type);
    if (valuesToForm?.management_files?.name_file)
      setImagePreview(
        FilesUtils.formatGetImages(valuesToForm.management_files.name_file)
      );
    switch (valuesToForm.status_type) {
      case CONST_TYPE_ADVERTISEMENT.TOWERS.id:
        break;
      case CONST_TYPE_ADVERTISEMENT.APARTMENT.id:
        const towerByApartment = listDataTower.find(
          (tower) => tower.id_tower === valuesToForm.type_tower_apart
        );
        if (towerByApartment?.apartment_complex)
          setListApartmentSetTower(towerByApartment?.apartment_complex);
        break;
      case CONST_TYPE_ADVERTISEMENT.USERS.id:
        const towerByUser = listDataTower.find(
          (tower) => tower.id_tower === valuesToForm.type_tower_apart
        );
        if (!towerByUser) break;
        if (towerByUser.apartment_complex)
          setListApartmentSetTower(towerByUser.apartment_complex);
        const apartmentByUser = towerByUser.apartment_complex.find(
          (_apartment) =>
            _apartment.id_apartment === valuesToForm.type_apartment
        );
        if (!apartmentByUser?.users_roles) break;
        setListApartmentSetUsers(apartmentByUser.users_roles);
        break;
      default:
        break;
    }
  }, []);

  // Si el campo de "Tipo de anuncio" cambia se limpiaran los campos
  // Se vaciaran los estados que contienen información
  const handlerChangeTypes = (value) => {
    const idSelected = parseInt(value);
    setTypeAdvertisement(idSelected);
    form.setFieldValue("type_tower_apart", "");
    form.setFieldValue("type_apartment", "");
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

  // Si el campo de "Torre" cambia se limpiaran los campos
  // Se establecerán los apartamentos de la torre en "listApartmentSetTower"
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

  // Dependiendo del tipo de anuncio se renderizará campos en especifico
  const ViewInputsTypes = () => {
    // Si el "typeAdvertisement" es igual a tipo "conjunto"
    // Se visualizara un campo con el nombre del conjunto residencial en cuestión
    if (typeAdvertisement === CONST_TYPE_ADVERTISEMENT.COMPLEX.id)
      return (
        <Form.Item name="type_complex" label="Conjuntos residenciales">
          <Input readOnly />
        </Form.Item>
      );
    // Si el "typeAdvertisement" es igual a tipo "torres"
    // Se visualizara un campo con el nombre del conju nto residencial en cuestión
    // Se visualizaran todas las torres que contengan el conjunto residencial en forma de "checkbox"
    if (typeAdvertisement === CONST_TYPE_ADVERTISEMENT.TOWERS.id)
      return (
        <>
          <Form.Item name="type_complex" label="Conjuntos residenciales">
            <Input readOnly />
          </Form.Item>
          <Form.Item name="arraysIdsTowers" label="Elije las torres">
            <Select
              mode="multiple"
              placeholder="Elije las torres referentes"
              allowClear
            >
              {listDataTower.map((tower) => (
                <Option key={tower.id_tower} value={tower.id_tower}>
                  {tower.tower_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </>
      );
    // Si el "typeAdvertisement" es igual a tipo "apartamentos"
    // Se visualizaran todas las torres que contengan el conjunto residencial en forma de un select
    // Sí se escoge una torre se visualizaran todos los apartamentos que pertenezcan a esa torre en forma de "checkbox"
    if (typeAdvertisement === CONST_TYPE_ADVERTISEMENT.APARTMENT.id) {
      return (
        <>
          <Form.Item name="type_complex" label="Conjuntos residenciales">
            <Input readOnly />
          </Form.Item>
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
              allowClear
              onChange={(value) => handlerChangeTypesTowersApartment(value)}
            >
              {listDataTower.map((tower) => (
                <Option key={tower.id_tower} value={tower.id_tower}>
                  {tower.tower_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          {listApartmentSetTower ? (
            <Form.Item name="arraysIdsApartments" label="Elije un apartamento">
              <Select
                mode="multiple"
                placeholder="Elije apartamentos"
                allowClear
              >
                {listApartmentSetTower.map((_apartment) => (
                  <Option
                    key={_apartment.id_apartment}
                    value={_apartment.id_apartment}
                  >
                    {_apartment.apartment_identifier_tower}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          ) : (
            <></>
          )}
        </>
      );
    }
    // Si el "typeAdvertisement" es igual a tipo "usuarios"
    // Se visualizaran todas las torres que contengan el conjunto residencial en forma de un select
    // Sí se escoge una torre se visualizaran todos los apartamentos que pertenezcan a esa torre en forma de un select
    // Sí se escoge un apartamento se visualizaran todos los usuarios que pertenezcan a esa apartamento en forma de "checkbox"
    if (typeAdvertisement === CONST_TYPE_ADVERTISEMENT.USERS.id)
      return (
        <>
          <Form.Item name="type_complex" label="Conjuntos residenciales">
            <Input readOnly />
          </Form.Item>
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
              allowClear
              onChange={(value) => handlerChangeTypesTowersApartment(value)}
            >
              {listDataTower.map((tower) => (
                <Option key={tower.id_tower} value={tower.id_tower}>
                  {tower.tower_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          {listApartmentSetTower && listApartmentSetTower.length > 0 ? (
            <>
              <Form.Item name="type_apartment" label="Elije un apartamento">
                <Select
                  placeholder="Elije un apartamento para el usuario"
                  allowClear
                  onChange={handlerChangeApartment}
                >
                  {listApartmentSetTower.map((_apartment) => (
                    <Option
                      key={_apartment.id_apartment}
                      value={_apartment.id_apartment}
                    >
                      {_apartment.apartment_identifier_tower}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              {listApartmentSetUsers && listApartmentSetUsers.length > 0 ? (
                <Form.Item name="arraysIdsUsers" label="Elije usuarios">
                  <Select
                    mode="multiple"
                    placeholder="Elije usuarios"
                    allowClear
                  >
                    {listApartmentSetUsers.map((users) => {
                      if (!users?.users) return;
                      return (
                        <Option key={users.users.id} value={users?.users?.id}>
                          {`${users?.users?.name} ${users?.users?.last_name} (${users?.users?.email})`}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              ) : (
                <>No hay usuarios establecidos para esta torre</>
              )}
            </>
          ) : (
            <>No hay apartamentos establecidos para esta torre</>
          )}
        </>
      );
    return <></>;
  };

  const onFinish = async (data) => {
    setSending(true);
    const resp = await onSubmit(data, selectedImage);
    setDisabledButton(resp);
    setSending(false);
  };

  return (
    <Form
      form={form}
      name="AdvertisementComplexForm"
      onFinish={onFinish}
      style={{ width: "100%" }}
      initialValues={valuesToForm}
    >
      <Form.Item
        name="title"
        label="Titulo del anuncio"
        rules={[
          {
            type: "string",
            len: [1, 64],
            message: "El titulo del anuncio debe tener entre 1 y 64 caracteres",
          },
          {
            required: true,
            message: "El titulo del anuncio es requerido",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Descripción del anuncio"
        rules={[
          {
            type: "string",
            min: 1,
            max: 1000,
            message:
              "La descripción del anuncio debe tener entre 1 y 1000 caracteres",
          },
          {
            required: true,
            message: "La descripción del anuncio es requerida",
          },
        ]}
      >
        <TextArea rows={4} showCount maxLength={1000} />
      </Form.Item>
      <Form.Item name="miniature" label="Miniatura del anuncio">
        <ImageUpload
          onImageSelect={setSelectedImage}
          defaultImage={imagePreview}
        />
      </Form.Item>
      <Form.Item
        name="status_adv"
        label="Estado del anuncio"
        rules={[
          {
            required: true,
            message: "El estado del anuncio es requerida",
          },
        ]}
      >
        <Select placeholder="Elige un estado del anuncio" allowClear>
          {status.map((_status) => (
            <Option
              key={_status.id_status_advertisement}
              value={_status.id_status_advertisement}
            >
              {_status.status_name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="status_type"
        label="Alcance de anuncio"
        rules={[
          {
            required: true,
            message: "Debes escoger un tipo de anuncio",
          },
        ]}
      >
        <Select
          placeholder="Elige un tipo de anuncio"
          allowClear
          onChange={(value) => handlerChangeTypes(value)}
        >
          {listTypes.map((type) => (
            <Option
              key={type.id_type_advertisement}
              value={type.id_type_advertisement}
            >
              {type.type_name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <ViewInputsTypes />
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

export default AdvertisementFormComponent;
