import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Button } from "@mui/material";

export default function Login() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const handleLogin = () => {
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
    <Button variant="contained" onClick={handleLogin}>
      Login with google
    </Button>
  );
}
