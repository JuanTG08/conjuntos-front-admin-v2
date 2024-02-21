import { CallFetching } from "@/fetching/call.fetch";
import { CallServerSideProps } from "@/server-side-props/call.serverSideProps";
import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

const CallState = {
  CONNECTING: "Connecting",
  CONNECTED: "Connected",
  DISCONNECTED: "Disconnected",
};

const ViewA = ({ userLogin, passwordLogin, numberPhone, userNameCall }) => {
  const [sdk, setSdk] = useState(null);
  const [isMicAccessGranted, setIsMicAccessGranted] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);
  const [call, setCall] = useState(null);
  const [callState, setCallState] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [checkingOpened, setCheckingOpened] = useState(false);
  const [micHint, setMicHint] = useState("Mute");

  useEffect(() => {
    if (typeof window !== "undefined" && !sdk) Initialization();
  }, []);

  const Initialization = async () => {
    try {
      const VoxImplant = await import("voximplant-websdk");
      const _sdk = VoxImplant.getInstance();
      _sdk.init();
      _sdk.connect().then(() => _sdk.requestOneTimeLoginKey(userNameCall));
      _sdk.on(VoxImplant.Events.AuthResult, async (e) => {
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
      _sdk.on(VoxImplant.Events.MicAccessResult, (e) => {
        if (e.result === true) {
          setIsMicAccessGranted(true);
        } else {
          setAccessDenied(true);
        }
      });
      setSdk(_sdk);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!sdk) return;
    /*
    try {
      sdk
        ?.init({
          micRequired: true,
          showDebugInfo: true,
          progressTone: true,
          progressToneCountry: "US",
        })
        .then(() => sdk.connect(false))
        .then(() =>
          sdk.login(
            "JuanDaTest@dev-aviv.connectics.n2.voximplant.com",
            passwordLogin
          )
        );
    } catch (error) {}*/
  }, [sdk]);

  const createCall = async () => {
    const VoxImplant = await import("voximplant-websdk");
    const _call = sdk.call({
      number: numberPhone,
      video: { sendVideo: false, receiveVideo: false },
      extraHeaders: {},
    });
    console.log("_call", _call)
    setCallState(CallState.CONNECTING);
    _call.on(VoxImplant.CallEvents.Connected, (...e) => {
      console.log("Connected", e)
      setCallState(CallState.CONNECTED);
    });
    _call.on(VoxImplant.CallEvents.Disconnected, (...e) => {
      console.log("Disconnected", e)
      setCallState(CallState.DISCONNECTED);
    });
    _call.on(VoxImplant.CallEvents.Failed, (e) => {
      console.log(e);
      setCallState(CallState.DISCONNECTED);
    });
    setCall(_call);
  };

  const disconnect = () => {
    call.hangup();
  };

  const sendDigit = (digit) => {
    call.sendTone(digit);
  };

  const startTestMic = () => {
    setCheckingOpened(true);
    call.hangup();
  };

  const changeMicHint = (value) => {
    setMicHint(value);
  };

  const hangup = async () => {
    try {
      const dis = await call.hangup();
      console.log(dis);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button color="success" onPress={createCall}>
        Llamar
      </Button>
      <Button color="danger" onPress={hangup}>
        Colgar
      </Button>
    </>
  );
};

export async function getServerSideProps(context) {
  const server = new CallServerSideProps(context);
  await server.getCallUsers();
  return server.response;
}

export default ViewA;
