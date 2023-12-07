import Image from "next/image";
import heroImg from "@/../public/images/hero.png";
import Link from "next/link";
import Container from "./HomePage/container";

const Hero = () => {
  return (
    <>
      <Container className="flex flex-wrap ">
        <div className="flex items-center w-full lg:w-1/2">
          <div className="max-w-2xl mb-8">
            <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight">
              Gestiona tu Hogar con Facilidad
            </h1>
            <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl">
              Simplifica la administración de tu copropiedad con nuestra
              plataforma todo en uno.
            </p>

            <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
              <Link
                href="/service-and-pricing"
                rel="noopener"
                className="px-8 py-4 text-lg font-medium text-center text-white bg-secondary rounded-md "
              >
                Mayor Información
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
            />
          </div>
        </div>
      </Container>
      {/* <ClientsContainer /> */}
    </>
  );
};

export default Hero;
