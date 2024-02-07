import React, { useEffect, useState } from "react";
import TitlePage from "@/components/data/title";
import HeaderPage from "@/components/views/partials/HeaderPage";
import { MovingController } from "@/controller/moving.controller";
import { DateUtils } from "@/utils/date.utils";
import { MovingUtils } from "@/utils/moving.utils";
import { TokenUtils } from "@/utils/token.utils";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { Badge, Select, Table, Tooltip } from "antd";
import Link from "next/link";
import { ComplexController } from "@/controller/complex.controller";
import { StatusController } from "@/controller/status.controller";

const columns = [
  {
    dataIndex: "moving_date",
    title: "Fecha de mudanza",
  },
  {
    dataIndex: "author",
    title: "Autor",
  },
  {
    dataIndex: "status",
    title: "Estado",
    responsive: ["md"],
  },
];

const ViewListMovingAdmin = ({
  movings: _movings,
  towersAndApartments,
  status,
}) => {
  const [idTower, setIdTower] = useState(null);
  const [idApartment, setIdApartment] = useState(null);
  const [apartments, setApartments] = useState([]);
  const [movings, setMovings] = useState(_movings);
  const [idStatus, setIdStatus] = useState();

  const getDataTable = () => {
    const dataTable = movings.map((moving) => {
      return {
        key: moving.id_moving,
        moving_date: (
          <Tooltip
            title={`${moving.moving_status.name}, ${moving.moving_status.description}`}
          >
            <Badge
              color={MovingUtils.getColorBadgeStatus(
                moving.moving_status.id_status
              )}
              text={
                <Link href={`/moving/thread/${moving.id_moving}/reply`}>
                  {DateUtils.getDateInLettersSpanish(moving.moving_date)}
                </Link>
              }
            />
          </Tooltip>
        ),
        author: `${moving.users_roles?.users.name} ${moving.users_roles?.users.last_name}
                (${moving.users_roles.apartment_complex.tower_complex.tower_name} - ${moving.users_roles.apartment_complex.apartment_identifier_tower})`,
        status: (
          <Badge
            color={MovingUtils.getColorBadgeStatus(
              moving.moving_status.id_status
            )}
            text={
              <Link href={`/moving/thread/${moving.id_moving}/reply`}>
                {moving.moving_status.name}
              </Link>
            }
          />
        ),
      };
    });
    return dataTable;
  };

  const DataTable = () => {
    return (
      <Table
        columns={columns}
        dataSource={getDataTable()}
        bordered
        size="large"
      />
    );
  };

  const onChangeTower = (_idTower) => {
    setIdTower(_idTower);
    if (!_idTower || _idTower == undefined) {
      cleanTowers();
      return;
    }
    cleanApartments();
    const tower = towersAndApartments.find(
      (tower) => tower.id_tower == _idTower
    );
    const _apartments = tower.apartment_complex;
    setApartments(_apartments);
  };

  useEffect(() => {
    filterAll({
      _idTower: idTower,
      _idApartment: idApartment,
      _idStatus: idStatus,
    })
  }, [idTower, idApartment, idStatus])

  const filterAll = ({
    _idTower = idTower,
    _idApartment = idApartment,
    _idStatus = idStatus,
  }) => {
    let _movingsFilter = _movings;
    if (_idTower) {
      _movingsFilter = _movingsFilter.filter(
        (moving) =>
          moving.users_roles.apartment_complex.tower_complex.id_tower ==
          _idTower
      );
    }
    if (_idApartment) {
      _movingsFilter = _movingsFilter.filter(
        (moving) =>
          moving.users_roles.apartment_complex.id_apartment == _idApartment
      );
    }
    if (_idStatus) {
      _movingsFilter = _movingsFilter.filter(
        (moving) => moving.moving_status.id_status == _idStatus
      );
    }
    setMovings(_movingsFilter);
  };

  const cleanTowers = () => {
    setIdTower(null);
    cleanApartments();
  };

  const cleanApartments = () => {
    setIdApartment(null);
    setApartments([]);
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <>
      <HeaderPage title="Mudanzas" />
      <TitlePage level={1}>Mudanzas</TitlePage>
      <Card className="mb-3">
        <CardHeader>
          <h4 className="font-bold text-large">Filtrar mudanzas</h4>
        </CardHeader>
        <CardBody className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
          <Select
            value={idTower}
            onChange={onChangeTower}
            options={towersAndApartments.map((tower) => ({
              value: tower.id_tower,
              label: tower.tower_name,
            }))}
            size="large"
            placeholder="Torre"
            style={{ width: "100%" }}
            showSearch
            allowClear
            filterOption={filterOption}
            optionFilterProp="children"
          />
          <Select
            value={idApartment}
            onChange={setIdApartment}
            options={apartments.map((apartment) => ({
              value: apartment.id_apartment,
              label: apartment.apartment_identifier_tower,
            }))}
            size="large"
            placeholder="Apartamentos"
            style={{ width: "100%" }}
            showSearch
            allowClear
            filterOption={filterOption}
            optionFilterProp="children"
          />
          <Select
            value={idStatus}
            onChange={setIdStatus}
            options={status.map((status) => ({
              value: status.id_status,
              label: status.name,
            }))}
            size="large"
            placeholder="Estado"
            style={{ width: "100%" }}
            showSearch
            allowClear
            filterOption={filterOption}
            optionFilterProp="children"
          />
        </CardBody>
      </Card>
      <DataTable />
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    // Obtenemos todas las cookies para hacer peticiones al backend
    const getCookies = TokenUtils.destructureAllCookiesClient(context);
    const [getData, getTowersAndApartments, getStatusMoving] =
      await Promise.all([
        MovingController.apiSSRListMovingByAdminComplex(getCookies),
        ComplexController.apiSSRGetListTowerAndApartments(getCookies),
        StatusController.apiSSRGetStatusSpecific(
          StatusController.apiGetStatusMoving(),
          getCookies
        ),
      ]);
    return {
      props: {
        movings: getData.payload || [],
        towersAndApartments:
          getTowersAndApartments.payload?.tower_complex || [],
        status: getStatusMoving.payload || [],
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
}

export default ViewListMovingAdmin;
