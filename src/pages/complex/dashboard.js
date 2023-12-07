import TitlePage from "@/components/data/title";
import { CONST_SYSTEM_NOT_PARAM_VIEW } from "@/constants/system.constant";
import { useUser } from "@/context/UserContext";
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import Router from "next/router";
import React from "react";

const list = [
  {
    title: "Configuración del conjunto",
    description:
      "Personalice y administre la configuración de su conjunto residencial con facilidad. Acceda a herramientas poderosas para gestionar servicios, residentes y ajustes para crear una experiencia excepcional en su comunidad.",
    link: "/admin/roles",
    image: "/images/residential-complex-tower.png",
  },
  {
    title: "Administración de torres",
    description:
      "Aquí, puede supervisar y administrar eficazmente las operaciones de las torres, coordinar servicios, y mantener una experiencia de vida excepcional para los residentes.",
    link: `/tower/${CONST_SYSTEM_NOT_PARAM_VIEW}/TowerList`,
    image: "/images/residential-complex-tower.png",
  },
  {
    title: "Administración de usuarios",
    description:
      "Gestione y supervise las cuentas de los residentes de manera eficiente. Agregue, edite y administre perfiles de usuario, así como sus permisos y accesos en un solo lugar conveniente.",
    link: `/complex/${CONST_SYSTEM_NOT_PARAM_VIEW}/UsersViewPanel`,
    image: "/images/residential-complex-tower.png",
  },
  {
    title: "Gestión de anuncios",
    description:
      "Cree, edite y administre anuncios y comunicaciones importantes para mantener a los residentes informados y comprometidos. Mantenga a su comunidad actualizada de manera efectiva con nuestras herramientas de gestión de anuncios.",
    link: "/admin/roles",
    image: "/images/residential-complex-tower.png",
  },
];

const MyComplexDashboard = () => {
  const { user, setUser } = useUser();
  return (
    <div>
      <TitlePage>{user?.user?.complex?.complex_name}</TitlePage>
      <div className="gap-2 grid sm:grid-cols-4">
        {list.map((item, index) => (
          <Card
            shadow="lg"
            isPressable
            onPress={() => Router.push(item.link)}
            className="py-4"
            key={index}
          >
            <CardHeader className="pb-0 pt-2 px-4 flex-col">
              <h4 className="font-bold text-large">{item.title}</h4>
              <small className="text-default-500 text-left">{item.description}</small>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src={item.image}
                width={270}
              />
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyComplexDashboard;
