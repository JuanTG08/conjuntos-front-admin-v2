import { env } from "../../next.config";
import {
  ApartmentOutlined,
  UsergroupAddOutlined,
  CoffeeOutlined,
  ContactsOutlined,
  SolutionOutlined,
  QuestionCircleOutlined,
  GlobalOutlined,
  MailOutlined,
  UserSwitchOutlined,
  ProfileOutlined,
  ControlOutlined,
  SettingOutlined,
  AuditOutlined,
  CarOutlined,
  CompassOutlined,
  HeartOutlined,
  NodeIndexOutlined,
  PhoneOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { CONST_SYSTEM_NOT_PARAM_VIEW } from "./system.constant";

export const CONST_USER_VIEW_PANEL = {
  userToRegister: "USER_TO_REGISTER",
  userRoles: "USER_ROLES",
};

export const CONST_USER_DATA_INFO_HEADER = "user_data_info";

export const CONST_USER_SUAG = env.variables.roles.SUAG;
export const CONST_USER_UAG = env.variables.roles.UAG;
export const CONST_USER_SUAC = env.variables.roles.SUAC;
export const CONST_USER_UAC = env.variables.roles.UAC;
export const CONST_USER_UPA = env.variables.roles.UPA;
export const CONST_USER_UEA = env.variables.roles.UEA;
export const CONST_USER_UEV = env.variables.roles.UEV;
export const CONST_USER_UA = env.variables.roles.UA;
export const CONST_USER_UPB = env.variables.roles.UPB;
export const CONST_USER_UFP = env.variables.roles.UFP;
export const CONST_USER_FPB = env.variables.roles.FPB;

export const CONST_NAVBAR_USERS = [
  {
    idRole: [CONST_USER_SUAG.id, CONST_USER_UAG.id],
    isLogin: true,
    role: "S/UAG",
    mainPage: "/dashboard",
    routesNavbar: [
      {
        key: "complex",
        label: "Conjuntos",
        children: [
          {
            key: "listComplex",
            label: "Listado de Conjuntos",
            description: "Listado de conjuntos residenciales",
            link: "/complex",
            icon: (color) => (
              <ApartmentOutlined style={{ color, fontSize: "2em" }} />
            ),
          },
          {
            key: "createComplex",
            label: "Crear Conjunto",
            description: "Crear conjunto residencial",
            link: "/complex/ComplexCreate",
            icon: (color) => (
              <UsergroupAddOutlined style={{ color, fontSize: "2em" }} />
            ),
          },
        ],
      },
      {
        key: "admin",
        label: "Administración",
        children: [
          {
            key: "adminListRoles",
            label: "Listado de Roles",
            description: "Listado de roles",
            link: "/admin/roles",
            icon: (color) => (
              <ProfileOutlined style={{ color, fontSize: "2em" }} />
            ),
          },
        ],
      },
    ],
  },
  {
    idRole: [CONST_USER_SUAC.id, CONST_USER_UAC.id], // Usuario administradores de conjuntos
    isLogin: true,
    role: "S/UAC",
    mainPage: "/dashboard",
    routesNavbar: [
      {
        key: "myComplex",
        label: "Mi Conjunto Residencial",
        children: [
          {
            key: "complexSettings",
            label: "Configuración del conjunto",
            description:
              "Personalice y administre la configuración de su conjunto residencial con facilidad.",
            link: "/setting/complex",
            icon: (color) => (
              <ControlOutlined style={{ color, fontSize: "2em" }} />
            ),
          },
          {
            key: "complexAdminTowers",
            label: "Administración de torres",
            description:
              "Aquí, puede supervisar y administrar eficazmente las operaciones de las torres y unidades.",
            link: `/tower/${CONST_SYSTEM_NOT_PARAM_VIEW}/TowerList`,
            icon: (color) => (
              <SettingOutlined style={{ color, fontSize: "2em" }} />
            ),
          },
          {
            key: "complexAdminUsers",
            label: "Administración de usuarios",
            description:
              "Gestione y supervise las cuentas administrativa de manera eficiente.",
            link: `/complex/${CONST_SYSTEM_NOT_PARAM_VIEW}/UsersViewPanel`,
            icon: (color) => (
              <UserSwitchOutlined style={{ color, fontSize: "2em" }} />
            ),
          },
          {
            key: "complexAdminAdvertisement",
            label: "Gestión de anuncios",
            description:
              "Cree, edite y administre anuncios y comunicaciones importantes para mantener a los residentes informados y comprometidos.",
            link: `/complex/${CONST_SYSTEM_NOT_PARAM_VIEW}/advertisement`,
            icon: (color) => (
              <AuditOutlined style={{ color, fontSize: "2em" }} />
            ),
          },
        ],
      },
      {
        key: "requirement",
        label: "Requerimientos",
        children: [
          {
            key: "pqr",
            label: "PQRS",
            description: "Gestiona tus Pqrs hacia la administración.",
            link: "/pqrs",
            icon: (color) => (
              <SolutionOutlined style={{ color, fontSize: "2em" }} />
            ),
          },
          {
            key: "moving",
            label: "Mudanzas",
            description: "Gestiona tus solicitudes de mudanzas.",
            link: "/moving/list/admin",
            icon: (color) => (
              <CompassOutlined style={{ color, fontSize: "2em" }} />
            ),
          },
        ],
      },
      {
        key: "logBooks",
        label: "Minuta",
        link: "/log-book",
        icon: (color) => <AuditOutlined style={{ color, fontSize: "2em" }} />,
      },
    ],
  },
  {
    idRole: [CONST_USER_UPA.id], // USUARIO PROPIETARIO
    isLogin: true,
    role: "UPA/UEA",
    mainPage: "/dashboard",
    routesNavbar: [
      {
        key: "advertisements",
        label: "Anuncios",
        children: [
          {
            key: "globalAdvertisement",
            label: "Anuncios Globales",
            description: "Listado de anuncios generales o globales",
            link: "/advertisement/global",
            icon: (color) => (
              <GlobalOutlined style={{ color, fontSize: "2em" }} />
            ),
          },
        ],
      },
      {
        key: "apartment",
        label: "Mi Unidad",
        children: [
          {
            key: "info",
            label: "Información",
            description: "Información de mi unidad",
            link: "/apartment/information",
            icon: (color) => (
              <SolutionOutlined style={{ color, fontSize: "2em" }} />
            ),
          },
          {
            key: "accessPerson",
            label: "Visitantes",
            description: "Visualiza y programa tus visitas",
            link: "/access-person",
            icon: (color) => (
              <UserSwitchOutlined style={{ color, fontSize: "2em" }} />
            ),
          },
          {
            key: "correspondence",
            label: "Correspondencia",
            description: "Mi correspondencia",
            link: "/advertisement/correspondence/list",
            icon: (color) => (
              <MailOutlined style={{ color, fontSize: "2em" }} />
            ),
          },
          {
            key: "vehicles",
            label: "Vehiculos",
            description: "Registra y consulta tus vehiculos autorizados",
            link: "/vehicles",
            icon: (color) => <CarOutlined style={{ color, fontSize: "2em" }} />,
          },
          {
            key: "pets",
            label: "Mascotas",
            description: "Registra y gestiona tus mascotas",
            link: "/pets",
            icon: (color) => (
              <HeartOutlined style={{ color, fontSize: "2em" }} />
            ),
          },
        ],
      },
      {
        key: "requirement",
        label: "Requerimientos",
        children: [
          {
            key: "pqr",
            label: "PQRS",
            description: "Gestiona tus Pqrs hacia la administración.",
            link: "/pqrs/info",
            icon: (color) => (
              <SolutionOutlined style={{ color, fontSize: "2em" }} />
            ),
          },
          {
            key: "moving",
            label: "Mudanzas",
            description: "Gestiona tus solicitudes de mudanzas.",
            link: "/moving/list",
            icon: (color) => (
              <CompassOutlined style={{ color, fontSize: "2em" }} />
            ),
          },
        ],
      },
    ],
  },
  {
    idRole: [CONST_USER_UEA.id, CONST_USER_UFP.id], // ENCARGADO DE LA UNIDAD / USUARIO FAMILIAR PROPIETARIO
    isLogin: true,
    role: "UPA/UEA",
    mainPage: "/dashboard",
    routesNavbar: [
      {
        key: "advertisements",
        label: "Anuncios",
        children: [
          {
            key: "globalAdvertisement",
            label: "Anuncios Globales",
            description: "Listado de anuncios generales o globales",
            link: "/advertisement/global",
            icon: (color) => (
              <GlobalOutlined style={{ color, fontSize: "2em" }} />
            ),
          },
        ],
      },
      {
        key: "apartment",
        label: "Mi Unidad",
        children: [
          {
            key: "info",
            label: "Información",
            description: "Información de mi unidad",
            link: "/apartment/information",
            icon: (color) => (
              <SolutionOutlined style={{ color, fontSize: "2em" }} />
            ),
          },
          {
            key: "accessPerson",
            label: "Visitantes",
            description: "Visualiza y programa tus visitas",
            link: "/access-person",
            icon: (color) => (
              <UserSwitchOutlined style={{ color, fontSize: "2em" }} />
            ),
          },
          {
            key: "correspondence",
            label: "Correspondencia",
            description: "Mi correspondencia",
            link: "/advertisement/correspondence/list",
            icon: (color) => (
              <MailOutlined style={{ color, fontSize: "2em" }} />
            ),
          },
          {
            key: "vehicles",
            label: "Vehiculos",
            description: "Registra y consulta tus vehiculos autorizados",
            link: "/vehicles",
            icon: (color) => <CarOutlined style={{ color, fontSize: "2em" }} />,
          },
          {
            key: "pets",
            label: "Mascotas",
            description: "Registra y gestiona tus mascotas",
            link: "/pets",
            icon: (color) => (
              <HeartOutlined style={{ color, fontSize: "2em" }} />
            ),
          },
        ],
      },
      {
        key: "requirement",
        label: "Requerimientos",
        children: [
          {
            key: "pqr",
            label: "PQRS",
            description: "Gestiona tus Pqrs hacia la administración.",
            link: "/pqrs/info",
            icon: (color) => (
              <SolutionOutlined style={{ color, fontSize: "2em" }} />
            ),
          },
          {
            key: "moving",
            label: "Mudanzas",
            description: "Gestiona tus solicitudes de mudanzas.",
            link: "/moving",
            icon: (color) => (
              <CompassOutlined style={{ color, fontSize: "2em" }} />
            ),
          },
        ],
      },
    ],
  },
  {
    idRole: [CONST_USER_UEV.id], // Vigilante
    isLogin: true,
    role: "UEV",
    mainPage: "/dashboard",
    routesNavbar: [
      {
        key: "logs_book",
        label: "Minuta",
        children: [
          {
            key: "logsBookCreateIncident",
            label: "Registrar",
            description: "Realizar un registro de minuta",
            link: "/log-book/new-log-incident",
            icon: (color) => (
              <MailOutlined style={{ color, fontSize: "2em" }} />
            ),
          },
          {
            key: "logsBook",
            label: "Mi minuta",
            description: "Consultar los registros que he generado",
            link: "/log-book/history",
            icon: (color) => (
              <ProfileOutlined style={{ color, fontSize: "2em" }} />
            ),
          },
        ],
      },
      {
        key: "correspondence",
        label: "Correspondencia",
        children: [
          {
            key: "correspondenceCreate",
            label: "Crear Correspondencia",
            description: "Crear correspondencia",
            link: "/advertisement/correspondence/create",
            icon: (color) => (
              <MailOutlined style={{ color, fontSize: "2em" }} />
            ),
          },
          {
            key: "correspondenceList",
            label: "Consultar Correspondencia",
            description: "Consultar correspondencia",
            link: "/advertisement/correspondence/list-admin",
            icon: (color) => (
              <ProfileOutlined style={{ color, fontSize: "2em" }} />
            ),
          },
        ],
      },
      {
        key: "access",
        label: "Accesos",
        children: [
          {
            key: "visits",
            label: "Visitantes",
            description: "Consulta las visitas autorizadas",
            link: "/access-person/list",
            icon: (color) => (
              <MailOutlined style={{ color, fontSize: "2em" }} />
            ),
          },
          {
            key: "vehicles",
            label: "Vehiculos",
            description: "Consultar los vehiculos autorizados",
            link: "/vehicles/consult",
            icon: (color) => <CarOutlined style={{ color, fontSize: "2em" }} />,
          },
          {
            key: "moving",
            label: "Mudanzas",
            description: "Consultar las mudanzas autorizadas",
            link: "/moving/authorized",
            icon: (color) => (
              <CompassOutlined style={{ color, fontSize: "2em" }} />
            ),
          },
        ],
      },
      {
        key: "call",
        label: "Citofonía",
        description: "Llama a los residentes de manera fácil y sencilla.",
        link: "/call",
        icon: (color) => <PhoneOutlined style={{ color, fontSize: "2em" }} />,
      },
    ],
  },
  {
    idRole: [CONST_USER_UA.id],
    isLogin: false,
    role: "UA",
    mainPage: "/",
    routesNavbar: [
      {
        key: "serviceAndPricing",
        label: "Servicios y Precios",
        description: "Nuestro catalogo de precios para nuestros servicios.",
        link: "/login",
        icon: (color) => (
          <ShoppingOutlined style={{ color, fontSize: "2em" }} />
        ),
      },
      {
        key: "aboutUs",
        label: "¿Quienes somos?",
        children: [
          {
            key: "contactUs",
            label: "Contacto",
            description: "Contacto",
            link: "/contact-us",
            icon: (color) => (
              <ContactsOutlined style={{ color, fontSize: "2em" }} />
            ),
          },
          {
            key: "politics",
            label: "Política de privacidad",
            description: "Política de Privacidad y Manejo de Datos Personales",
            link: "/policy-and-privacy",
            icon: (color) => (
              <CoffeeOutlined style={{ color, fontSize: "2em" }} />
            ),
          },
        ],
      },
      {
        key: "help",
        label: "Ayuda",
        children: [
          {
            key: "support",
            label: "Soporte",
            description: "Soporte",
            link: "/support",
            icon: (color) => (
              <SolutionOutlined style={{ color, fontSize: "2em" }} />
            ),
          },
          {
            key: "FAQ",
            label: "Preguntas frecuentes",
            description: "Preguntas frecuentes",
            link: "/faq",
            icon: (color) => (
              <QuestionCircleOutlined style={{ color, fontSize: "2em" }} />
            ),
          },
        ],
      },
    ],
  },
  {
    idRole: [CONST_USER_UPB.id], // USUARIO PROPIETARIO BÁSICO
    isLogin: true,
    role: "UPB",
    mainPage: "/dashboard",
    routesNavbar: [
      {
        key: "apartment",
        label: "Mi Unidad",
        children: [
          {
            key: "info",
            label: "Información",
            description: "Información de mi unidad",
            link: "/apartment/information",
            icon: (color) => (
              <SolutionOutlined style={{ color, fontSize: "2em" }} />
            ),
          },
        ],
      },
      {
        key: "requirement",
        label: "Requerimientos",
        children: [
          {
            key: "pqr",
            label: "PQRS",
            description: "Gestiona tus Pqrs hacia la administración.",
            link: "/pqrs/info",
            icon: (color) => (
              <SolutionOutlined style={{ color, fontSize: "2em" }} />
            ),
          },
          {
            key: "moving",
            label: "Mudanzas",
            description: "Gestiona tus solicitudes de mudanzas.",
            link: "/moving/list",
            icon: (color) => (
              <CompassOutlined style={{ color, fontSize: "2em" }} />
            ),
          },
        ],
      },
    ],
  },
  {
    idRole: [CONST_USER_UFP.id], // USUARIO FAMILIAR DEL PROPIETARIO PROPIETARIO
    isLogin: true,
    role: "UFP",
    mainPage: "/dashboard",
    routesNavbar: [
      {
        key: "advertisements",
        label: "Anuncios",
        children: [
          {
            key: "globalAdvertisement",
            label: "Anuncios Globales",
            description: "Listado de anuncios generales o globales",
            link: "/advertisement/global",
            icon: (color) => (
              <GlobalOutlined style={{ color, fontSize: "2em" }} />
            ),
          },
        ],
      },
      {
        key: "apartment",
        label: "Mi Unidad",
        children: [
          {
            key: "info",
            label: "Información",
            description: "Información de mi unidad",
            link: "/apartment/information",
            icon: (color) => (
              <SolutionOutlined style={{ color, fontSize: "2em" }} />
            ),
          },
          {
            key: "accessPerson",
            label: "Visitantes",
            description: "Visualiza y programa tus visitas",
            link: "/access-person",
            icon: (color) => (
              <UserSwitchOutlined style={{ color, fontSize: "2em" }} />
            ),
          },
          {
            key: "correspondence",
            label: "Correspondencia",
            description: "Mi correspondencia",
            link: "/advertisement/correspondence/list",
            icon: (color) => (
              <MailOutlined style={{ color, fontSize: "2em" }} />
            ),
          },
          {
            key: "vehicles",
            label: "Vehiculos",
            description: "Registra y consulta tus vehiculos autorizados",
            link: "/vehicles",
            icon: (color) => <CarOutlined style={{ color, fontSize: "2em" }} />,
          },
          {
            key: "pets",
            label: "Mascotas",
            description: "Registra y gestiona tus mascotas",
            link: "/pets",
            icon: (color) => (
              <HeartOutlined style={{ color, fontSize: "2em" }} />
            ),
          },
        ],
      },
      {
        key: "requirement",
        label: "Requerimientos",
        children: [
          {
            key: "pqr",
            label: "PQRS",
            description: "Gestiona tus PQRS hacia la administración.",
            link: "/pqrs/info",
            icon: (color) => (
              <SolutionOutlined style={{ color, fontSize: "2em" }} />
            ),
          },
          {
            key: "moving",
            label: "Mudanzas",
            description: "Gestiona tus solicitudes de mudanzas.",
            link: "/moving",
            icon: (color) => (
              <CompassOutlined style={{ color, fontSize: "2em" }} />
            ),
          },
        ],
      },
    ],
  },
  {
    idRole: [CONST_USER_FPB.id], // FAMILIAR DEL PROPIETARIO BÁSICO
    isLogin: true,
    role: "FPB",
    mainPage: "/dashboard",
    routesNavbar: [
      {
        key: "apartment",
        label: "Mi Unidad",
        children: [
          {
            key: "info",
            label: "Información",
            description: "Información de mi unidad",
            link: "/apartment/information",
            icon: (color) => (
              <SolutionOutlined style={{ color, fontSize: "2em" }} />
            ),
          },
        ],
      },
      {
        key: "requirement",
        label: "Requerimientos",
        children: [
          {
            key: "pqr",
            label: "PQRS",
            description: "Gestiona tus PQRS hacia la administración.",
            link: "/pqrs/info",
            icon: (color) => (
              <SolutionOutlined style={{ color, fontSize: "2em" }} />
            ),
          },
        ],
      },
    ],
  },
];
