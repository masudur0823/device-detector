import { QueryClient, QueryClientProvider } from "react-query";
// import BasicTable from "./components/BasicTable";
import DetectDevice from "./components/DetectDevice";
import Login from "./page/auth/Login";
import Home from "./page/Home";
// import { useEffect, useState } from "react";
// import { useIdleTimer } from "react-idle-timer";
// import dayjs from "dayjs";

function App() {
  const queryClient = new QueryClient();
  const token = localStorage.getItem("accessToken");
  let data = JSON.parse(localStorage.getItem("userInfo"));
  // states
  // const [state, setState] = useState("Active");
  // const [count, setCount] = useState(0);
  // const [remaining, setRemaining] = useState(0);

  // const onIdle = () => {
  //   setState("Idle");
  //   console.log(
  //     "lastActive time ======>",
  //     dayjs(getLastActiveTime()).format("DD-MM-YYYY hh:mm:ss")
  //   );
  //   console.log(
  //     "total active time =========>",
  //     getTotalActiveTime() / 1000,
  //     "seconds"
  //   );
  // };

  // const onActive = () => {
  //   setState("Active");
  // };

  // const onAction = () => {
  //   setCount(count + 1);
  // };

  // const {
  //   getRemainingTime,
  //   getLastActiveTime,
  //   getTotalActiveTime,
  //   getActiveTime,
  // } = useIdleTimer({
  //   onIdle,
  //   onActive,
  //   onAction,
  //   timeout: 10_000,
  //   throttle: 500,
  // });

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setRemaining(Math.ceil(getRemainingTime() / 1000));
  //   }, 500);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // });

  return (
    <>
      {/* <h1>React Idle Timer</h1>
      <h2>useIdleTimer</h2>
      <br />
      <p>Current State: {state}</p>
      <p>Action Events: {count}</p>
      <p>{remaining} seconds remaining</p> */}
      <QueryClientProvider client={queryClient}>
        {/* <BasicTable /> */}

        {!token ? (
          <Login />
        ) : (
          <>
            {data.email === "masudur0823@gmail.com" ? (
              <DetectDevice />
            ) : (
              <Home />
            )}
          </>
        )}
      </QueryClientProvider>
    </>
  );
}

export default App;
