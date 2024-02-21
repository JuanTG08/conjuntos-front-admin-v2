/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true, // El modo estricto se debe desactivar cuando salga a producción
  skipTrailingSlashRedirect: true,
  output: "standalone",
  images: {
    domains: ["picsum.photos", "localhost"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          // Ajusta el tamaño máximo de los encabezados según tus necesidades
          {
            key: "Access-Control-Expose-Headers",
            value: "Content-Length, Content-Range",
          },
        ],
      },
    ];
  },
  env: {
    server: {
      url: "",
      url_local: "",
      api: {
        url: "/api",
        routes: {
          access_page: {
            url: "/access_page",
            mfs: "/mfs",
          },
          access_person: {
            url: "/access-person",
            to_complex: "/to-complex",
          },
          advertisement: {
            url: "/advertisement",
            list_complex: "/by-complex",
            list_categories: "/to-category",
            correspondence: "/correspondence",
            list_dashoboard: "/to-dashboard",
          },
          advertisement_types: {
            url: "/advertisement-types",
            list_with_complex: "/complex",
          },
          apartment: {
            url: "/apartment",
            urlRUD: "/rud",
            urlUser: "/user",
          },
          apartment_user: {
            url: "/apartment_user",
            urlRUD: "/rud",
          },
          auth: {
            url: "/auth",
            register: "/register-user",
            login: "/login-user",
            logout: "/logout-user",
          },
          call: {
            url: "/call",
          },
          complex: {
            url: "/complex",
            list_user: "user-admin",
          },
          cookies: {
            url: "/cookies",
          },
          correspondence: {
            url: "/correspondence",
          },
          department: {
            url: "/department_country",
          },
          logs_book_incidents: {
            url: "/logs_book_incidents",
          },
          nav_bar: {
            url: "/nav_bar",
          },
          moving: {
            url: "/moving",
          },
          municipality: {
            url: "/municipality",
          },
          paths_to: {
            url: "/paths_to",
          },
          pets: {
            url: "/pet",
          },
          plan_and_service: {
            url: "/plan_and_service",
            complex_plan: "/complex_plan",
          },
          pqrs: {
            url: "/pqrs",
            urlThread: "/thread",
          },
          roles: {
            url: "/roles",
            urlRUD: "/rud",
          },
          status: {
            url: "/status",
          },
          tower: {
            url: "/tower",
            urlRUD: "/rud",
          },
          user: {
            url: "/user",
          },
          user_roles: {
            url: "/user_roles",
            urlRUD: "/rud",
          },
          user_to_register: {
            url: "/user_to_register",
            urlRUD: "/rud",
          },
          files: {
            url: "/files",
            images: "/images",
          },
          vehicles: {
            url: "/vehicles",
          },
        },
      },
      cookies: {
        encrypt_key:
          "oQe96^Xey8_T#T6apiim87mgRQha#kA*xVKx!LuB8mbKLeoQe96^XLD&gS%SECRET#v^h~7~#w6KW8C5R`Aq~GLuB8m^XLD&gR`Aq~GLuS%",
        main_cookie: {
          name: "_cookie_000_1",
          maxAge: 604800,
        },
        user_information: {
          name: "_cookie_ui0",
          maxAge: 604800,
        },
        main_role: {
          name: "_cookie_mr0",
          maxAge: 604800,
        },
        user_access_paths: {
          name: "_cookie_uap0",
          maxAge: 604800,
        },
        nav_bar: {
          name: "_cookie_nb0",
          maxAge: 604800,
        },
      },
      node_env: "dev",
    },
    _API: {
      url: process.env.NEXT_PUBLIC_URL_API_MAIN,
      routes: {
        access_page: {
          url: "/api/access-page",
          list_mfs: "/handdler-R-method-from-status",
          list_create: "/handdler-CR-access-page",
          find_upd_del: "/handdler-RUDD-access-page/",
          list_pages: "/handdler-R-list-pages-by-web",
        },
        access_person: {
          url: "/api/access-person",
          list_create: "/handdler-CR-access-person",
          find_upd_del: "/handdler-RUD-access-person/",
          list_complex: "/handler-R-access-person-complex",
        },
        advertisement: {
          url: "/api/advertisements",
          list_complex: "/handler-R-advertisements-complex/",
          list_create: "/handler-CR-advertisements",
          find_upd_del: "/handler-RUDD-advertisements/",
          list_categories: "/handler-R-advertisement-to-category/",
          list_correspondences: "/handler-R-advertisement-correspondences/",
          list_dashboard: "/handler-R-advertisements-by-dashboard/",
          send_and_notify: "/handler-S-send-and-notify/",
          find_one_to_view: "/handler-R-find-advertisement-one/",
        },
        advertisement_types: {
          url: "/api/advertisements-types",
          list_with_complex: "/handler-R-advertisements-types-with-complex/",
        },
        apartment: {
          url: "/api/apartment-complex",
          create: "/handdler-C-apartment-complex",
          list_all: "/handdler-R-apartments-complex/",
          find_upd_del: "/handdler-RUD-apartment-complex/",
          list_user: "/handler-R-find-apartment-list-users/",
        },
        apartment_user: {
          url: "/api/apartment-complex-user",
          list_create: "/handler-CR-apartment-complex-user/",
          find_upd_del: "/handler-RUD-apartment-complex-user/",
        },
        auth: {
          url: "/api/auth",
          find_register: "/user-register-web/",
          login: "/login-apps",
          pre_login: "/pre-login-apps",
        },
        call: {
          url: "/api/call",
          find_number: "/handler-R-find-number-user/",
          credential_user: "/handler-R-credentials",
        },
        complex: {
          url: "/api/residential-complex",
          list_create: "/handdler-CR-residential-complex",
          find_upd_del: "/handdler-RUD-residential-complex/",
          list_user: "/handler-R-residential-complex-user/",
          find_towers_apartments: "/handler-R-tower-apartment",
          crud_plan_and_service: "/handler-CRUD-plan-and-service/",
        },
        country: {
          url: "/api/country",
          list: "/handler-R-country",
        },
        department: {
          url: "/api/department",
          list: "/handler-R-department/",
        },
        images: {
          url: "/uploads/",
        },
        files: {
          url: "/api/files",
          list_create: "/handdler-CR-files",
          set_image_compress: "/set-image-compress/",
        },
        logs_book_incidents: {
          url: "/api/logs-book-incidents",
          list_create: "/handler-CR-logs-book-incidents",
          list_all: "/handler-R-logs-book-incidents-complex",
          find_one: "/handler-R-logs-book-incidents/",
        },
        nav_bar: {
          url: "/api/nav-bar",
          create: "/handler-C-navbar",
          list_all: "/handler-R-navbar-list-all",
          find_upd_del: "/handler-RUD-navbar/",
        },
        moving: {
          url: "/api/moving",
          list_create: "/handler-CR-moving",
          find_one: "/handler-R-moving/",
          find_one_owner: "/handler-R-moving-by-owner/",
          set_response: "/handler-CU-moving-response/",
          list_admin: "/handler-R-moving-admin-complex",
          find_one_admin: "/handler-R-moving-by-reply-admin/",
          list_authorized: "/handler-R-moving-complex-authorized",
        },
        municipality: {
          url: "/api/municipality",
          list: "/handler-R-municipality/",
        },
        paths_to: {
          url: "/api/paths-to",
          set_path_to: "/set-paths-to/",
        },
        pets: {
          url: "/api/pet",
          list_create: "/handler-CR-pets",
          get_data_form: "/handler-R-data-form",
          find_upd_del: "/handler-RUD-pet",
        },
        service_plans: {
          url: "/api/service-plans",
          list_all: "/handler-R-list-all",
          create: "/handler-C-create",
          find_upd_del: "/handler-RUD-service-plans/",
          get_data_to_set: "/handler-R-data-set-complex-to-plan-service",
        },
        pqrs: {
          url: "/api/pqrs",
          get_data_form: "/handler-R-pqrs-data-form",
          list_create: "/handler-CR-pqrs",
          find_upd: "/handler-RU-pqrs/",
          list_admin: "/handler-R-pqrs-admin/",
          find_upd_reply: "/handler-RU-pqrs-reply/",
        },
        roles: {
          url: "/api/roles",
          list_create: "/handdler-CR-rol",
          find_upd_del: "/handdler-RUDD-rol/",
          find_roles_complex: "/handler-R-roles-to-complex-users",
          find_roles_apartment: "/handler-R-roles-to-apartment-users",
        },
        segmentation_advertisement: {
          url: "/api/segmentation-advertisement",
          set: "/handdler-SET-segmentation_advertisements/",
        },
        status: {
          url: "/api/status",
          list_all: "/handdler-R-status-list",
          find_one: "/handdler-R-status-one/",
          types: {
            VAR_STATUS_TO_STATUS: "status",
            VAR_STATUS_TO_APARMENT_USER: "status_aparment_user",
            VAR_STATUS_TO_APARMENT_COMPLEX: "status_apartment_complex",
            VAR_STATUS_TO_RESIDENTIAL_COMPLEX: "status_residential_complex",
            VAR_STATUS_TO_TOWER_COMPLEX: "status_tower_complex",
            VAR_STATUS_TO_ADVERTISEMENT: "status_tower_advertisement",
            VAR_STATUS_TO_PLAN_AND_SERVICE: "plans_and_services_status",
            VAR_STATUS_TO_MOVING: "moving_status",
          },
        },
        tower: {
          url: "/api/tower-complex",
          create: "/handdler-C-tower-complex",
          list_all: "/handdler-R-tower-complex/",
          find_upd_del: "/handdler-RUD-tower-complex/",
          tower_apartment: "/handler-R-tower-apartment",
        },
        type_vehicle: {
          url: "/api/type-vehicles",
          list: "/handler-R-types-vehicle",
        },
        user: {
          url: "/api/user",
          find_upd: "/handler-RU-user-perfil/",
        },
        user_roles: {
          url: "/api/user-roles",
          find_upd_del: "/handler-D-user-roles/",
        },
        user_to_register: {
          url: "/api/user-to-register",
          create: "/handdler-C-user-to-register",
          find_one: "/handdler-R-user-to-register",
          delete: "/handler-D-user-to-register/",
        },
        uploads: {
          url: "/uploads/",
        },
        validate: {
          url: "/validate",
        },
        token: {
          url: "/api/token",
          token_ua: "/handdler-R-token-ua",
        },
        vehicles: {
          url: "/api/vehicles",
          create_list: "/handler-CR-vehicles",
          find_upd_del: "/handler-RUD-vehicles/",
          consult_list: "/handler-R-vehicles-consult",
        },
      },
      encrypt: {
        APPLICATION_WEB_ENCRYPT:
          "#v^h~7~#w6KW8C5R`Aq~GDcg8BwucoiF%87mgRQhLD&gSWw~^4y3ZZn^Np$CRzB7",
        TOKEN_WEB_ENCRYPT:
          "lkamsoio%SECRET_pROj3apy8_T#T6a#kA*xVKx!LuB8mbKLeoQe96^Xey8_T#T6apiimasd@%&/asijdnias=&/(/()?¡?¡oasikmdaosd)iF%87mgRQ",
      },
      request: {
        application_type: "application/web",
      },
    },
    variables: {
      user_id_test: 2,
      type_application_web: "application/web",
      roles: {
        SUAG: {
          id: 1,
          name: "Super usuario administrador general",
        },
        UAG: {
          id: 2,
          name: "Usuario Administrativo General",
        },
        SUAC: {
          id: 3,
          name: "Super administrador",
        },
        UAC: {
          id: 4,
          name: "Administrador",
        },
        UPA: {
          id: 5,
          name: "Propietario",
        },
        UEA: {
          id: 6,
          name: "Arrendatario",
        },
        UEV: {
          id: 7,
          name: "Vigilante",
        },
        UA: {
          id: 8,
          name: "Usuario Anónimo",
        },
        UPB: {
          id: 9,
          name: "Propietario Básico",
        },
        UFP: {
          id: 10,
          name: "Usuario Familiar Propietario",
        },
        FPB: {
          id: 11,
          name: "Familiar Propietario Básico",
        },
      },
    },
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
};

module.exports = nextConfig;
