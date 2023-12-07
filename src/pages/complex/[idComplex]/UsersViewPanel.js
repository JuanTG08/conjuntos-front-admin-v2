import { useState } from "react";
import ComplexViewPanelCaptionComponent from "@/components/views/complex/ComplexViewPanelCaptionComponent";
import { CONST_USER_VIEW_PANEL } from "@/constants/user.constant";
import { ComplexController } from "@/controller/complex.controller";
import {
  Dropdown,
  Popconfirm,
  Table,
  Tooltip,
  Typography,
  message,
} from "antd";
import { DownOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  Modal,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import HeaderPage from "@/components/views/partials/HeaderPage";
import { TokenUtils } from "@/utils/token.utils";
import { RolesController } from "@/controller/roles.controller";
import UserViewPanelFormComponent from "@/components/views/partials/modals/UserViewPanelFormComponent";
import ButtonCreateNew from "@/components/views/partials/ButtonCreateNew";

const columns = [
  {
    title: "#",
    dataIndex: "key",
    rowScope: "row",
    responsive: ["md"],
    width: 30,
  },
  {
    title: "Email",
    dataIndex: "email",
    onCell: 0,
    ellipsis: true,
    render: (email) => (
      <Tooltip placement="topLeft" title={email}>
        {email}
      </Tooltip>
    ),
  },
  {
    title: "Nombre del usuario",
    dataIndex: "nameUser",
    onCell: 0,
    responsive: ["md"],
  },
  {
    title: "Rol del usuario",
    dataIndex: "rolUser",
    onCell: 0,
  },
  {
    title: "Estado",
    dataIndex: "status",
    onCell: 0,
    responsive: ["md"],
  },
  {
    title: "Opciones",
    dataIndex: "options",
    onCell: 0,
  },
];
const UsersViewPanel = ({
  idComplex,
  roles,
  listUserRoles,
  listUserToRegister,
  complex,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onOpenChange: onOpenChangeModal,
  } = useDisclosure();
  const [userToRegister, setUserToRegister] = useState(listUserToRegister);
  const [userRoles, setUserRoles] = useState(listUserRoles);

  const fetchListUsersComplex = async () => {
    try {
      const listUsers = await ComplexController.viewListUserAdmin(idComplex);
      if (listUsers.error || listUsers.statusCode != 200) {
        setUserRoles([]);
        setUserToRegister([]);
        return messageApi.error(listUsers.message);
      }
      setUserRoles(listUsers.payload.userRoles);
      setUserToRegister(listUsers.payload.userToRegister);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (values) => {
    try {
      const send = await ComplexController.viewSetUserAdmin(values, idComplex);
      if (send.error || send.statusCode != 200)
        return messageApi.error(send.message);
      await fetchListUsersComplex();
      messageApi.success(
        `Se estableció correctamente el usuario: ${values.email}`,
        3
      );
      return true;
    } catch (error) {
      console.log(error);
      return true;
    }
  };

  const deleteUserComplex = async (idUser, to, email) => {
    try {
      const send = await ComplexController.viewSubmitDeleteUserSet(idUser, to);
      if (send.error || send.statusCode != 200)
        return messageApi.error(send.message);
      fetchListUsersComplex();
      messageApi.success(
        `Se elimino correctamente el usuario con correo electrónico: ${email}`,
        3
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getDataTable = () => {
    let _index = 1;
    const dataTableUserRoles = userRoles?.map((user) => {
      return {
        key: _index++,
        email: user.users.email,
        nameUser: `${user.users.name} ${user.users.last_name}`,
        rolUser: user.roles.name,
        status: user.status_user_roles.status_name,
        options: (
          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  label: "Eliminar",
                  danger: true,
                  icon: <DeleteOutlined />,
                  onClick: () =>
                    deleteUserComplex(
                      user.id_users_roles,
                      CONST_USER_VIEW_PANEL.userRoles,
                      user.users.email
                    ),
                },
              ],
            }}
          >
            <a>
              Opciones <DownOutlined />
            </a>
          </Dropdown>
        ),
      };
    });
    const dataTableUserToRegister = userToRegister.map((user, index) => {
      return {
        key: _index++,
        email: user.email,
        nameUser: "Usuario no registrado",
        rolUser: user.roles.name,
        status: user.status,
        options: (
          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  label: "Eliminar",
                  danger: true,
                  icon: <DeleteOutlined />,
                  onClick: () =>
                    deleteUserComplex(
                      user.id_to_register,
                      CONST_USER_VIEW_PANEL.userToRegister,
                      user.email
                    ),
                },
              ],
            }}
          >
            <a>
              Opciones <DownOutlined />
            </a>
          </Dropdown>
        ),
      };
    });
    return [...dataTableUserRoles, ...dataTableUserToRegister];
  };
  const DataTable = () => {
    return (
      <Table
        columns={columns}
        dataSource={getDataTable()}
        bordered
        scroll="scroll"
        size="middle"
      />
    );
  };

  const Rendered = () => {
    return (
      <>
        <ComplexViewPanelCaptionComponent complex={complex} />

        <ButtonCreateNew
          href={"#"}
          value="Habilitar usuarios"
          onClick={onOpenModal}
        />
        <DataTable />
      </>
    );
  };

  return (
    <>
      {contextHolder}
      <HeaderPage title={"Administración de usuarios administradores"} />
      <div style={{ textAlign: "center" }}>
        <Typography.Title level={1} style={{ textAlign: "center" }}>
          Usuarios administradores de conjuntos residenciales
        </Typography.Title>
      </div>
      <Modal
        isOpen={isOpenModal}
        onOpenChange={onOpenChangeModal}
        placement="center"
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Crear Usuarios
              </ModalHeader>

              <UserViewPanelFormComponent
                onSubmit={onSubmit}
                roles={roles}
                onClose={onClose}
              />
            </>
          )}
        </ModalContent>
      </Modal>
      <Rendered />
    </>
  );
};

export async function getServerSideProps(context) {
  const { idComplex } = context.query;
  let listUserRoles = [];
  let listUserToRegister = [];
  const getCookies = TokenUtils.destructureAllCookiesClient(context);
  const listUsers = await ComplexController.apiSSRListUserAdmin(
    getCookies,
    idComplex
  );
  const complex = await ComplexController.apiSSRGetOne(getCookies, idComplex);
  if (!listUsers.error && listUsers.statusCode == 200) {
    listUserRoles = listUsers.payload.userRoles || [];
    listUserToRegister = listUsers.payload.userToRegister || [];
  }
  const listRoles = await RolesController.apiGetListToAdminUserComplex(
    getCookies
  );
  return {
    props: {
      idComplex,
      roles: listRoles.payload || [],
      listUserRoles,
      listUserToRegister,
      complex: complex.payload,
    },
  };
}

export default UsersViewPanel;
