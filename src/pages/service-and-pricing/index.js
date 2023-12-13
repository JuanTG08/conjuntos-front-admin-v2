import HeaderPage from "@/components/views/partials/HeaderPage";
import HeroServiceAndPricing from "@/components/views/partials/service-and-pricing/hero";
import CardPricing from "@/components/views/services-and-pricing/card-pricing";
import React from "react";

const data = [
  {
    title: "Plan Estándar Mensual",
    description: "Administración y comunicación eficaces. Prueba sin compromisos a largo plazo.",
    pricing: "99.900",
    typePricing: "CO $",
    longTime: "Mes",
    button: "Solicitar cotización",
    caption: "CO $1.198.000 / 12 meses",
    modules: [
      {
        title: "Gestión",
        services: [
          "Copropiedades",
          "Vigilantes, propietarios y más",
          "Vehículos y mascotas",
        ],
      },
      {
        title: "Comunicaciones Residenciales",
        services: [
          "Anuncios",
          "Correspondencia",
          "Citofonía (previa cotización)",
          "Solicitudes y reclamos (PQRS)",
        ],
      },
      {
        title: "Control de Acceso y Logística",
        services: [
          "Ingreso de visitantes",
          "Control de correspondencias",
          "Ingreso de vehículos",
          "Control de mudanzas",
        ],
      },
      {
        title: "Soporte técnico",
        services: [
          "Vía chat o correo electrónico",
          "Soporte mediante tutoriales",
        ],
      },
    ],
  },
  {
    title: "Plan Estándar Anual",
    description: "Solución completa para administración y comunicación. Ahorra y simplifica.",
    span: "POPULAR",
    typePricing: "CO $",
    pricing: "899.900",
    discount: "1.199.900",
    percentageSavings: "AHORRA 25%",
    longTime: "Año",
    button: "Solicitar cotización",
    caption: "CO $300.000 Ahorro",
    modules: [
      {
        title: "Gestión",
        services: [
          "Copropiedades",
          "Vigilantes, propietarios y más",
          "Vehículos y mascotas",
        ],
      },
      {
        title: "Comunicaciones Residenciales",
        services: [
          "Anuncios",
          "Correspondencia",
          "Citofonía (previa cotización)",
          "Solicitudes y reclamos (PQRS)",
        ],
      },
      {
        title: "Control de Acceso y Logística",
        services: [
          "Ingreso de visitantes",
          "Control de correspondencias",
          "Ingreso de vehículos",
          "Control de mudanzas",
        ],
      },
      {
        title: "Reportes",
        services: [
          "Demográficos",
        ],
      },
      {
        title: "Soporte técnico",
        services: [
          "Vía chat o correo electrónico",
          "Soporte mediante tutoriales",
          "Acompañamiento continuo"
        ],
      },
    ],
  },
  {
    title: "Plan Estándar Semestral",
    description:
      "Lleva tu comunidad al siguiente nivel con nuestro plan a seis meses.",
    typePricing: "CO $",
    pricing: "509.900",
    discount: "599.900",
    percentageSavings: "AHORRA 15%",
    longTime: "Semestral",
    button: "Solicitar cotización",
    caption: "CO $1.018.000 / 12 meses",
    modules: [
      {
        title: "Gestión",
        services: [
          "Copropiedades",
          "Vigilantes, propietarios y más",
          "Vehículos y mascotas",
        ],
      },
      {
        title: "Comunicaciones Residenciales",
        services: [
          "Anuncios",
          "Correspondencia",
          "Citofonía (previa cotización)",
          "Solicitudes y reclamos (PQRS)",
        ],
      },
      {
        title: "Control de Acceso y Logística",
        services: [
          "Ingreso de visitantes",
          "Control de correspondencias",
          "Ingreso de vehículos",
          "Control de mudanzas",
        ],
      },
      {
        title: "Reportes",
        services: ["Demográficos"],
      },
      {
        title: "Soporte técnico",
        services: [
          "Vía chat o correo electrónico",
          "Soporte mediante tutoriales",
        ],
      },
    ],
  },
];

const ServiceAndPricing = () => {
  return (
    <>
      <HeaderPage title={"Servicios y Precios"} />
      <HeroServiceAndPricing />
      <section className="w-full items-center justify-center">
        <h1 className="text-4xl my-3 text-center font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight">
          Servicios y Precios
        </h1>
        <div className="bg-gradient-to-r flex ">
          <div className="container">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
              {data.map((item, i) => (
                <CardPricing data={item} key={i} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceAndPricing;
