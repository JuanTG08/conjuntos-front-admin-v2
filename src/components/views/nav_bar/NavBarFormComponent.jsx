import { Form, Input, Select } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import ButtonFormSubmit from "../partials/ButtonFormSubmit";
import { CONST_NAVBAR_LIST_ICONS } from "@/constants/navbar.constant";

const NavBarFormComponent = ({
  valuesToForm,
  roles,
  servicePlans,
  onSubmit,
  buttonLabel,
}) => {
  const [sending, setSending] = useState(false);
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    setSending(true);
    const response = await onSubmit(values);
    if (!response) {
      setSending(false);
    }
  };
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  return (
    <Form
      name="NavBarForm"
      form={form}
      onFinish={onFinish}
      style={{ width: "100%" }}
      initialValues={valuesToForm}
    >
      <Form.Item
        name="name"
        label="Nombre"
        rules={[
          {
            type: "string",
            min: 1,
            max: 64,
            message: "El nombre debe tener entre 1 y 64 caracteres",
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
        name="roles"
        label="Roles"
        rules={[
          {
            required: true,
            message: "Debes elegir un rol",
          },
        ]}
      >
        <Select
          mode="multiple"
          placeholder="Seleccione los roles"
          options={roles.map((role) => ({
            value: role.id_roles,
            label: role.name,
          }))}
          showSearch
          filterOption={filterOption}
          optionFilterProp="children"
        />
      </Form.Item>
      <Form.Item
        name="service_plans"
        label="Planes y servicios"
        rules={[
          {
            required: true,
            message: "Debes elegir un plan y servicio",
          },
        ]}
      >
        <Select
          mode="multiple"
          placeholder="Seleccione los servicios y planes"
          options={servicePlans.map((service_plan) => ({
            value: service_plan.id_plan_and_service,
            label: service_plan.name,
          }))}
          showSearch
          filterOption={filterOption}
          optionFilterProp="children"
        />
      </Form.Item>
      <Form.List name="mainItems">
        {(fields, { add: addMain, remove: removeMain }) => (
          <div key={"asdas"}>
            {fields.map(
              ({
                key: mainKey,
                name: mainName,
                fieldKey: mainFieldKey,
                ...mainRestField
              }) => (
                <div className="p-3 border rounded-lg my-3" key={mainKey}>
                  {/* Botón para eliminar el elemento principal */}
                  <Button
                    color="danger"
                    variant="ghost"
                    startContent={<MinusCircleOutlined />}
                    onPress={() => removeMain(mainName)}
                    size="md"
                    className="w-full mb-3"
                  >
                    Eliminar elemento principal
                  </Button>
                  {/* Campo de elemento principal */}
                  <Form.Item
                    {...mainRestField}
                    name={[mainName, "mainLabel"]}
                    fieldKey={[mainFieldKey, "mainLabel"]}
                    label="Nombre del elemento principal"
                    rules={[{ required: true, message: "Campo requerido" }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    {...mainRestField}
                    name={[mainName, "mainCaption"]}
                    fieldKey={[mainFieldKey, "caption"]}
                    label="Descripción"
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    {...mainRestField}
                    name={[mainName, "mainLink"]}
                    fieldKey={[mainFieldKey, "link"]}
                    label="Link"
                  >
                    <Input />
                  </Form.Item>

                  {/* Campos dinámicos de elementos secundarios */}
                  <Form.List name={[mainName, "subItems"]}>
                    {(subFields, { add: addSub, remove: removeSub }) => (
                      <div className="flex flex-col gap-4 border rounded-lg p-3 bg-slate-50" key="key">
                        {subFields.map(
                          ({
                            key: subKey,
                            name: subName,
                            fieldKey: subFieldKey,
                            ...subRestField
                          }) => (
                            <div className="border p-3 rounded-lg bg-gray-200" key={subKey}>
                              {/* Botón para eliminar el elemento secundario */}
                              <Button
                                color="danger"
                                variant="ghost"
                                startContent={<MinusCircleOutlined />}
                                onPress={() => removeSub(subName)}
                                size="md"
                                className="w-full mb-3"
                              >
                                Eliminar elemento secundario
                              </Button>
                              {/* Campo de elemento secundario */}
                              <Form.Item
                                {...subRestField}
                                name={[subName, "subLabel"]}
                                fieldKey={[subFieldKey, "subLabel"]}
                                label="Nombre del elemento secundario"
                                rules={[
                                  {
                                    required: true,
                                    message: "Campo requerido",
                                  },
                                ]}
                              >
                                <Input />
                              </Form.Item>
                              <Form.Item
                                {...subRestField}
                                name={[subName, "subCaption"]}
                                fieldKey={[subFieldKey, "subCaption"]}
                                label="Descripción del elemento secundario"
                                rules={[
                                  {
                                    required: true,
                                    message: "Campo requerido",
                                  },
                                ]}
                              >
                                <Input />
                              </Form.Item>
                              <Form.Item
                                {...subRestField}
                                name={[subName, "subLink"]}
                                fieldKey={[subFieldKey, "subLink"]}
                                label="Link del elemento secundario"
                                rules={[
                                  {
                                    required: true,
                                    message: "Campo requerido",
                                  },
                                ]}
                              >
                                <Input />
                              </Form.Item>
                              <Form.Item
                                {...subRestField}
                                name={[subName, "subIcon"]}
                                fieldKey={[subFieldKey, "subIcon"]}
                                label="Icono del elemento secundario"
                                rules={[
                                  {
                                    required: true,
                                    message: "Campo requerido",
                                  },
                                ]}
                              >
                                <Select
                                  placeholder="Seleccione un icono"
                                  options={CONST_NAVBAR_LIST_ICONS.map(
                                    (icon) => ({
                                      value: icon.name,
                                      label: (
                                        <h1 className="text-xl">
                                          {icon.icon} {icon.name}
                                        </h1>
                                      ),
                                    })
                                  )}
                                />
                              </Form.Item>
                            </div>
                          )
                        )}
                        {/* Botón para agregar un elemento secundario */}
                        <Form.Item>
                          <Button
                            variant="bordered"
                            color="primary"
                            onPress={() => addSub()}
                            startContent={<PlusOutlined />}
                            className="w-full"
                          >
                            Agregar Elemento Secundario
                          </Button>
                        </Form.Item>
                      </div>
                    )}
                  </Form.List>
                </div>
              )
            )}
            {/* Botón para agregar un elemento principal */}
            <Form.Item className="w-full">
              <Button
                variant="bordered"
                color="primary"
                onPress={() => addMain()}
                startContent={<PlusOutlined />}
                className="w-full"
              >
                Agregar Elemento Principal
              </Button>
            </Form.Item>
          </div>
        )}
      </Form.List>
      <Form.Item>
        <ButtonFormSubmit value={buttonLabel} isLoading={sending} />
      </Form.Item>
    </Form>
  );
};

export default NavBarFormComponent;
