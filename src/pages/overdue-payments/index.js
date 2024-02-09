import HeaderPage from "@/components/views/partials/HeaderPage";
import { Button } from "@nextui-org/react";
import { getSession, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

const ViewOverduePayments = () => {
  const { data: session } = useSession();
  useEffect(() => {
    console.log(session)
    // if (window && session) signOutGoogle();
  }, [session]);
  return (
    <>
      <HeaderPage title="Falta de pago" />
      <div className="h-screen flex flex-col items-center justify-center gap-6 p-4">
        <figure className="w-[128px] h-[41px]">
          <Image
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
            <h1
              style={{ textWrap: "balance" }}
              className="text-4xl text-center sm:text-5xl lg:text-5xl p-0 m-0 font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight xl:leading-tight"
            >
              Falta de Pago del Conjunto Residencial
            </h1>
          </div>
          <p
            className="text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl"
          >
            Oops, parece que ha habido un problema. El conjunto residencial no
            ha realizado los pagos necesarios, lo que ha resultado en la
            suspensión temporal de su acceso. Si cree que esto podría ser un
            error, por favor, póngase en contacto con el administrador del
            conjunto para resolver este problema y restablecer el acceso a los
            servicios.
          </p>
          <Button
            color="primary"
            variant="solid"
            as={Link}
            radius="sm"
            size="lg"
            className="w-full"
            href="/login"
          >
            Iniciar Sesión
          </Button>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const token = await getSession(context);
  if (token)
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  return {
    props: {},
  };
}

export default ViewOverduePayments;
