import {
  SmileOutlined,
  NotificationOutlined,
  ControlOutlined,
  InboxOutlined,
  PhoneOutlined,
  SettingOutlined,
  CommentOutlined,
  LockOutlined,
  FundOutlined,
} from "@ant-design/icons";

import benefitOneImg from "@/../public/images/benefit-one.png";
import benefitTwoImg from "@/../public/images/benefit-two.png";
import contactImg from "@/../public/images/contact.png";
import { CursorArrowRaysIcon } from "@/components/Icons/CursorArrowRaysIcon";

const benefitOne = {
  title: "Beneficios",
  image: benefitOneImg,
  bullets: [
    {
      title: "Simplifica la administración",
      desc: "Nuestra plataforma facilita tareas complejas de la copropiedad, como finanzas y comunicación, para una gestión sin complicaciones.",
      icon: <SmileOutlined style={{ color: "white", fontSize: "30px" }} />,
    },
    {
      title: "Comunicación eficiente",
      desc: "Facilita la comunicación entre propietarios, administradores y vigilantes para una gestión eficiente.",
      icon: <NotificationOutlined style={{ color: "white", fontSize: "30px" }} />,
    },
    {
      title: "Eficiencia asegurada",
      desc: "Ofrecemos herramientas potentes que optimizan la operación de su copropiedad, lo que se traduce en ahorro de tiempo y dinero.",
      icon: <CursorArrowRaysIcon style={{ color: "white", fontSize: "30px" }} />,
    },
  ],
};

const benefitTwo = {
  title: "Servicios Destacados",
  image: benefitTwoImg,
  bullets: [
    {
      title: "Administración y Gestión",
      desc: "Desde la gestión eficiente de copropiedades hasta el control de acceso de visitantes, incluyendo la administración de propietarios, arrendatarios, vehículos y mascotas, nuestra plataforma integral simplifica la convivencia y la administración.",
      icon: <SettingOutlined style={{ color: "white", fontSize: "30px" }} />,
    },
    {
      title: "Comunicaciones Residenciales",
      desc: "Potencia la comunicación en tu comunidad con la gestión integral de anuncios, correspondencia y solicitudes. Mantén una interacción fluida y organizada entre residentes y administración, asegurando una comunicación efectiva.",
      icon: <CommentOutlined style={{ color: "white", fontSize: "30px" }} />,
    },
    {
      title: "Control de Acceso y Logística",
      desc: "Optimiza el control de acceso y la logística en tu comunidad con servicios de gestión de visitantes, correspondencia, vehículos y mudanzas. Mantén la seguridad y el flujo organizado en cada ingreso.",
      icon: <LockOutlined style={{ color: "white", fontSize: "30px" }} />,
    },
    {
      title: "Reportes",
      desc: "Obtén una visión detallada de la demografía de tu comunidad a través de nuestros informes especializados. Toma decisiones fundamentadas basadas en datos concretos para mejorar la calidad de vida en tu conjunto residencial.",
      icon: <FundOutlined style={{ color: "white", fontSize: "30px" }} />,
    },
    {
      title: "Soporte Técnico",
      desc: (
        <span>
          Obtén asistencia inmediata a través de nuestro chat o correo
          electrónico, accede a tutoriales detallados para resolver tus dudas y
          cuenta con un acompañamiento continuo para garantizar una experiencia
          sin problemas.{" "}
          <strong>Estamos aquí para ayudarte en cada paso.</strong>
        </span>
      ),
      icon: <ControlOutlined style={{ color: "white", fontSize: "30px" }} />,
    },
  ],
};

const contactData = {
  title: "Otras Formas de Contacto",
  image: contactImg,
  bullets: [
    {
      title: "Envíanos un Correo Electrónico",
      desc: "info@connectics.co",
      icon: <InboxOutlined style={{ color: "white", fontSize: "30px" }} />,
    },
    {
      title: "Número telefónico de contacto",
      desc: "+57 3224338072",
      icon: <PhoneOutlined style={{ color: "white", fontSize: "30px" }} />,
    },
  ],
};

export { benefitOne, benefitTwo, contactData };
