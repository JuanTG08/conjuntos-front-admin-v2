import HeaderPage from "@/components/views/partials/HeaderPage";
import { Button } from "@nextui-org/react";
import { Result } from "antd";
import Link from "next/link";
import React from "react";

const NotAuthorizedPage = () => {
  return (
    <>
      <HeaderPage title={"403"} />
      <Result
        status="403"
        title="Inicio de sesión fallido"
        subTitle="No hemos podido encontrar una cuenta asociada a la información proporcionada. Si es nuevo en nuestra plataforma, le invitamos a explorar nuestros planes de servicios para obtener más información. Si cree que esto es un error, por favor, póngase en contacto con el administrador para revisar su cuenta y asegurarse de que tenga acceso a nuestros servicios."
        extra={
          <Button as={Link} href="/service-and-pricing" color="primary">
            Servicios y Precios
          </Button>
        }
      />
    </>
  );
};

export default NotAuthorizedPage;
