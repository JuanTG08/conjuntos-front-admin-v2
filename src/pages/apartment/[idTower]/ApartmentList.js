import ApartmentLegendComponent from "@/components/views/apartment/ApartmentLegendComponent";
import { ApartmentComplexController } from "@/controller/apartment.controller";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Dropdown, Popconfirm, Table, Typography, message } from "antd";
import {
  DownOutlined,
  EditOutlined,
  UsergroupAddOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import ButtonCreateNew from "@/components/views/partials/ButtonCreateNew";
import HeaderPage from "@/components/views/partials/HeaderPage";
import { useRouter } from "next/router";

const columns = [
  {
    title: "#",
    dataIndex: "key",
    rowScope: "row",
    responsive: ["md"],
  },
  {
    title: "Piso",
    dataIndex: "floor",
    onCell: 0,
  },
  {
    title: "Nombre",
    dataIndex: "nameApartment",
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

const ApartmentList = ({ idTower }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [apartments, setApartments] = useState([]);
  const [tower, setTower] = useState(false);
  const [complex, setComplex] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    fetchListAllApartment();
  }, []);

  const fetchListAllApartment = async () => {
    try {
      const listApartment = await ApartmentComplexController.viewGetListAll(
        idTower
      );
      if (
        listApartment.error ||
        !listApartment.payload ||
        listApartment.statusCode != 200
      )
        return router.push("/dashboard");
      setApartments(listApartment.payload.apartments);
      setTower(listApartment.payload.tower);
      setComplex(listApartment.payload.complex);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteApartment = async (apartment) => {
    try {
      const { id_apartment } = apartment;
      const resp = await ApartmentComplexController.viewSubmitDelete(
        id_apartment
      );
      if (!resp.error && resp.statusCode == 200) {
        setApartments((lastApart) =>
          lastApart.filter((apart) => !(apart.id_apartment == id_apartment))
        );
        return messageApi.success(resp.message);
      }
      messageApi.warning(resp.message);
    } catch (error) {
      console.log(error);
    }
  };

  const getDataTable = () => {
    const dataTable = apartments.map((apartment, index) => {
      return {
        key: index + 1,
        floor: apartment.level_floor,
        nameApartment: apartment.apartment_identifier_tower,
        status: apartment.status_apartment_complex.status_name,
        options: (
          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  label: (
                    <Link
                      href={
                        "/apartment" +
                        "/ApartmentComplexEdit/" +
                        apartment.id_apartment
                      }
                      className="btn btn-info"
                    >
                      Editar
                    </Link>
                  ),
                  icon: <EditOutlined />,
                },
                {
                  key: "2",
                  label: (
                    <Link
                      href={
                        "/apartment" +
                        "/UsersViewPanel/" +
                        apartment.id_apartment
                      }
                      className="btn btn-success"
                    >
                      Usuarios
                    </Link>
                  ),
                  icon: <UsergroupAddOutlined />,
                },
                {
                  key: "3",
                  label: (
                    <Popconfirm
                      title="Eliminar"
                      description={`¿Deseas eliminar esta torre "${apartment.apartment_identifier_tower}"?`}
                      onConfirm={() =>
                        deleteApartment(apartment)
                      }
                      okButtonProps={{
                        className: "bg-danger",
                      }}
                    >
                      Eliminar
                    </Popconfirm>
                  ),
                  danger: true,
                  icon: <DeleteOutlined />,
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
    return dataTable;
  };
  const DataTable = () => {
    return (
      <Table
        loading={loading}
        columns={columns}
        dataSource={getDataTable()}
        bordered
        size="middle"
      />
    );
  };

  return (
    <>
      {contextHolder}
      <HeaderPage title={"Listado de unidades"} />
      <div>
        <Typography.Title level={1} style={{ textAlign: "center" }}>
          Administración de unidades
        </Typography.Title>
        <ApartmentLegendComponent complex={complex} tower={tower} />
      </div>
      <ButtonCreateNew
        href={`/apartment/${idTower}/ApartmentCreate`}
        value="Crear unidad"
      />
      <DataTable />
    </>
  );
};

export async function getServerSideProps(context) {
  const { idTower } = context.query;
  return {
    props: {
      idTower,
    },
  };
}
export default ApartmentList;
