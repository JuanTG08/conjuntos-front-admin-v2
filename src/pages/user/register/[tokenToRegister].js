import UserToRegisterFormComponent from "@/components/views/user/register/UserToRegisterFormComponent";
import { UserController } from "@/controller/user.controller";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { Result, Typography, message } from "antd";
import HeaderPage from "@/components/views/partials/HeaderPage";
import { Button, Link as LinkUI } from "@nextui-org/react";
import Link from "next/link";
import { getSession, signIn } from "next-auth/react";
import { LoginOutlined } from "@ant-design/icons";
import { CountryController } from "@/controller/country.controller";
import { DepartmentCountryController } from "@/controller/department_country.controller";

const RegisterUser = ({
  tokenToRegister,
  dataUserRegister,
  dataSelectToRegister,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [successRegister, setSuccessRegister] = useState(false);
  const onSubmit = async (values) => {
    try {
      const response = await UserController.viewSubmitRegisterUser(
        values,
        tokenToRegister
      );
      if (response.statusCode != 200 || response.error) {
        messageApi.error(response.message);
        return;
      }
      setSuccessRegister(true);
      return;
    } catch (error) {
      console.log(error);
      messageApi.error("Error de conexión");
      return;
    }
  };
  return (
    <>
      {contextHolder}
      <HeaderPage title={"Regístrate"} />
      {successRegister ? (
        <Result
          status="success"
          title="¡Registro Exitoso!"
          subTitle="Te has registrado con éxito en nuestra plataforma. Bienvenido a nuestra comunidad. Ahora puedes disfrutar de todos los servicios y características que ofrecemos. Si tienes alguna pregunta o necesitas asistencia, no dudes en contactarnos. ¡Estamos aquí para ayudarte!"
          extra={[
            <Button
              startContent={<LoginOutlined />}
              onClick={() => signIn("google")}
              color="primary"
              key="login"
            >
              Iniciar Sesión
            </Button>,
            <LinkUI as={Link} href="/login" key="home">
              Ir a la Página Principal
            </LinkUI>,
          ]}
        />
      ) : (
        <>
          <Typography.Title level={1} style={{ textAlign: "center" }}>
            !Regístrate!
          </Typography.Title>
          <UserToRegisterFormComponent
            onSubmit={onSubmit}
            valuesToForm={UserController.viewGetDataToFormUserToRegister(
              dataUserRegister,
            )}
            typesIdentification={dataSelectToRegister.typesIdentification}
            departamentos={dataSelectToRegister.departments}
            genders={dataSelectToRegister.genders}
          />
        </>
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    const { tokenToRegister } = context.query;
    const session = await getSession(context);
    if (session)
      return { redirect: { destination: "/dashboard", permanent: false } };
    const userToRegister =
      await UserController.apiGetUserToRegisterValidByToken(tokenToRegister);
    if (
      userToRegister.error ||
      userToRegister.statusCode != 200 ||
      !userToRegister.payload
    ) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    return {
      props: {
        tokenToRegister,
        dataUserRegister: userToRegister.payload.user,
        dataSelectToRegister: userToRegister.payload.dataSelectToRegister,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}
export default RegisterUser;
