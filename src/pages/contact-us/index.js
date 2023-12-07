import React from "react";
import HeaderPage from "@/components/views/partials/HeaderPage";
import Benefits from "@/components/views/partials/HomePage/benefits";
import ContainerContactUs from "@/components/views/partials/contact-us/container-contact-us";
import HeroContactUs from "@/components/views/partials/contact-us/hero";
import { Divider } from "antd";
import { contactData } from "@/components/views/partials/HomePage/data";

const ContactUsPage = () => {
  return (
    <div>
      <HeaderPage title="Contáctenos" />
      <main className="App">
        <HeroContactUs />
        <Divider />
        <ContainerContactUs />
        <Divider />
        <Benefits imgPos="right" data={contactData} />
      </main>
    </div>
  );
};

export default ContactUsPage;
