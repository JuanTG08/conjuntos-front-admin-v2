import Image from "next/image";
import heroImg from "@/../public/images/contact-us.png";
import Link from "next/link";
import Container from "../HomePage/container";

const NUMBER_PHONE_CONTACT = "+573224338072";
const TEXT_MESSAGE_CONTACT = `¡Hola! Estoy interesado en obtener más información sobre los servicios de ${process.env.NEXT_PUBLIC_NAME_APP} . ¿Podrían proporcionarme detalles adicionales? 🥳`;

const HeroContactUs = () => {
  return (
    <>
      <Container className="flex flex-wrap ">
        <div className="flex items-center w-full lg:w-1/2">
          <div className="max-w-2xl mb-8">
            <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight">
              Contáctenos
            </h1>
            <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl">
              Estamos aquí para ayudarte. ¡No dudes en ponerte en contacto con
              nosotros! Ya sea para consultas, comentarios o asistencia, estamos
              a tu disposición para brindarte la mejor atención.
            </p>

            <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
              <Link
                href={`https://api.whatsapp.com/send?phone=${NUMBER_PHONE_CONTACT}&text=${TEXT_MESSAGE_CONTACT}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 text-lg font-medium text-center text-white bg-secondary rounded-md "
              >
                Enviar mensaje de WhatsApp
              </Link>
            </div>
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
              priority
            />
          </div>
        </div>
      </Container>
      {/* <ClientsContainer /> */}
    </>
  );
};

export default HeroContactUs;
