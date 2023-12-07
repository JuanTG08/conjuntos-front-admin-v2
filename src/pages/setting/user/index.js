import TitlePage from "@/components/data/title";
import ConfigurationUserFormComponent from "@/components/views/configuration/user/ConfigurationUserFormComponent";
import HeaderPage from "@/components/views/partials/HeaderPage";
import { useUser } from "@/context/UserContext";
import { UserController } from "@/controller/user.controller";
import { Skeleton, Space, message } from "antd";
import React, { useEffect, useState } from "react";

const UserSettings = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { user, setUser } = useUser();
  const [dataUser, setDataUser] = useState();
  const [dataSelect, setDataSelect] = useState();
  useEffect(() => {
    fetchDataUser();
  }, []);

  const fetchDataUser = async () => {
    try {
      const dataUserProfile = await UserController.viewGetUserInfo();
      if (dataUserProfile.error || dataUserProfile.statusCode !== 200)
        return console.log(dataUserProfile.message);
      setDataUser(dataUserProfile.payload.user);
      setDataSelect(dataUserProfile.payload.dataSelect);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitUpdateUser = async (values) => {
    try {
      const sendData = await UserController.viewPutEdit(values);
      if (!sendData.error && sendData.statusCode === 200) {
        const updateUser = {
          ...user,
        };
        updateUser.user.name = sendData.payload.name;
        updateUser.user.lastName = sendData.payload.last_name;
        updateUser.user.fullName = `${sendData.payload.name} ${sendData.payload.last_name}`;
        updateUser.user.profilePicture =
          sendData.payload.management_files_users_id_profile_pictureTomanagement_files;
        setUser(updateUser);
        fetchDataUser();
        return messageApi.success("Se actualizó correctamente");
      }
      messageApi.error(sendData.message);
    } catch (error) {
      console.log(error);
      messageApi.error("Error al actualizar");
    }
  };

  const RenderedFormUser = () => {
    if (!dataUser)
      return (
        <>
          <div className="w-full">
            <Skeleton active paragraph={{ rows: 6 }} />
          </div>
        </>
      );
    return (
      <ConfigurationUserFormComponent
        onSubmit={onSubmitUpdateUser}
        valuesToForm={UserController.viewGetDataToFormUserToRegister(dataUser)}
        typesIdentification={dataSelect.typesIdentification}
        departamentos={dataSelect.departments}
        genders={dataSelect.genders}
      />
    );
  };

  return (
    <>
      {contextHolder}
      <HeaderPage title={"Configuración de tu cuenta"} />
      <TitlePage>Configuración de tu cuenta</TitlePage>
      <RenderedFormUser />
    </>
  );
};

export default UserSettings;
