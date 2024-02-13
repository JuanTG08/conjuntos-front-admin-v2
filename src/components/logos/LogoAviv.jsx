import Image from "next/image";
import React from "react";
import aviv from "@/components/logos/logo-azul-aviv.png";

const LogoAviv = () => {
  return (
    <Image src={aviv} width={100} height={32} alt="Logo-Aviv" />
  );
};

export default LogoAviv;
