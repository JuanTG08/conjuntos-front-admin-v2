import React from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import Router from "next/router";
import HeaderPage from "@/components/views/partials/HeaderPage";

const list = [
  {
    title: "Administración de roles",
    description:
      "Administración de los roles de los usuarios para crear o restringir las rutas de acceso a los usuarios",
    link: "/admin/roles",
    image: "https://nextui.org/images/hero-card-complete.jpeg",
  },
];

const AdminIndex = () => {
  return (
    <>
      <HeaderPage title={"Dashboard administrativo"} />
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
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
              <small className="text-default-500">{item.description}</small>
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
    </>
  );
};

export default AdminIndex;
