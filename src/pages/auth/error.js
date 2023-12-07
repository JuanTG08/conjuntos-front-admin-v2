import { useRouter } from "next/router";
import React from "react";
import NotAuthorizedPage from "@/pages/403";
import { CONST_ERROR_PAGES } from "@/constants/errors.constants";
import { Result } from "antd";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import HeaderPage from "@/components/views/partials/HeaderPage";

const AuthError = () => {
  const {
    query: { error },
  } = useRouter();
  if (error === CONST_ERROR_PAGES.accessDenied.title)
    return (
      <>
        <HeaderPage title={"Acceso denegado"} />
        <NotAuthorizedPage />
      </>
    );
  return (
    <>
      <HeaderPage title={"Error"} />
      <Result
        status="error"
        title="Error"
        subTitle="Ocurrió un error"
        extra={
          <Button as={Link} href="/" color="primary">
            Inicio
          </Button>
        }
      />
    </>
  );
};

export default AuthError;
