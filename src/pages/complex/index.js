import { ComplexController } from "@/controller/complex.controller";
import { Dropdown, Popconfirm, Table, Typography, message } from "antd";
import {
  DownOutlined,
  EditOutlined,
  EyeOutlined,
  UsergroupAddOutlined,
  PaperClipOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ButtonCreateNew from "@/components/views/partials/ButtonCreateNew";
import HeaderPage from "@/components/views/partials/HeaderPage";

const columns = [
  {
    title: "#",
    dataIndex: "key",
    rowScope: "row",
    responsive: ["md"],
  },
  {
    title: "Nombre del Conjunto",
    dataIndex: "nameComplex",
    onCell: 0,
  },
  {
    title: "NIT",
    dataIndex: "nit",
    onCell: 0,
    responsive: ["lg"],
  },
  {
    title: "Departamento/Ciudad",
    dataIndex: "department",
    onCell: 0,
    responsive: ["lg"],
  },
  {
    title: "Dirección",
    dataIndex: "address",
    onCell: 0,
    responsive: ["lg"],
  },
  {
    title: "Estado",
    dataIndex: "status",
    onCell: 0,
  },
  {
    title: "Opciones",
    dataIndex: "options",
    onCell: 0,
  },
];

const ComplexIndex = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [resComplexs, setResComplexs] = useState([]);

  useEffect(() => {
    const fetchListAllComplex = async () => {
      const listComplex = await ComplexController.viewListAll();
      if (!listComplex.error && listComplex.statusCode == 200)
        setResComplexs(listComplex.payload);
    };
    fetchListAllComplex();
  }, []);

  const getDataTable = () => {
    const dataTable = resComplexs.map((complex, index) => {
      return {
        key: index + 1,
        nameComplex: complex.complex_name,
        nit: complex.complex_nit,
        department: `${complex?.municipality?.department_country?.name}/${complex?.municipality?.name}`,
        address: complex.complex_address,
        status: complex.status_residential_complex.status_name,
        options: (
          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  label: (
                    <Link
                      href={"/complex/" + complex.id_complex + "/ComplexEdit"}
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
                      href={"/tower/" + complex.id_complex + "/TowerList"}
                      className="btn btn-success"
                    >
                      Ver Torres
                    </Link>
                  ),
                  icon: <EyeOutlined />,
                },
                {
                  key: "3",
                  label: (
                    <Link
                      href={
                        "/complex/" + complex.id_complex + "/UsersViewPanel"
                      }
                      className="btn btn-warning"
                    >
                      Usuarios
                    </Link>
                  ),
                  icon: <UsergroupAddOutlined />,
                },
                {
                  key: "4",
                  label: (
                    <Link
                      href={"/complex/" + complex.id_complex + "/advertisement"}
                      className="btn btn-primary"
                    >
                      Anuncios
                    </Link>
                  ),
                  icon: <PaperClipOutlined />,
                },
                {
                  key: "5",
                  label: (
                    <Popconfirm
                      title="Eliminar"
                      description={`¿Deseas eliminar el conjunto residencial "${complex.complex_name}"?`}
                      onConfirm={() => deleteComplex(complex)}
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

  const deleteComplex = async (complex) => {
    try {
      const idComplex = complex.id_complex;
      const resp = await ComplexController.viewSubmitDelete(idComplex);
      if (!resp.error && resp.statusCode == 200) {
        setResComplexs(
          resComplexs.filter((complex) => !(complex.id_complex == idComplex))
        );
        return messageApi.success(resp.message);
      }
      messageApi.error(resp.message);
    } catch (error) {
      messageApi("Error en el servidor");
    }
  };

  const DataTable = () => {
    return (
      <Table
        size="small"
        columns={columns}
        dataSource={getDataTable()}
        bordered
      />
    );
  };

  return (
    <>
      {contextHolder}
      <HeaderPage title={"Listado de Conjuntos"} />
      <Typography.Title level={1} style={{ textAlign: "center" }}>
        Conjunto Residencial
      </Typography.Title>
      <ButtonCreateNew
        href={"/complex/ComplexCreate"}
        value="Añadir conjunto residencial"
      />
      <DataTable />
    </>
  );
};

export default ComplexIndex;
