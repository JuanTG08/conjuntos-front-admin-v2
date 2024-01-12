import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

const CallState = {
  CONNECTING: "Connecting",
  CONNECTED: "Connected",
  DISCONNECTED: "Disconnected",
};

const ViewA = () => {
  const [sdk, setSdk] = useState(null);
  const [isMicAccessGranted, setIsMicAccessGranted] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);
  const [call, setCall] = useState(null);
  const [callState, setCallState] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [checkingOpened, setCheckingOpened] = useState(false);
  const [micHint, setMicHint] = useState("Mute");

  useEffect(() => {
    if (typeof window !== "undefined") {
      Initialization();
    }
  }, []);

  const Initialization = async () => {
    try {
      const VoxImplant = await import("voximplant-websdk");
      const _sdk = VoxImplant.getInstance();
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

    sdk
      .init({
        micRequired: true,
        showDebugInfo: true,
        progressTone: true,
        progressToneCountry: "US",
      })
      .then(() => sdk.connect(false))
      .then(() =>
        sdk.login(
          "JuanDaTest@dev-aviv.connectics.n2.voximplant.com",
          "l:JRzI2F"
        )
      );
  }, [sdk]);

  const createCall = async () => {
    const VoxImplant = await import("voximplant-websdk");
    const _call = sdk.call({
      number: "+573224338072",
      video: { sendVideo: false, receiveVideo: false },
    });
    setCallState(CallState.CONNECTING);
    _call.on(VoxImplant.CallEvents.Connected, () => {
      setCallState(CallState.CONNECTED);
    });
    _call.on(VoxImplant.CallEvents.Disconnected, () => {
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

export default ViewA;
