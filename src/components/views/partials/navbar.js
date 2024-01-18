import React, { useMemo, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenu,
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
  Avatar,
  Link as LinkNextUI,
  User,
  ListboxSection,
  Listbox,
  ListboxItem,
} from "@nextui-org/react";
import Link from "next/link";
import {
  LoginOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { ChevronDownIcon } from "@/components/Icons/ChevronDownIcon";
import { useUser } from "@/context/UserContext";
import { signOut, useSession } from "next-auth/react";
import { NavbarUtils } from "@/utils/navbar.utils";
import { useRouter } from "next/router";
import Utils from "@/helpers/helpers";
import { Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import LogoAviv from "@/components/logos/LogoAviv";

export function MenuNavBarPages({ dataUser }) {
  const { user } = useUser();
  const router = useRouter();
  const { data: session, status } = useSession();
  const navBarData = useMemo(
    () => NavbarUtils.getNavbarUser(dataUser.idRole),
    []
  );
  const [open, setOpen] = useState(false);
  const handleMenuItemClick = (url) => {
    setIsMenuOpen(false);
    router.push(url);
  };
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  let indColor = 0;
  return (
    <Navbar isBordered>
      <NavbarContent className="sm:hidden" justify="start">
        <Button
          isIconOnly
          variant="none"
          disableRipple
          endContent={<MenuOutlined style={{ fontSize: "2em" }} />}
          onClick={showDrawer}
        />
        <Drawer
          title={
            dataUser?.user?.complex?.complex_name ||
            "Hacia Tu Destino Residencial"
          }
          placement="bottom"
          onClose={onClose}
          open={open}
        >
          <Listbox aria-label="Navbar to phones">
            {navBarData.routesNavbar.map((route, i) => {
              return (
                <ListboxSection key={i} title={route.label} showDivider>
                  {route?.children ? (
                    route.children.map((item, j) => (
                      <ListboxItem
                        key={j}
                        as={Link}
                        href={item.link}
                        description={item.description}
                        startContent={item.icon(
                          Utils.getToColorList(indColor++)
                        )}
                        textvalue={<></>}
                        onPress={onClose}
                      >
                        {item.label}
                      </ListboxItem>
                    ))
                  ) : (
                    <ListboxItem
                      key={i}
                      as={Link}
                      href={route.link}
                      description={route.description}
                      startContent={route.icon(
                        Utils.getToColorList(indColor++)
                      )}
                      textvalue={<></>}
                      onPress={onClose}
                    >
                      {route.label}
                    </ListboxItem>
                  )}
                </ListboxSection>
              );
            })}
          </Listbox>
        </Drawer>
      </NavbarContent>

      <NavbarBrand>
        <LinkNextUI as={Link} href={navBarData.mainPage} className="flex gap-2">
          <figure className="w-[30px]">
            <LogoAviv className="text-primary-500" />
          </figure>
          <p className="font-bold text-inherit">
            {process.env.NEXT_PUBLIC_NAME_APP}
          </p>
        </LinkNextUI>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {navBarData.routesNavbar.map((route, i) => {
          if (route.children)
            return (
              <Dropdown key={i}>
                <NavbarItem>
                  <DropdownTrigger>
                    <Button
                      disableRipple
                      className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                      endContent={<ChevronDownIcon />}
                      radius="sm"
                      variant="light"
                      color="primary"
                    >
                      {route.label}
                    </Button>
                  </DropdownTrigger>
                </NavbarItem>
                <DropdownMenu
                  aria-label="ACME features"
                  className="w-[340px]"
                  itemClasses={{
                    base: "gap-4",
                  }}
                >
                  {route.children.map((item, j) => (
                    <DropdownItem
                      as={Link}
                      href={item.link}
                      key={j}
                      description={item.description}
                      startContent={item.icon(Utils.getToColorList(j))}
                    >
                      {item.label}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            );
          return (
            <NavbarItem key={i}>
              <LinkNextUI as={Link} href={route.link} color="red">
                {route.label}
              </LinkNextUI>
            </NavbarItem>
          );
        })}
      </NavbarContent>
      <NavbarContent as="div" justify="end">
        {dataUser.session ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform bg-transparent"
                color="primary"
                src={
                  session && session?.user?.image
                    ? session?.user?.image
                    : "https://i.pravatar.cc/150?u=a042581f4e29026704d"
                }
                onError={(e) => {
                  console.log(e);
                  e.target.src =
                    "https://i.pravatar.cc/150?u=a042581f4e29026704d";
                }}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Acciones de Perfil" variant="flat">
              <DropdownItem
                isReadOnly={true}
                key="profile"
                className="h-14 gap-2 opacity-100"
                showDivider
                textValue={<></>}
              >
                <User
                  name={user?.user?.name || session?.user?.name}
                  description={
                    user?.user?.mainRole?.nameRole +
                    " - " +
                    (dataUser?.user?.complex?.complex_name || "None")
                  }
                  classNames={{
                    name: "text-default-600",
                    description: "text-default-500",
                  }}
                  avatarProps={{
                    size: "sm",
                    src:
                      session?.user?.image ||
                      "https://i.pravatar.cc/150?u=a042581f4e29026704d",
                  }}
                />
              </DropdownItem>
              <DropdownItem
                key="settings"
                startContent={<SettingOutlined />}
                description="Configuración de tu cuenta"
                as={Link}
                href="/setting/user"
              >
                Configuraciones
              </DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                className="text-danger"
                onPress={() => signOut()}
                startContent={<LogoutOutlined />}
              >
                Cerrar Sesión
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <NavbarItem>
            <Button
              color="primary"
              variant="flat"
              startContent={<LoginOutlined />}
              radius="sm"
              as={Link}
              href="/login"
            >
              Iniciar Sesión
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarMenu className="gap-0">
        {navBarData.routesNavbar.map((route, i) => {
          if (route.children)
            return route.children.map((item, j) => (
              <NavbarItem key={j}>
                <Button onClick={() => handleMenuItemClick(item.link)}>
                  {item.label}
                </Button>
              </NavbarItem>
            ));
          return (
            <NavbarItem key={i}>
              <Button onClick={() => handleMenuItemClick(route.link)}>
                {route.label}
              </Button>
            </NavbarItem>
          );
        })}
      </NavbarMenu>
    </Navbar>
  );
}
