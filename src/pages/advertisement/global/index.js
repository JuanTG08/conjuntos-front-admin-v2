import TitlePage from "@/components/data/title";
import { CONST_ADVERTISEMENT_CATEGORY } from "@/constants/advertisement.constant";
import { AdvertisementController } from "@/controller/advertisement.controller";
import { Image, Skeleton, Card as CardNextUI } from "@nextui-org/react";
import { Card, Empty, Typography, message } from "antd";
import React, { useEffect, useState } from "react";
const { Title, Text } = Typography;
import HeaderPage from "@/components/views/partials/HeaderPage";
import { FilesUtils } from "@/utils/files.utils";
import { useRouter } from 'next/router';

const AdvertisementGlobal = () => {
  const [loading, setLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const [advertisements, setAdvertisements] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchListAdvertisementGlobal();
  }, []);

  const fetchListAdvertisementGlobal = async () => {
    try {
      const getList = await AdvertisementController.viewListAdvertisement(
        CONST_ADVERTISEMENT_CATEGORY.ADVERTISEMENT.ID
      );
      if (getList.error || getList.statusCode !== 200)
        return messageApi.error(getList.message);
      setLoading(false);
      setAdvertisements(getList.payload);
    } catch (error) {
      console.log(error);
    }
  };

  const RenderAdvertisements = () => {
    if (loading)
      return (
        <Card
          className="w-full"
          cover={
            <div style={{ height: "200px" }}>
              <Skeleton
                className="rounded-lg"
                style={{
                  height: "200px",
                }}
              >
                <div className="h-24 rounded-lg bg-default-300"></div>
              </Skeleton>
            </div>
          }
        >
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
              <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-2/5 rounded-lg">
              <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
            </Skeleton>
          </div>
        </Card>
      );
    if (advertisements.length === 0) return <Empty />;
    return advertisements.map((advertisement, index) => (
      <div key={advertisement.id_advertisement} style={{ marginTop: ".8em" }}>
        <CardNextUI
          isPressable
          as={Card}
          onPress={() =>
            router.push(`/advertisement/${advertisement.id_advertisement}`)
          }
          className="w-full"
          cover={
            <div style={{ height: "200px" }}>
              <Image
                alt="Album cover"
                className="object-cover"
                height={200}
                src={
                  advertisement?.management_files
                    ? FilesUtils.formatGetImages(
                        advertisement.management_files.name_file
                      )
                    : "/images/noPackage.png"
                }
                width="100%"
                style={{ maxHeight: "200px", height: "200px" }}
              />
            </div>
          }
        >
          <Title level={3} strong>
            {advertisement.title}
          </Title>
          <Text>{advertisement.description}</Text>
        </CardNextUI>
      </div>
    ));
  };

  return (
    <>
      <HeaderPage title={"Anuncios"} />
      {contextHolder}
      <TitlePage level={2}>Anuncios</TitlePage>

      <div className="gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        <RenderAdvertisements />
      </div>
    </>
  );
};

export default AdvertisementGlobal;
