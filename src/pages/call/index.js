import {
  Button,
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
import ChevronLeftIcon from "@/components/Icons/ChevronLeftIcon";
import HeaderPage from "@/components/views/partials/HeaderPage";
import { CallServerSideProps } from "@/server-side-props/call.serverSideProps";
import { CallFetching } from "@/fetching/call.fetch";
import { CONST_CALL_STATE } from "@/constants/call.constant";

const CallPage = ({ apartments, tokenUser, userNameCall }) => {
  const [sdk, setSdk] = useState(null);
  const [VoxImplant, setVoxImplant] = useState(null);
  const [callState, setCallState] = useState(CONST_CALL_STATE.DISCONNECTED);
  const [call, setCall] = useState(null);
  const [isMicAccessGranted, setIsMicAccessGranted] = useState(false);
  // Inicializamos la configuración con voximplant
  useEffect(() => {
    if (typeof window !== "undefined" && !sdk && !VoxImplant) Initialization();
  }, []);

  const Initialization = async () => {
    try {
      const _VoxImplant = await import("voximplant-websdk");
      const _sdk = _VoxImplant.getInstance();
      if (_sdk.getClientState() === _VoxImplant.ClientState.DISCONNECTED) {
        _sdk.init();
        _sdk.connect().then(() => _sdk.requestOneTimeLoginKey(userNameCall));
        _sdk.on(_VoxImplant.Events.AuthResult, async (e) => {
          try {
            console.log(`AuthResult: ${e.result}`);
            console.log(`Auth code: ${e.code}`);
            if (e.code == 302) {
              console.log(e.key);
              const getToken = await CallFetching.postApiLocalGetToken({
                key: e.key,
              });
              if (getToken.error || getToken.statusCode != 200)
                throw new Error("No fue posible obtener el token");
              _sdk.loginWithOneTimeKey(userNameCall, getToken.payload);
            }
          } catch (error) {
            console.log(error);
          }
        });
      }
      _sdk.on(_VoxImplant.Events.MicAccessResult, (e) => {
        if (e.result === true) {
          setIsMicAccessGranted(true);
        } else {
          setAccessDenied(true);
        }
      });

      setSdk(_sdk);
      setVoxImplant(_VoxImplant);
    } catch (error) {
      console.log(error);
    }
  };

  const createCall = async (user) => {
    setUserCalling(user);
    try {
      console.log(user);
      if (!sdk) throw new Error("No fue posible conectarse");
      if (!VoxImplant || !user || !user.mobile_phone)
        throw new Error("No fue posible llamar al número indicado");
      const _call = sdk.call({
        number: user?.mobile_phone,
        video: { sendVideo: false, receiveVideo: false },
        extraHeaders: {},
      });
      setCallState(CONST_CALL_STATE.CONNECTING);
      _call.on(VoxImplant.CallEvents.Connected, (e) => {
        console.log(e);
        setCallState(CONST_CALL_STATE.CONNECTED);
      });
      _call.on(VoxImplant.CallEvents.Disconnected, (e) => {
        console.log(e);
        setCallState(CONST_CALL_STATE.DISCONNECTED);
        closeModalCall();
      });
      _call.on(VoxImplant.CallEvents.Failed, (e) => {
        console.log(e);
        setCallState(CONST_CALL_STATE.DISCONNECTED);
        closeModalCall();
      });
      setCall(_call);
      onModalCalling();
    } catch (error) {
      console.log(error);
      closeModalCall();
    }
  };

  const closeModalCall = () => {
    onCloseModalCalling();
    setUserCalling(null);
  };

  const hangup = async () => {
    try {
      if (!call) throw new Error("No fue posible colgar la llamada");
      const dis = await call.hangup();
      closeModalCall();
    } catch (error) {
      closeModalCall();
      console.log(error);
    }
  };

  const [searchValue, setSearchValue] = useState("");
  const [filteredTowers, setFilteredTowers] = useState([]);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [usersToApartment, setUsersToApartments] = useState([]);
  const [userCalling, setUserCalling] = useState(null);

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
    // initializeDevice();
  }, [searchValue]);
  /*

  // Parametros de llamada
  const [device, setDevice] = useState();
  const [status, setStatus] = useState();
  const [ready, setReady] = useState();
  const [calling, setCalling] = useState(null);

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
  */

  /**
   *
   * @param {number} idUserToCall
   *
   */
  /*
  const makeOutgoingCall = async (idUserToCall, _device) => {
    try {
      const params = {
        To: idUserToCall,
        mainRoleToken: tokenUser.mainRoleToken,
        userDataToken: tokenUser.userDataToken,
      };
      if (_device) {
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
        // Debemos realizar mas lógica para mostrar el nivel de volumen
      });
    } catch (error) {
      console.log(error);
    }
  };
  */

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
                    onPress={() => createCall(user)}
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
        endCall={hangup}
        callState={callState}
      />
    </>
  );
};

export async function getServerSideProps(context) {
  const server = new CallServerSideProps(context);
  await server.getCallUsers();
  return server.response;
}

/*
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
*/

export default CallPage;
