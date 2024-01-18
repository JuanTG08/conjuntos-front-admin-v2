import { AdvertisementController } from "@/controller/advertisement.controller";
import { Image, Card as CardNextUI } from "@nextui-org/react";
import { Card, Typography } from "antd";
const { Title, Paragraph } = Typography;
import HeaderPage from "@/components/views/partials/HeaderPage";
import { FilesUtils } from "@/utils/files.utils";
import { TokenUtils } from "@/utils/token.utils";
import { useRouter } from "next/router";
import { CONST_IMAGE_DEFAULT_NOT_IMAGE } from "@/constants/images.constant";

const DashboardIndex = ({ advertisements }) => {
  const router = useRouter();
  const RenderAdvertisements = () => {
    return (
      <>
        {advertisements.map((advertisement) => (
          <div
            key={advertisement.id_advertisement}
            style={{ marginTop: ".8em" }}
          >
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
                    placeholder="blur"
                    height={200}
                    src={
                      advertisement?.management_files
                        ? FilesUtils.formatGetImages(
                            advertisement.management_files.name_file
                          )
                        : CONST_IMAGE_DEFAULT_NOT_IMAGE
                    }
                    width="100%"
                    style={{ maxHeight: "200px" }}
                  />
                </div>
              }
            >
              <Title level={3} strong>
                {advertisement.title}
              </Title>
              <Paragraph
                ellipsis={{
                  rows: 4,
                }}
                style={{ marginBottom: 0 }}
              >
                {advertisement.description}
              </Paragraph>
            </CardNextUI>
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      <HeaderPage title={"Inicio"} />
      <div className="gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        <RenderAdvertisements />
      </div>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  try {
    const getCookies = TokenUtils.destructureAllCookiesClient(ctx);
    const getAdvertisements =
      await AdvertisementController.apiGetListAdvertisementToDashboard(
        getCookies
      );
    if (getAdvertisements.error) throw new Error("Unauthorized");
    const advertisements = getAdvertisements.payload
      ? getAdvertisements.payload
      : [];
    return {
      props: {
        advertisements,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
};

export default DashboardIndex;
