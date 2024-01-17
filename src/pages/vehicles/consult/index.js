import TitlePage from "@/components/data/title";
import HeaderPage from "@/components/views/partials/HeaderPage";
import { VehiclesController } from "@/controller/vehicles.controller";
import { TokenUtils } from "@/utils/token.utils";
import { VehicleUtils } from "@/utils/vehicle.utils";
import { Card, Empty, Image, Input, Pagination, Select, Typography } from "antd";
import Link from "next/link";
import React, { useMemo, useState } from "react";

const ViewVehiclesConsult = ({ _vehicles, _tower: towers }) => {
  const [vehicles, setVehicles] = useState(_vehicles);
  // Información del filtro
  const [idTowerFiltered, setIdTowerFiltered] = useState(null);
  const [apartments, setApartments] = useState([]);
  const [idApartmentFiltered, setIdApartmentFiltered] = useState(null);
  const [idVehicleByPlateFiltered, setIdVehicleByPlateFiltered] =
    useState(null);

  // Información de la paginación
  // Configura el estado para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Define la cantidad de vehículos por página

  // Calcula el índice del primer y último elemento de la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentVehicles = useMemo(
    () => vehicles.slice(indexOfFirstItem, indexOfLastItem),
    [vehicles]
  );
  // Función para cambiar de página
  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const onChangeTower = (idTower) => {
    setIdVehicleByPlateFiltered(null);
    if (!idTower) {
      setVehicles(_vehicles);
      cleanSelectFilters();
      return;
    }
    setIdTowerFiltered(idTower);
    const tower = towers.find((tower) => tower.id_tower === idTower);
    if (!tower) return setIdTowerFiltered(null);
    setIdApartmentFiltered(null);
    setApartments(tower.apartment_complex);
    setVehicles(
      _vehicles.filter(
        (vehicle) =>
          vehicle.apartment_complex.tower_complex.id_tower === idTower
      )
    );
  };

  const onChangeApartment = (idApartment) => {
    setIdVehicleByPlateFiltered(null);
    if (!idApartment) {
      onChangeTower(idTowerFiltered);
      setIdApartmentFiltered(null);
      return;
    }
    const apartment = apartments.find(
      (apartment) => apartment.id_apartment === idApartment
    );
    if (!apartment) return setIdApartmentFiltered(null);
    setIdApartmentFiltered(idApartment);
    setVehicles(apartment.vehicles_owner);
  };

  const onChangePlateFilter = (idVehicle) => {
    cleanSelectFilters();
    if (!idVehicle) {
      setVehicles(_vehicles);
      setIdVehicleByPlateFiltered(null);
      return;
    }
    const vehicle = _vehicles.find(
      (vehicle) => vehicle.id_vehicle === idVehicle
    );
    if (!vehicle) return setVehicles(_vehicles);
    setVehicles([vehicle]);
    setIdVehicleByPlateFiltered(idVehicle);
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const filterOptionPlate = (input, option) =>
    (option?.label ?? "")
      .toLowerCase()
      .replace(/\s/g, "")
      .includes(input.toLowerCase().replace(/\s/g, ""));

  const cleanSelectFilters = () => {
    setIdTowerFiltered(null);
    setApartments([]);
    setIdApartmentFiltered(null);
  };

  const FilterVehicles = () => {
    return (
      <>
        <Select
          options={_vehicles.map((vehicle) => ({
            value: vehicle.id_vehicle,
            label: vehicle.plate,
          }))}
          placeholder="Filtrar por placa"
          allowClear
          size="large"
          showSearch
          filterOption={filterOptionPlate}
          optionFilterProp="children"
          onChange={onChangePlateFilter}
          value={idVehicleByPlateFiltered}
          style={{ width: "100%" }}
        />
        <div className="w-full my-3 grid grid-cols-1 md:grid-cols-2 gap-2">
          <Select
            placeholder="Filtrar por torre"
            value={idTowerFiltered}
            onChange={onChangeTower}
            options={towers.map((tower) => ({
              value: tower.id_tower,
              label: tower.tower_name,
            }))}
            allowClear
            size="large"
            showSearch
            filterOption={filterOption}
            optionFilterProp="children"
          />
          <Select
            placeholder="Filtrar por unidades"
            value={idApartmentFiltered}
            onChange={onChangeApartment}
            options={apartments?.map((apartment) => ({
              value: apartment.id_apartment,
              label: apartment.apartment_identifier_tower,
            }))}
            allowClear
            size="large"
            showSearch
            filterOption={filterOption}
            optionFilterProp="children"
          />
        </div>
      </>
    );
  };

  return (
    <>
      <HeaderPage title="Vehículos" />
      <TitlePage level={1}>Vehículos</TitlePage>
      <FilterVehicles />
      {vehicles?.length === 0 && (
        <Empty description="No hay vehículos registrados" />
      )}
      <div className="gap-2 grid grid-cols-1 sm:grid-cols-4">
        {currentVehicles?.map((vehicle, index) => (
          <Card
            key={index}
            title={vehicle.plate}
            cover={
              <Image
                alt={vehicle.name}
                src={VehicleUtils.defineUrlImageVehicle(
                  vehicle?.type_vehicle?.id_type_vehicle,
                  false
                )}
                className="w-full object-contain h-[200px]"
                width="100%"
                height="200"
                style={{ maxHeight: 200, height: 200 }}
              />
            }
          >
            <Typography.Title level={3}>
              {vehicle.type_vehicle.name}
            </Typography.Title>
            <Typography.Title level={5}>
              Placa: {vehicle.plate}
            </Typography.Title>
            <Typography.Text>
              {`${vehicle.apartment_complex.tower_complex.tower_name}, ${vehicle.apartment_complex.apartment_identifier_tower}`}
            </Typography.Text>
          </Card>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          total={vehicles.length}
          pageSize={itemsPerPage}
          onChange={onPageChange}
        />
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    // Obtenemos todas las cookies para hacer peticiones al backend
    const getCookies = TokenUtils.destructureAllCookiesClient(context);
    const list = await VehiclesController.apiSSRGetListConsult(getCookies);
    if (list.error || list.statusCode !== 200 || !list.payload)
      throw new Error("No fue posible obtener la información");
    return {
      props: {
        _vehicles: list.payload.listVehicles,
        _tower: list.payload.listTower,
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

export default ViewVehiclesConsult;
