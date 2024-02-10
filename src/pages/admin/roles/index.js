import { RolesController } from "@/controller/roles.controller";
import { Typography, message } from "antd";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Chip,
  Tooltip,
} from "@nextui-org/react";
import { EditDocumentBulkIcon } from "@nextui-org/shared-icons";
import { SettingOutlined } from "@ant-design/icons";
import Router from "next/router";
import HeaderPage from "@/components/views/partials/HeaderPage";
import { TokenUtils } from "@/utils/token.utils";

const columnsTable = [
  {
    key: "name",
    label: "Nombre",
  },
  {
    key: "status",
    label: "Estado",
  },
  {
    key: "options",
    label: "Opciones",
  },
];

const statusColorMap = {
  Activo: "success",
  Inactivo: "danger",
};

const AdminRolesList = ({ roles }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const getDataTable = () => {
    return roles.map((rol, id) => ({
      key: id + 1,
      name: rol.name,
      status: (
        <Chip
          className="capitalize"
          color={statusColorMap[rol.status_roles_statusTostatus.name]}
          size="sm"
          variant="flat"
        >
          {rol.status_roles_statusTostatus.name}
        </Chip>
      ),
      options: (
        <div className="relative flex items-center gap-2">
          <Tooltip color="foreground" content="Rutas de acceso">
            <span
              className="text-lg text-primary-400 cursor-pointer active:opacity-50"
              onClick={() => Router.push("/admin/access_page/" + rol.id_roles)}
            >
              <EditDocumentBulkIcon />
            </span>
          </Tooltip>
          <Tooltip color="foreground" content="Configurar">
            <span
              className="text-lg text-primary-400 cursor-pointer active:opacity-50"
              onClick={() => messageApi.info("Esta en proceso")}
            >
              <SettingOutlined />
            </span>
          </Tooltip>
        </div>
      ),
    }));
  };

  const Rendered = () => {
    return (
      <>
        <Table
          color="primary"
          selectionMode="single"
          defaultSelectedKeys={["1"]}
          aria-label="Example static collection table"
        >
          <TableHeader columns={columnsTable}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody
            items={getDataTable()}
            emptyContent={"Actualmente no hay ningún rol"}
          >
            {(item) => (
              <TableRow key={item.key}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </>
    );
  };

  return (
    <>
      {contextHolder}
      <HeaderPage title={"Listado de Roles"} />
      <Typography.Title level={1} style={{ textAlign: "center" }}>
        Administración de Roles
      </Typography.Title>
      <Rendered />
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    // Obtenemos todas las cookies para hacer peticiones al backend
    const getCookies = TokenUtils.destructureAllCookiesClient(context);
    // Obtenemos los datos
    const getRoles = await RolesController.apiSSRGetListAll(
      getCookies
    );
    return {
      props: {
        roles: getRoles.payload || [],
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

export default AdminRolesList;
