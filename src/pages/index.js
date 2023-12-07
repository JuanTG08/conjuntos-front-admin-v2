import HeaderPage from "@/components/views/partials/HeaderPage";
import Benefits from "@/components/views/partials/HomePage/benefits";
import {
  benefitOne,
  benefitTwo,
} from "@/components/views/partials/HomePage/data";
import SectionTitle from "@/components/views/partials/HomePage/sectionTitle";
import Hero from "@/components/views/partials/hero";
import { getSession } from "next-auth/react";

export default function Home() {
  return (
    <>
      <HeaderPage title="Conjuntos" />
      <main className="App">
        <Hero />
        <SectionTitle
          pretitle={process.env.NEXT_PUBLIC_NAME_APP}
          title="¿Por qué deberías escogernos?"
        >
          Somos una plataforma integral para la administración de copropiedades
          que simplifica la gestión, mejora la comunicación y promueve la
          eficiencia en la vida en comunidad.
        </SectionTitle>
        <Benefits data={benefitOne} />
        <Benefits imgPos="right" data={benefitTwo} />
        {/*
          <SectionTitle
            pretitle="Conócenos mejor"
            title="Aprende más sobre nuestra App"
          />
          <Video />
          <SectionTitle
            pretitle="Testimonials"
            title="Here's what our customers said"
          >
            Testimonails is a great way to increase the brand trust and awareness.
            Use this section to highlight your popular customers.
          </SectionTitle>
          <Testimonials />
          <SectionTitle pretitle="FAQ" title="Frequently Asked Questions">
            Answer your customers possible questions here, it will increase the
            conversion rate as well as support or chat requests.
          </SectionTitle>
          <Faq />
        */}
      </main>
    </>
  );
}

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
