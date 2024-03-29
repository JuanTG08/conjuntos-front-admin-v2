import TitlePage from "@/components/data/title";
import ButtonCreateNew from "@/components/views/partials/ButtonCreateNew";
import HeaderPage from "@/components/views/partials/HeaderPage";
import { PetsController } from "@/controller/pets.controller";
import { PetUtils } from "@/utils/pet.utils";
import { TokenUtils } from "@/utils/token.utils";
import { Image } from "@nextui-org/react";
import { Card, Empty, Typography, message } from "antd";
import React, { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Link from "next/link";

const ViewPets = ({ pets }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [_pets, setPets] = useState(pets);
  const deletePet = async (idPet) => {
    try {
      const deleted = await PetsController.viewDeletePet(idPet);
      if (deleted.error || deleted.statusCode != 200)
        return messageApi.warning(deleted.message);
      setPets((prevPets) => prevPets.filter((pet) => pet.id_pet !== idPet));
      messageApi.success("Mascota eliminada correctamente");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {contextHolder}
      <HeaderPage title="Tus mascotas" />
      <TitlePage>Tus mascotas</TitlePage>
      <ButtonCreateNew href={"/pets/create"} value="Añade tus mascotas" />
      {_pets.length === 0 && <Empty description="No tienes mascotas" />}
      <div className="gap-2 grid grid-cols-1 sm:grid-cols-4">
        {_pets.map((pet, index) => (
          <Card
            key={index}
            title={pet.name}
            extra={
              <div className="flex items-center">
                <div
                  className={`w-4 h-4 mr-2`}
                  style={{ backgroundColor: "#" + pet?.pet_colors?.hex_code }}
                ></div>
                <span className="flex-grow">{pet?.pet_colors?.color_name}</span>
              </div>
            }
            cover={
              <Image
                alt={pet.name}
                src={PetUtils.defineUrlImagePet(
                  pet?.type_pet,
                  pet?.management_files?.name_file
                )}
                className="w-full object-contain h-[200px]"
                width="100%"
                height="200"
              />
            }
            actions={[
              <Link href={`/pets/edit/${pet.id_pet}`}>
                <EditOutlined
                  key="edit"
                  style={{ fontSize: "1.5em", color: "#086ADA" }}
                />
              </Link>,
              <DeleteOutlined
                key="delete"
                style={{ fontSize: "1.5em", color: "red" }}
                onClick={() => deletePet(pet.id_pet)}
              />,
            ]}
          >
            <Typography.Title level={3}>{pet.name}</Typography.Title>
            {`${pet.type_pets.name} (${
              pet.breed_pets.name
            }), ${PetUtils.getGender(pet.gender)}`}
          </Card>
        ))}
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    // Obtenemos todas las cookies para hacer peticiones al backend
    const getCookies = TokenUtils.destructureAllCookiesClient(context);
    // Obtenemos el listado de mascotas
    const getData = await PetsController.apiSSRGetPetsToApartment(getCookies);
    if (getData.error || getData.statusCode != 200)
      throw new Error("No fue posible obtener los datos");
    return {
      props: {
        pets: getData.payload || [],
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

export default ViewPets;
