import ApartmentUserViewPanelCaptionComponent from "@/components/views/apartment/apartment-user/ApartmentUserViewPanelCaptionComponent";
import { ApartmentComplexController } from "@/controller/apartment.controller";
import { ApartmentUserController } from "@/controller/apartment_user.controller";
import { useState } from "react";
import { Dropdown, Table, Tooltip, Typography, message } from "antd";
import { DownOutlined, DeleteOutlined } from "@ant-design/icons";
import { CONST_USER_VIEW_PANEL } from "@/constants/user.constant";
import {
  Modal,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import HeaderPage from "@/components/views/partials/HeaderPage";
import { TokenUtils } from "@/utils/token.utils";
import { RolesController } from "@/controller/roles.controller";
import ButtonCreateNew from "@/components/views/partials/ButtonCreateNew";
import UserViewPanelFormComponent from "@/components/views/partials/modals/UserViewPanelFormComponent";

const columns = [
  {
    title: "#",
    dataIndex: "key",
    rowScope: "row",
    responsive: ["md"],
    width: 30,
  },
  {
    title: "Residente",
    dataIndex: "resident",
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
    title: "Rol del usuario",
    dataIndex: "role",
    onCell: 0,
    ellipsis: false,
  },
  {
    title: "Info Usuarios",
    dataIndex: "infoUsers",
    responsive: ["md"],
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
  idApartment,
  complex,
  tower,
  apartment,
  listUserRoles,
  listUserToRegister,
  roles,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onOpenChange: onOpenChangeModal,
  } = useDisclosure();
  const [usersRoles, setUsersRoles] = useState(listUserRoles);
  const [usersToRegister, setUsersToRegister] = useState(listUserToRegister);

  const fetchUsersSetToApartment = async () => {
    try {
      const list = await ApartmentUserController.viewGetListAll(idApartment);
      if (list.error || list.statusCode != 200)
        return messageApi.error(list.message);
      setUsersRoles(list.payload.userRoles);
      setUsersToRegister(list.payload.userToRegister);
    } catch (error) {
      messageApi.error("Error de conexión");
    }
  };

  const onSubmit = async (data) => {
    try {
      if (!complex) return messageApi.info("Cargando información...");
      data.id_residential_complex = complex.id_complex;
      const send = await ApartmentUserController.viewSubmitNew(
        data,
        idApartment
      );
      if (send.error || send.statusCode != 200) messageApi.error(send.message);
      else
        messageApi.success(
          `Se estableció correctamente el usuario: ${data.email}`,
          3
        );
      await fetchUsersSetToApartment();
    } catch (error) {
      console.log("error");
    }
  };

  const deleteUserApartment = async (idUser, emailUser, typeUser) => {
    try {
      const send = await ApartmentUserController.viewSubmitDelete(
        idUser,
        typeUser
      );
      if (send.error || send.statusCode != 200)
        return messageApi.error(send.message);
      if (typeUser === CONST_USER_VIEW_PANEL.userRoles)
        setUsersRoles((prevData) =>
          prevData.filter(({ id_users_roles }) => !(id_users_roles === idUser))
        );
      else if (typeUser === CONST_USER_VIEW_PANEL.userToRegister)
        setUsersToRegister((prevData) =>
          prevData.filter(({ id_to_register }) => !(id_to_register === idUser))
        );
      messageApi.success(
        `Se elimino correctamente el usuario con correo electrónico: ${emailUser}`,
        3
      );
      fetchUsersSetToApartment();
    } catch (error) {
      console.log(error);
    }
  };

  const getDataTable = () => {
    const dataTableUserRoles = usersRoles.map((user, index) => ({
      key: index + 1,
      resident: user?.resident ? "Si" : "No",
      email: user.users.email,
      role: user.roles.name,
      infoUsers: `${user?.users?.name} ${user?.users?.last_name}`,
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
                  deleteUserApartment(
                    user.id_users_roles,
                    user.users.email,
                    CONST_USER_VIEW_PANEL.userRoles
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
    }));
    const dataTableUserToRegister = usersToRegister.map((user, index) => ({
      key: dataTableUserRoles.length + index + 1,
      resident: user?.resident ? "Si" : "No",
      email: user.email,
      role: user.roles.name,
      infoUsers: "Usuario no registrado",
      status:
        user
          .status_user_to_register_user_to_register_status_user_to_registerTostatus_user_to_register
          .status_name,
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
                  deleteUserApartment(
                    user.id_to_register,
                    user.email,
                    CONST_USER_VIEW_PANEL.userToRegister
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
    }));
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

  return (
    <>
      {contextHolder}
      <HeaderPage title={"Usuarios de la unidad"} />
      <Typography.Title level={1} style={{ textAlign: "center" }}>
        Usuarios de la unidad
      </Typography.Title>
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
                Habilitar usuarios
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

      <div style={{ width: "100%", overflowX: "auto" }}>
        <ApartmentUserViewPanelCaptionComponent
          apartment={apartment}
          tower={tower}
          complex={complex}
        />
        <ButtonCreateNew
          href={"#"}
          value="Habilitar usuarios"
          onClick={onOpenModal}
        />
        <DataTable />
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    const { idApartment } = context.query;
    // Obtenemos todas las cookies para hacer peticiones al backend
    const getCookies = TokenUtils.destructureAllCookiesClient(context);
    const listApartment = await ApartmentComplexController.apiSSRGetOne(
      getCookies,
      idApartment
    );
    if (listApartment.error || listApartment.statusCode != 200)
      throw new Error("No fue posible obtener la unidad");
    const complex = listApartment.payload?.complex;
    const tower = listApartment.payload?.tower;
    const apartment = listApartment.payload?.apartment;

    const listUsers = await ApartmentUserController.apiSSRGetListAll(
      getCookies,
      idApartment
    );
    if (listUsers.error || listUsers.statusCode != 200)
      throw new Error("No fue posible obtener el listado de usuarios");
    const listUserRoles = listUsers.payload?.userRoles || [];
    const listUserToRegister = listUsers.payload?.userToRegister || [];
    const listRolesUsers =
      await RolesController.apiSSRGetListToAdminUserApartment(getCookies);
    if (listRolesUsers.error || listRolesUsers.statusCode != 200)
      throw new Error("No fue posible obtener el listado de roles");
    const roles = listRolesUsers.payload || [];
    return {
      props: {
        idApartment,
        complex,
        tower,
        apartment,
        listUserRoles,
        listUserToRegister,
        roles,
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

export default UsersViewPanel;
