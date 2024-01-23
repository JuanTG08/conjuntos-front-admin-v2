import TitlePage from "@/components/data/title";
import { CONST_ADVERTISEMENT_STATUS } from "@/constants/advertisement.constant";
import { AdvertisementController } from "@/controller/advertisement.controller";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
} from "@nextui-org/react";
import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import { CheckOutlined } from "@ant-design/icons";
import { Empty, Popconfirm, message } from "antd";
import { CorrespondenceController } from "@/controller/correspondence.controller";
import { ChevronDownIcon } from "@/components/Icons/ChevronDownIcon";
import AdvertisementCorrespondeceFilterLockerFormComponent from "@/components/views/advertisement/correspondence/AdvertisementCorrespondeceFilterLockerFormComponent";
import { TowerController } from "@/controller/tower.controller";
import HeaderPage from "@/components/views/partials/HeaderPage";
import { FilesUtils } from "@/utils/files.utils";
import { DateUtils } from "@/utils/date.utils";

const statusOptions = [
  {
    name: "En espera",
    uid: CONST_ADVERTISEMENT_STATUS.WAITING_DELIVERY.id,
    color: "warning",
  },
  {
    name: CONST_ADVERTISEMENT_STATUS.DELIVERED.name,
    uid: CONST_ADVERTISEMENT_STATUS.DELIVERED.id,
    color: "success",
  },
];

const CorrespondenceList = ({ dataUser }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [correspondences, setCorrespondences] = useState([]);
  const [correspondencesFiltered, setCorrespondencesFiltered] = useState([]);
  const [statusFilter, setStatusFilter] = useState(
    new Set([CONST_ADVERTISEMENT_STATUS.WAITING_DELIVERY.id.toString()])
  );

  const [towers, setTowers] = useState([]);

  useEffect(() => {
    fetchTowerData();
  }, []);

  useEffect(() => {
    setCorrespondencesFiltered([]);
    if (correspondences.length === 0) return;
    const correspondencesFiltered = correspondences.filter((corres) =>
      statusFilter.has(
        corres.status_advertisement.id_status_advertisement.toString()
      )
    );
    setCorrespondencesFiltered(correspondencesFiltered);
  }, [correspondences, statusFilter]);

  const fetchTowerData = async () => {
    try {
      const listTowers = await TowerController.viewGetListAll();
      if (listTowers.errror || listTowers.statusCode != 200)
        return console.log(listTowers.message);
      setTowers(listTowers.payload.towers);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitSearchCorrespondences = async (values) => {
    try {
      const listCorrespondences =
        await AdvertisementController.viewGetListCorrespondences(values);
      setCorrespondences([]);
      if (listCorrespondences.error || listCorrespondences.statusCode != 200)
        return messageApi.warning(
          "No se encontró correspondencias para la unidad seleccionado."
        );
      setCorrespondences(listCorrespondences.payload);
    } catch (error) {
      console.log(error);
    }
  };

  const changeCheckCorrespondence = async (idCorrespondence) => {
    try {
      const setChangeCheck =
        await CorrespondenceController.viewChangeCheckCorrespondenceToDelivered(
          idCorrespondence
        );
      if (setChangeCheck.error || setChangeCheck.statusCode !== 200)
        return messageApi(setChangeCheck.message);
      setCorrespondences((lastCorrespondences) =>
        lastCorrespondences.map((corres) => {
          if (corres.id_advertisement !== idCorrespondence) return corres;
          corres.status_advertisement.id_status_advertisement =
            CONST_ADVERTISEMENT_STATUS.DELIVERED.id;
          return corres;
        })
      );
      messageApi.success("La correspondencia se ha entregado.");
      return false;
    } catch (error) {
      console.log(error);
    }
  };

  const RenderedListCorrespondence = () => {
    if (correspondencesFiltered.length === 0) return <Empty />;
    return (
      <div className="gap-2 grid grid-cols-1 xl:grid-cols-2">
        {correspondencesFiltered.map((item, index) => (
          <Card
            key={index}
            isBlurred
            className="border-none bg-background/60 dark:bg-default-100/50 max-w-full p-0"
            radius="none"
          >
            <CardBody className="p-0">
              <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                <div className="relative col-span-6 md:col-span-4">
                  <Image
                    alt="Album cover"
                    className="object-cover"
                    height={200}
                    src={
                      item?.management_files
                        ? FilesUtils.formatGetImages(
                            item.management_files.name_file
                          )
                        : "/images/noPackage.png"
                    }
                    width="100%"
                    radius="none"
                    style={{ maxHeight: "200px", height: 200 }}
                  />
                </div>
                <div className="flex flex-col col-span-6 md:col-span-8 w-full h-full">
                  <Card className="h-full" radius="none">
                    <CardHeader className="justify-between">
                      <div className="flex gap-5">
                        <div className="flex flex-col gap-1 items-start justify-center">
                          <h4 className="text-small font-semibold leading-none text-default-600">
                            {`${item.users.name} ${item.users.last_name}`}
                          </h4>
                        </div>
                      </div>

                      {item.status_advertisement.id_status_advertisement ===
                      CONST_ADVERTISEMENT_STATUS.WAITING_DELIVERY.id ? (
                        <Popconfirm
                          title="Entregar"
                          description="¿Estás seguro de que deseas marcar como entregado?"
                          onConfirm={() =>
                            changeCheckCorrespondence(item.id_advertisement)
                          }
                          okButtonProps={{
                            className: "bg-danger",
                          }}
                        >
                          <Button
                            isIconOnly
                            radius="full"
                            variant="bordered"
                            color="warning"
                            size="md"
                          >
                            <CheckOutlined radius="full" size="md" />
                          </Button>
                        </Popconfirm>
                      ) : (
                        <Button
                          isIconOnly
                          radius="full"
                          variant="shadow"
                          color="success"
                          size="md"
                          className="text-white"
                          onClick={() =>
                            messageApi.success("Correspondencia ya entregada.")
                          }
                        >
                          <CheckOutlined radius="full" size="md" />
                        </Button>
                      )}
                    </CardHeader>
                    <CardBody className="px-3 py-0 text-small text-default-800">
                      <h3 className="font-bold text-foreground/90">
                        {item.title}
                      </h3>
                      <span className="pt-2">{item.description}</span>
                      <Divider />
                      <h4 className="font-semibold text-foreground/60">
                        {item?.segmentation_advertisement?.map(
                          (seg) =>
                            `${seg.tower_complex.tower_name} - ${seg.apartment_complex.apartment_identifier_tower}`
                        )}
                      </h4>
                      <Divider />
                      <h5 className="font-semibold text-foreground/80">
                        {DateUtils.getDateInLettersSpanish(item.createdAt)}
                      </h5>
                    </CardBody>

                    <CardFooter>
                      {item.status_advertisement.id_status_advertisement ===
                      CONST_ADVERTISEMENT_STATUS.WAITING_DELIVERY.id ? (
                        <Chip color="warning">En espera</Chip>
                      ) : (
                        <Chip color="success">Entregado</Chip>
                      )}
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    );
  };

  const selectedValue = useMemo(() => {
    const _status = statusOptions
      .filter((status) => statusFilter.has(status.uid.toString()))
      .map((status) => status.name);
    return Array.from(_status).join(", ").replaceAll("_", " ");
  }, [statusFilter]);

  const FilterComponent = () => {
    return (
      <div className="flex flex-col gap-4 my-2">
        <div className="flex justify-between gap-3 items-end">
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="lg"
                  variant="flat"
                  color="default"
                >
                  {selectedValue}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="single"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem
                    key={status.uid}
                    className="capitalize"
                    color={status.color}
                  >
                    {status.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <HeaderPage title={"Correspondencias"} />
      {contextHolder}
      <TitlePage level={2}>Listado de Correspondencia</TitlePage>
      <Card className="my-3">
        <CardBody>
          <AdvertisementCorrespondeceFilterLockerFormComponent
            towers={towers}
            onSubmit={onSubmitSearchCorrespondences}
          />
        </CardBody>
      </Card>
      {correspondences.length > 0 ? (
        <Card>
          <CardBody>
            <FilterComponent />
            <RenderedListCorrespondence />
          </CardBody>
        </Card>
      ) : (
        <></>
      )}
    </>
  );
};

export default CorrespondenceList;
