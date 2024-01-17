import { Descriptions } from "antd";

const ApartmentUserViewPanelCaptionComponent = ({
  apartment,
  tower,
  complex,
}) => {
  const getData = () => {
    return [
      {
        key: "1",
        label: "Unidad",
        children: apartment?.apartment_identifier_tower,
      },
      {
        key: "2",
        label: "Torre",
        children: tower?.tower_name,
      },
      {
        key: "3",
        label: "Conjunto Residencial",
        children: complex?.complex_name,
      },
    ];
  };
  return <Descriptions title="Información de los usuarios" items={getData()} />;
};

export default ApartmentUserViewPanelCaptionComponent;
