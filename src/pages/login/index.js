import GoogleIcon from "@/components/Icons/GoogleIcon";
import TitlePage from "@/components/data/title";
import HeaderPage from "@/components/views/partials/HeaderPage";
import { Button, Card, CardBody, Image } from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";
import React, { useEffect } from "react";

const signInGoogle = async () => {
  try {
    const responseSignIn = await signIn("google", {
      callbackUrl: "/dashboard",
      redirect: false,
    });
  } catch (error) {}
};

const ViewLogin = () => {
  const { data: session } = useSession();
  useEffect(() => {
    if (window && session) signOutGoogle();
  }, [session]);

  const signOutGoogle = async () => {
    await signOut();
  };
  return (
    <>
      <HeaderPage title="Iniciar Sesión" />
      <Card>
        <CardBody>
          <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4">
            <div className="col-span-6 md:col-span-6">
              <Image
                alt="Album cover"
                className="p-4"
                width="100%"
                src="/svg/login.svg"
              />
            </div>
            <div className="col-span-6 md:col-span-6 flex flex-col items-center justify-center gap-4">
              <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight">
                Iniciar Sesión
              </h1>
              <Button
                color="primary"
                variant="bordered"
                startContent={<GoogleIcon />}
                radius="sm"
                size="lg"
                onPress={signInGoogle}
                className="w-full"
              >
                Iniciar Sesión con Google
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default ViewLogin;
