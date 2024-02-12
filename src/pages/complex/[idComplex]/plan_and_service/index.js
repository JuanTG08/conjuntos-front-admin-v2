import TitlePage from "@/components/data/title";
import HeaderPage from "@/components/views/partials/HeaderPage";
import { PlanAndServiceServerSideProps } from "@/server-side-props/plan_and_service.serverSideProps";
import { DateUtils } from "@/utils/date.utils";
import { Table, message } from "antd";
import React, { useState } from "react";
import { EditIcon } from "@/components/Icons/EditIcon";
import CancelIcon from "@/components/Icons/CancelIcon";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import PlanAndServiceSetComplexFormComponent from "@/components/views/plan-and-service/PlanAndServiceSetComplexFormComponent";
import { ServicePlansController } from "@/controller/service_plans.controller";

const columns = [
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Precio",
    dataIndex: "pricing",
    key: "pricing",
  },
  {
    title: "Estado",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Opciones",
    dataIndex: "options",
    key: "options",
    width: "10%",
  },
];

const ViewPlanAndServiceToComplex = ({
  idComplex,
  complex,
  plansAndServices,
  plansAndServicesStatus,
  facturationPeriod,
  currencies,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [complexPlansAndServices, setComplexPlansAndServices] = useState(
    complex?.residential_plan_services
  );
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const getTable = complexPlansAndServices.map((plan, index) => ({
    key: index,
    name: plan.plans_and_services.name,
    pricing: (
      <p>{`${plan.currencies.code} ${plan.billing_price} / ${plan.plan_service_facturation_services.name}`}</p>
    ),
    status: (
      <p>{`${
        plan.residential_plan_services_status.name
      } (${DateUtils.formatDateDMY(
        plan.start_date
      )} - ${DateUtils.formatDateDMY(plan.end_date)})`}</p>
    ),
    options: (
      <div className="flex flex-row text-3xl gap-3">
        <span className="text-primary-400 cursor-pointer active:opacity-50">
          <EditIcon />
        </span>
        <span className="text-danger cursor-pointer active:opacity-50">
          <CancelIcon />
        </span>
      </div>
    ),
  }));

  const onSubmit = async (values) => {
    try {
      values.id_residential_complex = idComplex;
      const send = await ServicePlansController.viewPostSetToComplex(values);
      if (send.error || send.statusCode != 200)
        throw new Error("No fue posible establecer el plan y servicio");
      setComplexPlansAndServices(send?.payload || []);
      return true;
    } catch (error) {
      messageApi.error("No fue posible establecer el plan y servicio");
      return false;
    }
  };

  return (
    <>
      {contextHolder}
      <HeaderPage title={"Listado de Conjuntos"} />
      <TitlePage>Plan y servicio de:</TitlePage>
      <p className="text-center">{complex.complex_name}</p>
      <Button
        onPress={onOpen}
        className="my-3 w-full"
        color="primary"
        size="lg"
      >
        Establecer plan y servicio
      </Button>
      <Table columns={columns} dataSource={getTable} />
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        isDismissable={false}
        scrollBehavior="inside"
      >
        <ModalHeader>Ola</ModalHeader>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Establecer plan y servicio
              </ModalHeader>
              <ModalBody>
                <PlanAndServiceSetComplexFormComponent
                  onSubmit={onSubmit}
                  buttonLabel="Guardar"
                  valuesToForm={{}}
                  plansAndServices={plansAndServices}
                  plansAndServicesStatus={plansAndServicesStatus}
                  facturationPeriod={facturationPeriod}
                  currencies={currencies}
                  onClose={onClose}
                />
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
export const getServerSideProps = async (context) => {
  const server = new PlanAndServiceServerSideProps(context);
  await server.ViewPlanAndServiceToComplex();
  return server.response;
};
export default ViewPlanAndServiceToComplex;
