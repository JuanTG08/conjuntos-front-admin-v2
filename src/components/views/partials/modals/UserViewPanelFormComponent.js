import React, { useState } from "react";
import { Form, Input, Select, Switch } from "antd";
import ButtonFormSubmit from "../../partials/ButtonFormSubmit";
import { ModalBody, ModalFooter } from "@nextui-org/react";
const { Option } = Select;

const UserViewPanelFormComponent = ({
  onSubmit,
  roles,
  onClose,
}) => {
  const [form] = Form.useForm();
  const [loadingSend, setLoading] = useState(false);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const submitData = async (values) => {
    try {
      setLoading(true);
      await onSubmit(values);
      setLoading(false);
      form.resetFields();
      onClose();
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Form
      name="userViewPanelModal"
      form={form}
      onFinish={submitData}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
    >
      <ModalBody>
        <Form.Item
          label="Correo electrónico"
          name="email"
          rules={[
            {
              pattern:
                /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
              required: true,
              message:
                "Por favor ingresar un correo electrónico valido valido.",
            },
          ]}
          style={{ padding: 0, margin: 0 }}
          tooltip="Ingresa el correo del usuario para notificaciones importantes. Se enviará un correo con un enlace de registro a esta dirección. Asegúrate de proporcionar un correo válido."
        >
          <Input autoFocus />
        </Form.Item>
        <Form.Item
          name="id_role"
          label="Rol"
          rules={[
            {
              required: true,
              message: "Se necesita especificar un rol para el usuario",
            },
          ]}
          style={{ padding: 0, margin: 0 }}
          tooltip="Elige el papel que desempeñará el usuario"
        >
          <Select placeholder="Elige un rol">
            {roles.map((role) => (
              <Option key={role.id_roles} value={role.id_roles}>
                {role.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </ModalBody>
      <ModalFooter>
        <Form.Item style={{ padding: 0, margin: 0 }}>
          <ButtonFormSubmit
            value="Cancelar"
            onPress={onClose}
            color="danger"
            spaceY={0}
          />
        </Form.Item>
        <Form.Item style={{ padding: 0, margin: 0 }}>
          <ButtonFormSubmit
            value="Añadir usuario"
            isLoading={loadingSend}
            spaceY={0}
          />
        </Form.Item>
      </ModalFooter>
    </Form>
  );
};

export default UserViewPanelFormComponent;
