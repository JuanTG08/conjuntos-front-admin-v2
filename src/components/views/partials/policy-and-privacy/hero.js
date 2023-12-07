import React from "react";
import Container from "../HomePage/container";
import Image from "next/image";
import heroImg from "@/../public/images/secure-files.png";

const HeroPolicyAndPrivacy = () => {
  return (
    <>
      <Container className="flex flex-wrap ">
        <div className="flex items-center w-full lg:w-1/2">
          <div className="max-w-2xl mb-8">
            <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight">
              Política de privacidad y protección de datos
            </h1>
            <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl">
              Nuestra política de privacidad y protección de datos es
              fundamental para nosotros. En Connectics SAS, nos
              comprometemos a salvaguardar tu información personal y garantizar
              la confidencialidad de tus datos. Conoce cómo manejamos tus datos,
              tus derechos y cómo trabajamos para proteger tu privacidad.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center w-full lg:w-1/2">
          <div className="">
            <Image
              src={heroImg}
              width="616"
              height="617"
              className={"object-cover"}
              alt="Hero Illustration"
              loading="eager"
              placeholder="blur"
            />
          </div>
        </div>
      </Container>
    </>
  );
};

export default HeroPolicyAndPrivacy;
