import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Button, Stack } from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import DeviceDetector from "device-detector-js";
import { db } from "../../firebase/firebase_config";

export default function Login() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const DeviceCollectionRef = collection(db, "deviceInfo");
  const deviceDetector = new DeviceDetector();
  const device = deviceDetector.parse(navigator.userAgent);

  const create = async () => {
    console.log("hi");
    const platformInfo = device.os.name + " " + device.os.version;
    const date = new Date();
    await addDoc(DeviceCollectionRef, {
      date: date.toISOString(),
      platform_npm: platformInfo,
      platform: navigator.userAgent,
      sessionStart: date.toISOString(),
      sessionEnd: date.toISOString(),
      token: "cdkmckmkdmkf",
      userName: "imtiaz",
      phone: "01980573601",
    });
  };

  const handleLogin = () => {
    create();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        localStorage.setItem("accessToken", token);
        localStorage.setItem("userInfo", JSON.stringify(user));
        window.location.reload();
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log("errorCode:", errorCode);
        console.log("errorMessage:", errorMessage);
        console.log("email:", email);
        console.log("credential:", credential);
        // ...
      });
  };
  return (
    <Stack justifyContent="center" alignItems="center" sx={{ height: "100vh" }}>
      <Button variant="contained" onClick={handleLogin}>
        Login with google
      </Button>
    </Stack>
  );
}
