import { ChevronDownIcon } from "@/components/Icons/ChevronDownIcon";
import TitlePage from "@/components/data/title";
import ButtonCreateNew from "@/components/views/partials/ButtonCreateNew";
import HeaderPage from "@/components/views/partials/HeaderPage";
import { NavBarController } from "@/controller/nav_bar.controller";
import Utils from "@/helpers/helpers";
import { NavbarUtils } from "@/utils/navbar.utils";
import { TokenUtils } from "@/utils/token.utils";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link as LinkNextUI,
  Card,
  CardHeader,
  CardBody,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const ViewNavBarList = ({ navBars }) => {
  return (
    <>
      <HeaderPage title={"Barras de Navegación"} />
      <TitlePage>Barras de Navegación</TitlePage>
      <ButtonCreateNew href="/admin/nav_bar/create" value="Crear barra de navegación" />
      <Accordion defaultExpandedKeys={["0"]} className="">
        {navBars.map((navBar, indNavBar) => (
          <AccordionItem key={indNavBar} title={navBar?.name}>
            {navBar.role_plan_navigation.map((role_navigation, ind) => (
              <Card key={ind}>
                <CardHeader>
                  <h3>
                    {role_navigation?.roles?.name} (
                    {role_navigation?.roles.name_abbreviation})
                  </h3>
                  <p>{role_navigation?.navigation_bar?.name}</p>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                  <Button
                    color="primary"
                    size="lg"
                    className="w-full"
                    as={Link}
                    href={`/admin/nav_bar/${role_navigation?.navigation_bar?.id_navigation_bar}`}
                  >
                    Editar
                  </Button>
                  <Navbar isBordered className="bg-primary-50">
                    <NavbarContent
                      className="flex gap-4 w-full"
                      justify="center"
                    >
                      {role_navigation?.navigation_bar?.navigation_bar_main?.map(
                        (routeMain, indMain) =>
                          routeMain?.navigation_bar_sub?.length > 0 ? (
                            <NavbarItem key={indMain}>
                              <Dropdown>
                                <DropdownTrigger>
                                  <Button
                                    className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                                    endContent={<ChevronDownIcon />}
                                    radius="sm"
                                    variant="light"
                                    color="primary"
                                  >
                                    {routeMain?.label}
                                  </Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                  aria-label="Menu"
                                  className="w-[340px]"
                                  itemClasses={{
                                    base: "gap-4",
                                  }}
                                >
                                  {routeMain?.navigation_bar_sub?.map(
                                    (routeSub, indJ) => (
                                      <DropdownItem
                                        as={Link}
                                        href={routeSub?.link || ""}
                                        key={indJ}
                                        description={routeSub?.caption}
                                        startContent={NavbarUtils.getIcon(
                                          routeSub?.icon
                                        )(Utils.getToColorList(indJ))}
                                      >
                                        {routeSub?.label}
                                      </DropdownItem>
                                    )
                                  )}
                                </DropdownMenu>
                              </Dropdown>
                            </NavbarItem>
                          ) : (
                            <NavbarItem key={indMain}>
                              <LinkNextUI
                                as={Link}
                                href={routeMain?.link || ""}
                                color="red"
                              >
                                {routeMain?.label}
                              </LinkNextUI>
                            </NavbarItem>
                          )
                      )}
                    </NavbarContent>
                  </Navbar>
                </CardBody>
              </Card>
            ))}
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    // Obtenemos todas las cookies para hacer peticiones al backend
    const getCookies = TokenUtils.destructureAllCookiesClient(context);
    // Obtenemos los datos
    const getData = await NavBarController.apiSSRGetAll(getCookies);
    return {
      props: {
        navBars: getData.payload || [],
      },
    };
  } catch (error) {
    console.log(error);
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
}

export default ViewNavBarList;
