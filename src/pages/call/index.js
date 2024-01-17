import { TowerController } from "@/controller/tower.controller";
import { TokenUtils } from "@/utils/token.utils";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Listbox,
  ListboxItem,
  useDisclosure,
} from "@nextui-org/react";
import { Input, Empty, List } from "antd";
const { Search } = Input;
import React, { useEffect, useState } from "react";
import { PhoneOutlined } from "@ant-design/icons";
import { ApartmentComplexController } from "@/controller/apartment.controller";
import ModalCalling from "@/components/views/call/modal-calling";
import { CallController } from "@/controller/call.controller";
import Utils from "@/helpers/helpers";
import ChevronLeftIcon from "@/components/Icons/ChevronLeftIcon";
import HeaderPage from "@/components/views/partials/HeaderPage";

const CallPage = ({ apartments, tokenCall, tokenUser }) => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredTowers, setFilteredTowers] = useState([]);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [usersToApartment, setUsersToApartments] = useState([]);
  const [userCalling, setUserCalling] = useState(null);

  // Parametros de llamada
  const [device, setDevice] = useState();
  const [status, setStatus] = useState();
  const [ready, setReady] = useState();
  const [calling, setCalling] = useState(null);

  const {
    isOpen: isModalCalling,
    onOpen: onModalCalling,
    onOpenChange: onModalCallingChange,
    onClose: onCloseModalCalling,
  } = useDisclosure();

  useEffect(() => {
    const filtered = apartments.filter((apartment) =>
      apartment.name.toLocaleLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredTowers(filtered);
    initializeDevice();
  }, [searchValue]);

  const callUser = async (user) => {
    try {
      if (!device) throw new Error("No fue posible conectarse");
      const setCall = await makeOutgoingCall(user.id, device);

      setUserCalling(user);
      onModalCalling();
      // onCloseModalCalling();
    } catch (error) {
      console.log(error);
    }
  };

  const initializeDevice = async () => {
    // Initialization code for Twilio Device goes here
    try {
      const { token, identity } = tokenCall;
      const Device = (await import("twilio-client")).Device;
      const _device = new Device(token, {
        logLevel: 1,
        // Set Opus as our preferred codec. Opus generally performs better, requiring less bandwidth and
        // providing better audio quality in restrained network conditions.
        codecPreferences: ["opus", "pcmu"],
      });
      const respListener = addDeviceListeners(_device);
      if (respListener.error || respListener.statusCode != 200)
        return respListener; // Retornamos algún
      setReady(true);
      return respListener;
    } catch (error) {
      alert(`error ${error}`);
      console.log(error);
    }
  };

  const addDeviceListeners = (_device) => {
    try {
      _device.on("registered", () => {
        console.log("Twilio.Device Ready to make and receive calls!");
        setStatus("Registered");
        setReady(true);
      });

      _device.on("error", (error) => {
        console.log("Twilio.Device Error:", error.message);
        setStatus("Error");
        setReady(false);
      });

      _device.on("incoming", handleIncomingCall);

      setDevice(_device);
      return Utils.Message(false, 200, "Ok", _device);
    } catch (error) {
      console.log(error);
      return Utils.Message(true, 500, "Error al intentar conectarse");
    }
  };

  const handleIncomingCall = (call) => {
    try {
      console.log("Incoming call from", call.parameters.From);
      setStatus("Calling");
      setReady(true);
      setCalling(call);

      // add event listener to call object
      call.on("cancel", handleDisconnectedIncomingCall);
      call.on("disconnect", handleDisconnectedIncomingCall);
      call.on("reject", handleDisconnectedIncomingCall);
    } catch (error) {
      setCalling(null);
      console.log(error);
    }
  };

  const handleDisconnectedIncomingCall = () => {
    try {
      console.log("Incoming call ended.");
      setCalling(null);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   *
   * @param {number} idUserToCall
   *
   */
  const makeOutgoingCall = async (idUserToCall, _device) => {
    try {
      const params = {
        To: idUserToCall,
        mainRoleToken: tokenUser.mainRoleToken,
        userDataToken: tokenUser.userDataToken,
      };
      if (_device) {
        console.log("Intentando llamar a", idUserToCall);
        console.log(params);
        const call = await _device.connect(params);
        setCalling(call);

        // add listeners to the Call
        // "accepted" means the call has finished connecting and the state is now "open"
        call.on("accept", updateUIAcceptedOutgoingCall);
        call.on("disconnect", updateUIDisconnectedOutgoingCall);
        call.on("cancel", updateUIDisconnectedOutgoingCall);
      }
    } catch (error) {
      setCalling(null);
      console.log(error);
    }
  };

  const updateUIAcceptedOutgoingCall = (call) => {
    try {
      bindVolumeIndicators(call);
    } catch (error) {
      setCalling(null);
      console.log(error);
    }
  };

  const updateUIDisconnectedOutgoingCall = () => {
    try {
      setUserCalling(null);
      onCloseModalCalling();
      if (calling) {
        calling.disconnect();
        console.log("Llamada terminada");
        setCalling(null);
      }
    } catch (error) {
      setCalling(null);
      console.log(error);
    }
  };

  const callEnd = () => {
    console.log("Llamada finalizada");
    onCloseModalCalling();
    setUserCalling(null);
    if (calling) {
      calling.disconnect();
      setCalling(null);
    }
  };

  const bindVolumeIndicators = (call) => {
    try {
      call.on("volume", function (inputVolume, outputVolume) {
        /*
        console.log(
          "Nivel de volumen es de ",
          inputVolume,
          "El output es de ",
          outputVolume
        );*/
        // Debemos realizar mas lógica para mostrar el nivel de volumen
      });
    } catch (error) {
      console.log(error);
    }
  };

  const selectApartmentSearchUser = async (apartment) => {
    try {
      setSelectedApartment(apartment);
      const usersToApartment =
        await ApartmentComplexController.viewGetListUserToApartmentCall(
          apartment.id_apartment
        );
      if (usersToApartment.error || usersToApartment.statusCode != 200) return; // Mostrar una alerta
      setUsersToApartments(usersToApartment.payload);
    } catch (error) {
      console.log(error);
    }
  };

  const returnToListApartments = () => {
    setSearchValue("");
    setUsersToApartments([]);
    setSelectedApartment(null);
  };

  return (
    <>
      <HeaderPage title={"Citofonía"} />
      <div className="w-full rounded-2xl flex justify-center items-center text-white shadow-lg">
        {!selectedApartment && (
          <Search
            placeholder="Buscar unidades"
            onChange={(e) => setSearchValue(e.target.value)}
            size="large"
          />
        )}
      </div>
      <Card className="my-5 p-0" radius="md">
        <CardHeader className="flex gap-3">
          {selectedApartment && (
            <ChevronLeftIcon
              width={35}
              style={{ color: "#0070F0" }}
              className="cursor-pointer"
              onClick={returnToListApartments}
            />
          )}
          <div className="flex flex-col">
            <p className="font-bold text-xl">
              {selectedApartment
                ? selectedApartment.name
                : "Listado de unidades"}
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          {selectedApartment ? (
            usersToApartment.length > 0 ? (
              <Listbox
                aria-label="User Menu"
                className="mt- gap-0 divide-y divide-default-300/50 bg-content1 w-full overflow-visible shadow-small rounded-medium"
                itemClasses={{
                  base: "first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
                }}
              >
                {usersToApartment.map(({ users: user }, ind) => (
                  <ListboxItem
                    key={ind}
                    className="w-full"
                    endContent={<PhoneOutlined />}
                    textValue={
                      <>
                        {user.name} {user.last_name}
                      </>
                    }
                    onPress={() => callUser(user)}
                  >
                    <strong>
                      {user.name} {user.last_name}
                    </strong>
                  </ListboxItem>
                ))}
              </Listbox>
            ) : (
              <Empty description="No hay usuarios para esta unidad" />
            )
          ) : (
            <List
              itemLayout="vertical"
              size="large"
              pagination={{
                pageSize: 10,
              }}
              dataSource={filteredTowers}
              renderItem={(apartment) => (
                <List.Item
                  key={apartment.id_apartment}
                  onClick={() => selectApartmentSearchUser(apartment)}
                  className="cursor-pointer"
                >
                  <p className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-large text-primary no-underline hover:opacity-80 active:opacity-disabled transition-opacity">
                    {apartment.name}
                  </p>
                </List.Item>
              )}
            />
          )}
        </CardBody>
      </Card>
      <ModalCalling
        isModalCalling={isModalCalling}
        onModalCallingChange={onModalCalling}
        userCalling={userCalling}
        endCall={callEnd}
      />
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  try {
    const getCookies = TokenUtils.destructureAllCookiesClient(ctx);
    const getTowersApartment = await TowerController.apiListTowerApartment(
      getCookies
    );
    const apartments = getTowersApartment.payload
      ? getTowersApartment.payload
      : [];
    if (apartments.error) throw new Error("Unauthorized");
    const getTokenCall = CallController.apiGenerateToken();
    return {
      props: {
        apartments,
        tokenCall: getTokenCall,
        tokenUser: getCookies,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/api/logout",
        permanent: false,
      },
    };
  }
};

export default CallPage;
