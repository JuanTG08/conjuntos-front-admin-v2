import TitlePage from "@/components/data/title";
import HeaderPage from "@/components/views/partials/HeaderPage";
import { PlanAndServiceServerSideProps } from "@/server-side-props/plan_and_service.serverSideProps";
import { DateUtils } from "@/utils/date.utils";
import { Table } from "antd";
import React from "react";
import { EditDocumentBulkIcon } from "@nextui-org/shared-icons";
import { EditIcon } from "@/components/Icons/EditIcon";
import { DeleteIcon } from "@/components/Icons/DeleteIcon";
import CancelIcon from "@/components/Icons/CancelIcon";

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

const ViewPlanAndServiceToComplex = ({ complex }) => {
  const getTable = complex.residential_plan_services.map((plan, index) => ({
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
  return (
    <>
      <HeaderPage title={"Listado de Conjuntos"} />
      <TitlePage>Plan y servicio de:</TitlePage>
      <p className="text-center">{complex.complex_name}</p>
      <Table columns={columns} dataSource={getTable} />
    </>
  );
};
export const getServerSideProps = async (context) => {
  const server = new PlanAndServiceServerSideProps(context);
  await server.ViewPlanAndServiceToComplex();
  return server.response;
};
export default ViewPlanAndServiceToComplex;
