import Image from "next/image";
import heroImg from "@/../public/images/mobile_pay.png";
import Container from "../HomePage/container";

const HeroServiceAndPricing = () => {
  return (
    <>
      <Container className="flex flex-wrap ">
        <div className="flex items-center w-full lg:w-1/2">
          <div className="max-w-2xl mb-8">
            <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight">
              Optimiza la gestión de conjuntos residenciales
            </h1>
            <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl">
              Descubre nuestros planes exclusivos para una administración
              eficiente. ¡Tu conjunto residencial en las mejores manos!
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center w-full lg:w-1/2">
          <div className="">
            <Image
              src={heroImg}
              width="500"
              height="auto"
              className={"object-cover"}
              alt="Hero Illustration"
              loading="eager"
              placeholder="blur"
            />
          </div>
        </div>
      </Container>
      {/* <ClientsContainer /> */}
    </>
  );
};

export default HeroServiceAndPricing;
