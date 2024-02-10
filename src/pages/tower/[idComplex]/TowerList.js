import TowerLeyendComponent from "@/components/views/tower/TowerLeyendComponent";
import { TowerController } from "@/controller/tower.controller";
import Link from "next/link";
import React, { useState } from "react";
import { Dropdown, Popconfirm, Table, Typography, message } from "antd";
import {
  DownOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import ButtonCreateNew from "@/components/views/partials/ButtonCreateNew";
import HeaderPage from "@/components/views/partials/HeaderPage";
import { TowerServerSideProps } from "@/server-side-props/tower.serverSideProps";

const columns = [
  {
    title: "#",
    dataIndex: "key",
    rowScope: "row",
    responsive: ["md"],
  },
  {
    title: "Nombre de la torre",
    dataIndex: "nameTower",
    onCell: 0,
  },
  {
    title: "Numero de pisos",
    dataIndex: "floor",
    onCell: 0,
    responsive: ["lg"],
  },
  {
    title: "Total de unidades",
    dataIndex: "totalApartment",
    onCell: 0,
    responsive: ["lg"],
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

const ViewTowerListToComplex = ({ idComplex, complex, _towers }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [towers, setTowers] = useState(_towers);

  const getDataTable = () => {
    const dataTable = towers.map((tower, index) => {
      return {
        key: index + 1,
        nameTower: tower.tower_name,
        floor: tower.number_floors,
        totalApartment: tower.number_apartments,
        dateConstruction: new Date(tower.construction_date)
          .toISOString()
          .slice(0, 10),
        status: tower.status_tower_complex.status_name,
        options: (
          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  label: (
                    <Link
                      href={"/tower/TowerComplexEdit/" + tower.id_tower}
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
                      href={"/apartment/" + tower.id_tower + "/ApartmentList"}
                      className="btn btn-success"
                    >
                      Unidades
                    </Link>
                  ),
                  icon: <EyeOutlined />,
                },
                {
                  key: "5",
                  label: (
                    <Popconfirm
                      title="Eliminar"
                      description={`¿Deseas eliminar esta torre "${tower.tower_name}"?`}
                      onConfirm={() => deleteTower(tower)}
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
        size="middle"
        columns={columns}
        dataSource={getDataTable()}
        bordered
      />
    );
  };

  const deleteTower = async (tower) => {
    try {
      const idTower = tower.id_tower;
      const resp = await TowerController.viewSubmitDelete(idTower);
      if (!resp.error && resp.statusCode == 200) {
        setTowers(towers.filter((tow) => !(tow.id_tower == idTower)));
        return messageApi.success("Se eliminó la torre");
      }
      messageApi.error(resp.message);
    } catch (error) {
      messageApi.error("Error");
    }
  };

  return (
    <>
      {contextHolder}
      <HeaderPage title={"Administración de Torres"} />
      <Typography.Title level={1} style={{ textAlign: "center" }}>
        Administración de torres
      </Typography.Title>
      <TowerLeyendComponent complex={complex} />
      <ButtonCreateNew
        href={`/tower/${idComplex}/TowerCreate`}
        value="Añadir torre"
      />
      <DataTable />
    </>
  );
};

export async function getServerSideProps(context) {
  const server = new TowerServerSideProps(context);
  await server.ViewTowerListToComplex();
  return server.response;
}

export default ViewTowerListToComplex;
