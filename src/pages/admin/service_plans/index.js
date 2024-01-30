import TitlePage from "@/components/data/title";
import HeaderPage from "@/components/views/partials/HeaderPage";
import { ServicePlansController } from "@/controller/service_plans.controller";
import { TokenUtils } from "@/utils/token.utils";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { useCallback, useMemo } from "react";

const columns = [
  {
    name: "Nombre",
    uid: "name",
  },
  {
    name: "Descripción",
    uid: "description",
  },
  {
    name: "Estado",
    uid: "status",
  },
];

const ViewAdminServicePlans = ({ service_plans }) => {
  const renderCell = useCallback((item, columnKey) => {});

  const renderData = useMemo(() => {
    return service_plans.map((item) => ({
      id: item.id_plan_and_service,
      name: item.name,
      description: item.description,
      status: item.plans_and_services_status.name,
    }));;
  }, []);

  return (
    <>
      <HeaderPage title={"Vista de Servicios y Planes"} />
      <TitlePage>Ola</TitlePage>

      <Table aria-label="Tabla del listado de servicios y precios">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={renderData}>
          {(item) => (
            <TableRow key={item.id_plan_and_service}>
              {(columnKey) => <TableCell>{item[columnKey]}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    // Obtenemos todas las cookies para hacer peticiones al backend
    const getCookies = TokenUtils.destructureAllCookiesClient(context);
    // Obtenemos los datos necesarios para el formulario
    const getData = await ServicePlansController.apiSSRGetListAll(getCookies);
    return {
      props: {
        service_plans: getData.payload || [],
      },
    };
  } catch (error) {
    console.log(error);
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
}

export default ViewAdminServicePlans;
