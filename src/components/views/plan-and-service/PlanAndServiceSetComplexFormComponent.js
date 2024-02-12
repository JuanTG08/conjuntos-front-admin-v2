import { DatePicker, Form, Input, InputNumber, Select } from "antd";
const { TextArea } = Input;
import React, { useState } from "react";
import ButtonFormSubmit from "../partials/ButtonFormSubmit";
import { ModalBody, ModalFooter } from "@nextui-org/react";
import dayjs from "dayjs";

const PlanAndServiceSetComplexFormComponent = ({
  onSubmit,
  buttonLabel,
  valuesToForm,
  plansAndServices,
  plansAndServicesStatus,
  facturationPeriod,
  currencies,
  onClose,
}) => {
  const [sending, setSending] = useState();
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    setSending(true);
    const res = await onSubmit(values);
    if (res) onClose();
    setSending(res);
  };

  // Función para manejar el cambio de fecha
  const onChangeDate = (date, input) => {
    // Si date es diferente de null, establecer la hora a las 00:00:00
    const fechaConMedianoche = date ? dayjs(date).startOf("day") : null;
    return form.setFieldsValue({ [input]: fechaConMedianoche });
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  return (
    <Form
      name="PlanAndServiceSetComplexForm"
      form={form}
      onFinish={onFinish}
      style={{ width: "100%" }}
      initialValues={valuesToForm}
      layout="vertical"
      autoComplete="off"
    >
      <Form.Item
        name="id_plan_and_service"
        label="Elige un plan y servicio"
        rules={[
          {
            required: true,
            message: "El plan y servicio es requerido",
          },
        ]}
      >
        <Select
          placeholder="Elige un plan y servicio"
          options={plansAndServices.map((_planAndService) => ({
            value: _planAndService.id_plan_and_service,
            label: _planAndService.name,
          }))}
          showSearch
          filterOption={filterOption}
          optionFilterProp="children"
        />
      </Form.Item>
      <Form.Item
        name="id_facturation_period"
        label="Periodo de facturación"
        rules={[
          {
            required: true,
            message: "El periodo de facturación es requerido",
          },
        ]}
      >
        <Select
          placeholder="Elige un periodo de facturación"
          options={facturationPeriod.map((_facturation) => ({
            value: _facturation.id_facturation_services,
            label: `${_facturation.name} (${_facturation.period_days} días)`,
          }))}
          showSearch
          filterOption={filterOption}
          optionFilterProp="children"
        />
      </Form.Item>
      <Form.Item
        name="billing_price"
        label="Cuanto debe pagar"
        rules={[
          {
            required: true,
            message: "El valor de cuanto debe pagar es requerido",
          },
        ]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        name="id_currency"
        label="Que moneda"
        rules={[
          {
            required: true,
            message: "Se necesita especificar que moneda",
          },
        ]}
      >
        <Select
          placeholder="Elige una moneda"
          options={currencies.map((currency) => ({
            value: currency.id_currency,
            label: `${currency.symbol} ${currency.name} (${currency.code})`,
          }))}
          showSearch
          filterOption={filterOption}
          optionFilterProp="children"
        />
      </Form.Item>
      <Form.Item
        name="start_date"
        label="Fecha de inicio del plan"
        rules={[
          {
            required: true,
            message: "La fecha de inicio del plan es requerido",
          },
        ]}
      >
        <DatePicker
          style={{ width: "100%" }}
          format="DD [de] MMMM [de] YYYY"
          onChange={(val) => onChangeDate(val, "start_date")}
        />
      </Form.Item>
      <Form.Item
        name="end_date"
        label="Fecha de fin del plan"
        rules={[
          {
            required: true,
            message: "La fecha de fin del plan es requerida",
          },
        ]}
      >
        <DatePicker
          style={{ width: "100%" }}
          format="DD [de] MMMM [de] YYYY"
          onChange={(val) => onChangeDate(val, "end_date")}
        />
      </Form.Item>
      <Form.Item
        name="id_status_residential_plan_and_service"
        label="Estado del plan"
        rules={[
          {
            required: true,
            message: "Se necesita especificar un estado del plan",
          },
        ]}
      >
        <Select
          placeholder="Elige un estado del plan"
          options={plansAndServicesStatus.map((_status) => ({
            value: _status.id_status_residential_plan_services_status,
            label: _status.name,
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

export default PlanAndServiceSetComplexFormComponent;
