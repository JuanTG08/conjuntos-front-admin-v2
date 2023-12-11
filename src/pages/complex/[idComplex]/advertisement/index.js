import ComplexViewPanelCaptionComponent from "@/components/views/complex/ComplexViewPanelCaptionComponent";
import { AdvertisementController } from "@/controller/advertisement.controller";
import { ComplexController } from "@/controller/complex.controller";
import Link from "next/link";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { CONST_ADVERTISEMENT_VALID_DATE } from "@/constants/advertisement.constant";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Badge, Card, Empty, Typography, message } from "antd";
const { Paragraph } = Typography;
import ButtonCreateNew from "@/components/views/partials/ButtonCreateNew";
import { Image, Skeleton } from "@nextui-org/react";
import HeaderPage from "@/components/views/partials/HeaderPage";
import { FilesUtils } from "@/utils/files.utils";
import { CONST_IMAGE_DEFAULT_NOT_IMAGE } from "@/constants/images.constant";

const AdvertisementIndex = ({ idComplex }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [complex, setComplex] = useState();
  const [advertisements, setAdvertisements] = useState(false);

  useEffect(() => {
    fetchOneComplex();
    fetchAdvertisements();
  }, []);

  const fetchOneComplex = async () => {
    try {
      const oneComplex = await ComplexController.viewOne(idComplex);
      if (!oneComplex.error && oneComplex.statusCode == 200) {
        setComplex(oneComplex.payload);
      } else {
        Router.push("/complex");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAdvertisements = async () => {
    try {
      const listAdvertisements =
        await AdvertisementController.viewListByComplex(idComplex);
      if (!listAdvertisements.error && listAdvertisements.statusCode == 200)
        return setAdvertisements(listAdvertisements.payload);
      else if (
        !listAdvertisements.error &&
        listAdvertisements.statusCode != 200
      )
        return setAdvertisements([]);
      else {
        setAdvertisements(undefined);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAdvertisement = async (advertisement) => {
    try {
      return;
      const resp = await AdvertisementController.viewDelete(
        advertisement.id_advertisement
      );
      if (!resp.error && resp.statusCode == 200) {
        setAdvertisements(
          advertisements.filter(
            (_adv) => !(_adv.id_advertisement == advertisement.id_advertisement)
          )
        );
        return messageApi.success(
          "Se eliminó correctamente el conjunto residencial"
        );
      }
      messageApi.error(resp.message);
    } catch (error) {
      messageApi.error("Error Interno");
    }
  };

  const RenderedAdvertisements = () => {
    if (advertisements === undefined) return <>Error...</>;
    if (advertisements.length == 0) return <Empty description="Sin anuncios" />;
    return (
      <>
        <div className="gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
          {advertisements === false && (
            <div style={{ marginTop: ".8em" }} className="w-full">
              <Card
                style={{
                  width: "100%",
                }}
                cover={
                  <Skeleton className="rounded-lg" style={{ height: 200 }}>
                    <div className="h-24 rounded-lg bg-default-300"></div>
                  </Skeleton>
                }
                actions={[
                  <div className="flex justify-center items-center w-full">
                    <Skeleton className="rounded-lg w-full text-center mx-5">
                      <div className="h-5 rounded-lg bg-default-200"></div>
                    </Skeleton>
                  </div>,
                ]}
                title={
                  <Skeleton className="rounded-lg w-full text-center">
                    <div className="h-5 rounded-lg bg-default-200"></div>
                  </Skeleton>
                }
              >
                <Skeleton className="rounded-lg w-full text-center">
                  <div className="h-5 rounded-lg bg-default-200"></div>
                </Skeleton>
              </Card>
            </div>
          )}
          {advertisements &&
            advertisements.map((advertisement) => (
              <div
                key={advertisement.id_advertisement}
                style={{ marginTop: ".8em" }}
                className="w-full"
              >
                <Card
                  style={{
                    width: "100%",
                  }}
                  cover={
                    <Image
                      src={
                        advertisement?.management_files
                          ? FilesUtils.formatGetImages(
                              advertisement.management_files.name_file
                            )
                          : CONST_IMAGE_DEFAULT_NOT_IMAGE
                      }
                      height={200}
                      width="100%"
                      radius="none"
                      style={{ maxHeight: "200px", height: 200 }}
                      alt="Imagen anuncio"
                      className="object-cover"
                    />
                  }
                  actions={[
                    <Link
                      href={`/complex/${idComplex}/advertisement/${advertisement.id_advertisement}`}
                    >
                      Editar <EditOutlined key="edit" />
                    </Link>,
                    <Link
                      href={`/advertisement/${advertisement.id_advertisement}`}
                    >
                      Ver <EyeOutlined />
                    </Link>,
                  ]}
                  title={advertisement.title}
                  extra={
                    <Badge
                      count={advertisement.status_advertisement?.status_name}
                      color={
                        advertisement.status_advertisement?.status_name ===
                        CONST_ADVERTISEMENT_VALID_DATE.LOADING
                          ? "orange"
                          : advertisement.status_advertisement?.status_name ===
                            CONST_ADVERTISEMENT_VALID_DATE.PROGRESS
                          ? "green"
                          : advertisement.status_advertisement?.status_name ===
                            CONST_ADVERTISEMENT_VALID_DATE.FINALIZED
                          ? "blue"
                          : "red"
                      }
                    />
                  }
                >
                  <Paragraph
                    ellipsis={{
                      rows: 4,
                    }}
                    style={{ marginBottom: 0 }}
                  >
                    {advertisement.description}
                  </Paragraph>
                </Card>
              </div>
            ))}
        </div>
      </>
    );
  };

  return (
    <>
      {contextHolder}
      <HeaderPage title={"Listado de anuncios"} />
      <div style={{ textAlign: "center" }}>
        <Typography.Title level={1} style={{ textAlign: "center" }}>
          Anuncios
        </Typography.Title>
        <p className="">Panel de administración de anuncios</p>
      </div>
      <ComplexViewPanelCaptionComponent complex={complex} />
      <ButtonCreateNew
        href={"/complex/" + idComplex + "/advertisement/AdvertisementCreate"}
        value="Crear anuncios"
      />
      <RenderedAdvertisements />
    </>
  );
};

export async function getServerSideProps(context) {
  const { idComplex } = context.query;
  return {
    props: {
      idComplex,
    },
  };
}

export default AdvertisementIndex;
