import { useEffect, useState } from "react";
import { AccessPageController } from "@/controller/access_page.controller";
import { Form, Input, Select, message } from "antd";
import ButtonFormSubmit from "../../partials/ButtonFormSubmit";
const { TextArea } = Input;
const { Option } = Select;

const AccessPageFormComponent = ({ onSubmit, valuesToForm }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [fromTo, setFromTo] = useState();
  const [method, setMethod] = useState();
  const [status, setStatus] = useState();

  useEffect(() => {
    fetchListMFS();
  }, []);

  const fetchListMFS = async () => {
    try {
      const listMFS = await AccessPageController.viewGetListMFS();
      if (listMFS.statusCode == 200 && !listMFS.error && listMFS.payload) {
        setFromTo(listMFS.payload?.fromTo);
        setMethod(listMFS.payload?.method);
        setStatus(listMFS.payload?.status);
        return;
      }
      messageApi.warning(listMFS.message);
    } catch (error) {
      messageApi.error("No tienes conexión");
    }
  };
  const Rendered = () => {
    if (!fromTo || !method || !status) return <>Cargando</>;
    return (
      <Form
        form={form}
        name="AccessPageForm"
        onFinish={onSubmit}
        style={{ width: "100%" }}
        initialValues={valuesToForm}
      >
        <Form.Item
          name="name"
          label="Nombre de la ruta"
          rules={[
            {
              type: "string",
              len: [4, 64],
              message: "El nombre debe tener entre 4 y 64 caracteres",
            },
            {
              required: true,
              message: "El nombre de la ruta es requerido",
            },
          ]}
        >
          <Input placeholder="Example" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Descripción de la ruta"
          rules={[
            {
              type: "string",
              len: [4, 250],
              message: "La descripción debe tener entre 4 y 250 caracteres",
            },
            {
              required: true,
              message: "La descripción es requerida",
            },
          ]}
        >
          <TextArea placeholder="Example" rows={4} />
        </Form.Item>
        <Form.Item
          name="path"
          label="Path"
          rules={[
            {
              type: "string",
              len: [1, 128],
              message: "El path debe tener entre 1 y 128 caracteres",
            },
            {
              required: true,
              message: "El path es requerido",
            },
          ]}
        >
          <Input placeholder="/example" />
        </Form.Item>
        <Form.Item
          name="method"
          label="Método"
          rules={[
            {
              required: true,
              message: "El método es requerido",
            },
          ]}
        >
          <Select placeholder="Elije un método" allowClear>
            {method.map((met) => (
              <Option key={met.id_path_method} value={met.id_path_method}>
                {met.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="fromTo"
          label="Hacia donde va dirigido"
          rules={[
            {
              required: true,
              message: "Hacia donde va dirigido es requerido",
            },
          ]}
        >
          <Select placeholder="Elije hacia donde va dirigido" allowClear>
            {fromTo.map((from) => (
              <Option key={from.id_from_to} value={from.id_from_to}>
                {from.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="status"
          label="Estado"
          rules={[
            {
              required: true,
              message: "El estado es requerido",
            },
          ]}
        >
          <Select placeholder="Elije un estado" allowClear>
            {status.map((stat) => (
              <Option key={stat.id_status} value={stat.id_status}>
                {stat.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <ButtonFormSubmit value="Guardar" />
        </Form.Item>
      </Form>
    );
  };
  return (
    <>
      {contextHolder}
      <Rendered />
    </>
  );
};

export default AccessPageFormComponent;
