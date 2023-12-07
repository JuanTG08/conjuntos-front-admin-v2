import TitlePage from "@/components/data/title";
import HeaderPage from "@/components/views/partials/HeaderPage";
import { CONST_IMAGE_DEFAULT_NOT_IMAGE } from "@/constants/images.constant";
import { AdvertisementController } from "@/controller/advertisement.controller";
import { DateUtils } from "@/utils/date.utils";
import { FilesUtils } from "@/utils/files.utils";
import { TokenUtils } from "@/utils/token.utils"; 
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { Image, Typography } from "antd";
import React from "react";
const { Paragraph, Title } = Typography;

const ViewOneAdvertisement = ({ advertisement }) => {
  return (
    <div className="container mx-auto">
      <HeaderPage title={advertisement.title} />
      <Card className="py-4">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">
            {DateUtils.getDateInLettersSpanish(advertisement.createdAt)}
          </p>
          <Title className="uppercase mt-2" level={3}>
            {advertisement.title}
          </Title>
          <Paragraph>{advertisement.description}</Paragraph>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            src={
              advertisement?.management_files
                ? FilesUtils.formatGetImages(
                    advertisement.management_files.name_file
                  )
                : CONST_IMAGE_DEFAULT_NOT_IMAGE
            }
            className="w-auto"
          />
        </CardBody>
      </Card>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  try {
    const getCookies = TokenUtils.destructureAllCookiesClient(ctx);
    const { idAdvertisement } = ctx.query;
    const getAdvertisement =
      await AdvertisementController.apiSSRGetOneAdvertisementToView(
        getCookies,
        idAdvertisement
      );
    if (getAdvertisement.error || getAdvertisement.statusCode != 200)
      throw new Error("Unauthorized");
    return {
      props: {
        advertisement: getAdvertisement.payload,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
};

export default ViewOneAdvertisement;
