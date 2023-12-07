import { Form, Select } from "antd";
const { Option } = Select;
import React from "react";
import ButtonFormSubmit from "../../partials/ButtonFormSubmit";

const ConfigurationRoleFormComponent = ({ roles, valuesToForm, onSubmit }) => {
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      name="changeRoleForm"
      onFinish={onSubmit}
      style={{ width: "100%" }}
      initialValues={valuesToForm}
    >
      <Form.Item
        name="role"
        label="Tus Roles"
        rules={[
          {
            required: true,
            message: "El estado del conjunto es requerido",
          },
        ]}
      >
        <Select
          placeholder="Elije un rol"
        >
          {roles.map((role) => (
            <Option value={role.id_roles} key={role.id_roles}>
              {role.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <ButtonFormSubmit value="Cambiar Rol" isDisabled={true} />
      </Form.Item>
    </Form>
  );
};

export default ConfigurationRoleFormComponent;
