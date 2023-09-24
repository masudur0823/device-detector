import React, { useEffect, useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Button, Stack } from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import DeviceDetector from "device-detector-js";
import { db } from "../../firebase/firebase_config";
import { v4 as uuid } from "uuid";
import axios from "axios";

export default function Login() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const DeviceCollectionRef = collection(db, "deviceInfo");
  const deviceDetector = new DeviceDetector();
  const device = deviceDetector.parse(navigator.userAgent);

  const [deviceId, setDeviceId] = useState();
  const [ipAddress, setIpAdress] = useState({});

  useEffect(() => {
    const deviceIdFromCookie = document.cookie.match(/deviceId=(\w+)/);
    if (deviceIdFromCookie) {
      // console.log(deviceIdFromCookie[1]);
      setDeviceId(deviceIdFromCookie.input.slice(9));
    } else {
      const newDeviceId = uuid();

      document.cookie = `deviceId=${newDeviceId}; expires=365`;
      setDeviceId(newDeviceId);
    }
    // getIp();
  }, []);

  const getIp = async () => {
    const res = await axios.get("https://geolocation-db.com/json");
    console.log(res.data);
    setIpAdress(res.data.ip);
  };

  const create = async () => {
    const platformInfo = device.os.name + " " + device.os.version;
    const date = new Date();
    getIp();
    

    // await addDoc(DeviceCollectionRef, {
    //   date: date.toISOString(),
    //   uniqueId: deviceId,
    //   ipAddress: ipAddress,
    //   platform_npm: platformInfo,
    //   platform: navigator.userAgent,
    //   sessionStart: date.toISOString(),
    //   sessionEnd: date.toISOString(),
    //   token: "cdkmckmkdmkf",
    //   userName: "imtiaz",
    //   phone: "01980573601",
    // });
  };

  const handleLogin = () => {
    create();
    // signInWithPopup(auth, provider)
    //   .then((result) => {
    //     const credential = GoogleAuthProvider.credentialFromResult(result);
    //     const token = credential.accessToken;
    //     const user = result.user;
    //     console.log(credential);
    //     localStorage.setItem("accessToken", token);
    //     localStorage.setItem("userInfo", JSON.stringify(user));
    //     window.location.reload();
    //   })
    //   .catch((error) => {
    //     // Handle Errors here.
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     // The email of the user's account used.
    //     const email = error.customData.email;
    //     // The AuthCredential type that was used.
    //     const credential = GoogleAuthProvider.credentialFromError(error);
    //     console.log("errorCode:", errorCode);
    //     console.log("errorMessage:", errorMessage);
    //     console.log("email:", email);
    //     console.log("credential:", credential);
    //     // ...
    //   });
  };

  return (
    <Stack justifyContent="center" alignItems="center" sx={{ height: "100vh" }}>
      <Button variant="contained" onClick={handleLogin}>
        Login with google
      </Button>
    </Stack>
  );
}
