import { Avatar, Button, Stack, Typography } from "@mui/material";
import React from "react";

function Home() {
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };
  let data = JSON.parse(localStorage.getItem("userInfo"));
  console.log(data.photoURL);
  return (
    <Stack justifyContent="center" alignItems="center" sx={{ height: "100vh" }}>
      <Avatar src={data.photoUrl} />
      <img src={data.photoUrl} alt="" />
      <Typography>
        Hi,{" "}
        <Typography variant="h4" sx={{ display: "inline" }}>
          {data.displayName}
        </Typography>
      </Typography>
      <Typography>Email:{data.email}</Typography>
      <Typography></Typography>
      <Button variant="contained" onClick={logout}>
        Logout
      </Button>
    </Stack>
  );
}

export default Home;
