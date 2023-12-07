import TitlePage from "@/components/data/title";
import ConfigurationRoleCaption from "@/components/views/configuration/role/ConfigurationRoleCaption";
import ConfigurationRoleFormComponent from "@/components/views/configuration/role/ConfigurationRoleFormComponent";
import HeaderPage from "@/components/views/partials/HeaderPage";
import { useUser } from "@/context/UserContext";
import { Card, CardBody } from "@nextui-org/react";
import React from "react";

const SettingRole = () => {
  const { user } = useUser();

  const onSubmitChangeRole = (values) => {
    try {
      console.log(values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <HeaderPage title={"Cambiar Rol"} />
      <TitlePage>Cambiar Rol</TitlePage>
      <ConfigurationRoleCaption
        complex={user?.user?.complex}
        tower={user?.user?.tower}
        apartment={user?.user?.apartment}
        mainRole={user?.user?.mainRole}
      />
      <Card className="my-3">
        <CardBody>
          <ConfigurationRoleFormComponent
            roles={user?.user?.userRoles || []}
            valuesToForm={{ role: user?.user?.mainRole?.idRole }}
            onSubmit={onSubmitChangeRole}
          />
        </CardBody>
      </Card>
    </>
  );
};

export default SettingRole;
