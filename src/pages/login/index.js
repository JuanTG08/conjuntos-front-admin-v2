import GoogleIcon from "@/components/Icons/GoogleIcon";
import HeaderPage from "@/components/views/partials/HeaderPage";
import { Button, Divider, Image } from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";
import NextImage from "next/image";
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
      <div className="grid grid-cols-6 md:grid-cols-12">
        <div className="col-span-6 md:col-span-7 h-screen overflow-hidden hidden md:flex">
          <NextImage
            alt="Conjunto Residencial Image"
            width={1920}
            height={1310}
            className="object-cover w-full h-full rounded-none"
            style={{ minHeight: "100vh" }}
            src="/images/complex_residential.jpg"
            priority
          />
        </div>
        <div className="h-screen md:h-full col-span-6 md:col-span-5 flex flex-col items-center justify-center gap-6 p-4">
          <figure className="w-[128px] h-[41px]">
            <NextImage
              alt="Logo Aviv Azul"
              className="object-cover w-full h-full rounded-none"
              src="/logos/logo-azul-aviv.png"
              width={128}
              height={41}
              priority
            /> 
          </figure>
          <div className="flex flex-col items-center justify-center flex-grow flex-shrink gap-7">
            <div className="p-0 m-0">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl p-0 m-0 font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight xl:leading-tight">
                Iniciar Sesión
              </h1>
              <p className="text-2xl leading-tight font-bold text-primary">
                En aviv
              </p>
            </div>
            <Divider />
            <Button
              color="primary"
              variant="bordered"
              startContent={<GoogleIcon />}
              radius="sm"
              size="lg"
              onPress={signInGoogle}
              className="w-full p-3"
            >
              Iniciar Sesión con Google
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewLogin;
