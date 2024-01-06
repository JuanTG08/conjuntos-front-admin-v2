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
      )
      .then(() => {
        createCall();
      });
  }, [sdk]);

  const createCall = async () => {
    const VoxImplant = await import("voximplant-websdk");
    const _call = sdk.call({
      number: "573224338072",
      video: { sendVideo: false, receiveVideo: false },
    });
    setCallState(CallState.CONNECTING);
    _call.on(VoxImplant.CallEvents.Connected, () => {
      setCallState(CallState.CONNECTED);
    });
    _call.on(VoxImplant.CallEvents.Disconnected, () => {
      setCallState(CallState.DISCONNECTED);
    });
    _call.on(VoxImplant.CallEvents.Failed, () => {
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

  return <div>ViewA</div>;
};

export default ViewA;
