import TitlePage from "@/components/data/title";
import ButtonCreateNew from "@/components/views/partials/ButtonCreateNew";
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
import { EditDocumentBulkIcon } from "@nextui-org/shared-icons";
import { EditIcon } from "@/components/Icons/EditIcon";
import Link from "next/link";

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
  {
    name: "Opciones",
    uid: "options",
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
      options: (
        <div className="relative flex items-center gap-2">
          <Link
            className="text-lg text-primary-400 cursor-pointer active:opacity-50"
            href={"/admin/service_plans/" + item.id_plan_and_service + "/edit"}
          >
            <EditIcon />
          </Link>
        </div>
      ),
    }));
  }, []);

  return (
    <>
      <HeaderPage title={"Planes y servicios"} />
      <TitlePage>Planes y servicios</TitlePage>
      <ButtonCreateNew
        value="Nuevo plan y servicio"
        href="/admin/service_plans/create"
      />
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
