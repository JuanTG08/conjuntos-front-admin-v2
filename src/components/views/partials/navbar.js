import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
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
import Utils from "@/helpers/helpers";
import { Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import LogoAviv from "@/components/logos/LogoAviv";

export function MenuNavBarPages({ dataUser }) {
  const { user } = useUser();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  if (!dataUser.session) return <></>;
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
            {dataUser?.user?.navBar?.map((routeMain, indMain) => (
              <ListboxSection key={indMain} title={routeMain.label} showDivider>
                {routeMain?.navigation_bar_sub?.length > 0 ? (
                  routeMain?.navigation_bar_sub.map((routeSub, indJ) => (
                    <ListboxItem
                      key={indJ}
                      as={Link}
                      href={routeSub.link}
                      description={routeSub.description}
                      startContent={NavbarUtils.getIcon(routeSub?.icon)(
                        Utils.getToColorList(indJ)
                      )}
                      textvalue={<></>}
                      onPress={onClose}
                    >
                      {routeSub.label}
                    </ListboxItem>
                  ))
                ) : (
                  <ListboxItem
                    key={indMain}
                    as={Link}
                    href={routeMain.link}
                    description={routeMain.description}
                    startContent={NavbarUtils.getIcon(routeMain?.icon)(
                      Utils.getToColorList(indMain)
                    )}
                    textvalue={<></>}
                    onPress={onClose}
                  >
                    {routeMain.label}
                  </ListboxItem>
                )}
              </ListboxSection>
            ))}
          </Listbox>
        </Drawer>
      </NavbarContent>

      <NavbarBrand>
        <LinkNextUI as={Link} href={"/"} className="flex gap-2">
          <figure className="w-[100px]">
            <LogoAviv />
          </figure>
        </LinkNextUI>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {dataUser?.user?.navBar?.map((routeMain, indMain) =>
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
                  {routeMain?.navigation_bar_sub?.map((routeSub, indJ) => (
                    <DropdownItem
                      as={Link}
                      href={routeSub?.link}
                      key={indJ}
                      description={routeSub?.caption}
                      startContent={NavbarUtils.getIcon(routeSub?.icon)(
                        Utils.getToColorList(indJ)
                      )}
                    >
                      {routeSub?.label}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          ) : (
            <NavbarItem key={indMain}>
              <LinkNextUI as={Link} href={routeMain?.link} color="red">
                {routeMain?.label}
              </LinkNextUI>
            </NavbarItem>
          )
        )}
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
    </Navbar>
  );
}
