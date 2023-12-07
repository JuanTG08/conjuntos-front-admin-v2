import { Descriptions } from "antd";

const TowerLeyendComponent = ({ complex }) => {
  const getData = () => {
    return [
      {
        key: "1",
        label: "Conjunto",
        children: complex?.complex_name,
      },
      {
        key: "2",
        label: "NIT",
        children: complex?.complex_nit,
      },
      {
        key: "3",
        label: "Numero de torres máximas",
        children: complex?.number_buildings,
      },
      {
        key: "4",
        label: "Numero de torres establecidas",
        children: complex?.total || complex?._count_tower,
      },
      {
        key: "5",
        label: "Numero máximo de apartamentos",
        children: complex?.number_units,
      },
    ];
  };
  return <Descriptions title="Información de la torre" items={getData()} />;
};

export default TowerLeyendComponent;
