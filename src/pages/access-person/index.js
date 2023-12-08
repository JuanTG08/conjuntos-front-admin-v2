import {
  SearchOutlined,
  DownOutlined,
  EyeOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Dropdown, Input, Space, Table, message } from "antd";
import Highlighter from "react-highlight-words";
import { Button } from "@nextui-org/react";
import ButtonCreateNew from "@/components/views/partials/ButtonCreateNew";
import TitlePage from "@/components/data/title";
import { AccessPersonController } from "@/controller/access_person.controller";
import Link from "next/link";
import HeaderPage from "@/components/views/partials/HeaderPage";
import { DateUtils } from "@/utils/date.utils";

const AccessPersonListToUser = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [visitors, setVisitors] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  useEffect(() => {
    fetchListAccessPerson();
  }, []);

  const fetchListAccessPerson = async () => {
    try {
      const list =
        await AccessPersonController.viewGetAccessPersonToApartment();
      if (list.error || list.statusCode !== 200) return;
      setVisitors(list.payload);
    } catch (error) {
      console.log(error);
    }
  };

  const disableAccessPerson = async (idAccessPerson) => {
    try {
      const send = await AccessPersonController.viewDeleteAccessPerson(
        idAccessPerson
      );
      if (send.error || send.statusCode !== 200)
        return messageApi.error("No fue posible eliminar");
      messageApi.success(send.message);
      setVisitors((lastData) =>
        lastData.filter((item) => item.id_access_people !== idAccessPerson)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Buscar por ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            startContent={<SearchOutlined />}
            size="small"
            color="primary"
          >
            Buscar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = useMemo(
    () => [
      {
        title: "Nombre",
        dataIndex: "name_person",
        key: "name_person",
        width: "30%",
      },
      {
        title: "Registrado Por",
        dataIndex: "registeredBy",
        key: "registeredBy",
        width: "20%",
        responsive: ["md"],
      },
      {
        title: "Fechas",
        dataIndex: "dates",
        key: "dates",
        responsive: ["md"],
      },
      {
        title: "Opciones",
        dataIndex: "options",
        key: "options",
      },
    ],
    []
  );

  const getDataTable = () =>
    visitors.map((visitor, index) => ({
      key: index,
      name_person: (
        <Link href={`/access-person/${visitor?.id_access_people}`}>
          {visitor?.name_person} - {visitor?.dni_person}
        </Link>
      ),
      registeredBy: `${visitor?.users?.name} ${visitor?.users?.last_name}`,
      dates: `${DateUtils.getDateInLettersSpanish(
        DateUtils.getDateDependMyUTC(visitor?.start_day_allowed)
      )} - ${DateUtils.getDateInLettersSpanish(DateUtils.getDateDependMyUTC(visitor?.end_day_allowed))}`,
      options: (
        <Dropdown
          menu={{
            items: [
              {
                key: "1",
                label: (
                  <Link
                    href={`/access-person/${visitor?.id_access_people}`}
                    className="btn btn-info"
                  >
                    Ver más
                  </Link>
                ),
                icon: <EyeOutlined />,
              },
              {
                key: "2",
                label: "Cancelar",
                icon: <DeleteOutlined />,
                danger: true,
                onClick: () => disableAccessPerson(visitor?.id_access_people),
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

  const RenderedTable = () => {
    return (
      <Table
        columns={columns}
        dataSource={getDataTable()}
        pagination={{
          pageSize: 10,
        }}
      />
    );
  };

  return (
    <>
      {contextHolder}
      <HeaderPage title="Visitantes" />
      <TitlePage level={3}>Visitantes</TitlePage>
      <ButtonCreateNew value="Programar visita" href="/access-person/create" />
      <RenderedTable />
    </>
  );
};

export default AccessPersonListToUser;
