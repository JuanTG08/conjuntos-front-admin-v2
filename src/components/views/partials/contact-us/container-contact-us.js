import React from "react";
import Container from "../HomePage/container";
import Image from "next/image";
import formImg from "@/../public/images/contact-us-form.png";
import ContactUsFormComponent from "../../contact-us/ContactUsFormComponent";

const ContainerContactUs = () => {
  return (
    <>
      <Container className="flex flex-wrap lg:gap-10 lg:flex-nowrap ">
        <div className={`flex items-center justify-center w-full lg:w-1/2`}>
          <div>
            <Image
              src={formImg}
              width="521"
              height="auto"
              alt="Benefits"
              className={"object-cover"}
              placeholder="blur"
              blurDataURL={formImg.src}
            />
          </div>
        </div>

        <div className={`flex flex-wrap items-center w-full lg:w-1/2`}>
          <div>
            <div className="flex flex-col w-full mt-4">
              <h3 className="max-w-2xl text-center mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl">
                Comunícate con nosotros
              </h3>
              <p className="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl">
                Completa nuestro formulario de contacto, y te responderemos
                rápidamente. Estamos aquí para resolver tus preguntas, brindarte
                información adicional o asistirte en lo que necesites.
              </p>
            </div>

            <div className="w-full mt-5">
              <ContactUsFormComponent
                onSubmit={() => console.log("Enviando...")}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ContainerContactUs;
